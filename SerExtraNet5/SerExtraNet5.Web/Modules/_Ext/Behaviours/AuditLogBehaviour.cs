using _Ext.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;

namespace _Ext
{
    public class AuditRowBehavior : IImplicitBehavior, ISaveBehavior, IDeleteBehavior
    {
        public bool ActivateFor(IRow row)
        {
            if (row is IAuditLog)
            {
                return true;
            }
            return false;
        }


        public void OnAfterSave(ISaveRequestHandler handler) { }
        public void OnAudit(ISaveRequestHandler handler)
        {
            //if (handler.IsCreate)
            //{
            //    InsertNewLog(handler.UnitOfWork, handler.Row, handler.Old, AuditActionType.Insert);
            //}

            if (handler.IsUpdate)
            {
                InsertNewLog(handler.UnitOfWork, handler.Row, handler.Old, AuditActionType.Update);
            }
        }

        public void OnBeforeSave(ISaveRequestHandler handler) { }
        public void OnPrepareQuery(ISaveRequestHandler handler, SqlQuery query) { }
        public void OnReturn(ISaveRequestHandler handler) { }
        public void OnSetInternalFields(ISaveRequestHandler handler) { }
        public void OnValidateRequest(ISaveRequestHandler handler) { }

        public void OnAfterDelete(IDeleteRequestHandler handler) { }
        public void OnAudit(IDeleteRequestHandler handler)
        {
            InsertNewLog(handler.UnitOfWork, handler.Row, null, AuditActionType.Delete);
        }
        public void OnBeforeDelete(IDeleteRequestHandler handler) { }
        public void OnPrepareQuery(IDeleteRequestHandler handler, SqlQuery query) { }
        public void OnReturn(IDeleteRequestHandler handler) { }
        public void OnValidateRequest(IDeleteRequestHandler handler) { }

        private void InsertNewLog(IUnitOfWork uow, IRow row, IRow oldRow, AuditActionType auditActionType)
        {
            try
            {
                using (var auditLogConnection = SqlConnections.NewFor<AuditLogRow>())
                {
                    var fld = AuditLogRow.Fields;

                    var entityId = (row as IIdRow).IdField[row] ?? 0;

                    var lastVersion = auditLogConnection.TryFirst<AuditLogRow>(q => q
                    .Select(fld.VersionNo, fld.NewEntity)
                    .Where(fld.EntityTableName == row.Table && fld.EntityId == entityId)
                    .OrderBy(fld.Id, desc: true));

                    ClearAssignment(oldRow);

                    var oldrowJson = JsonConvert.SerializeObject(oldRow);
                    var rowJson = JsonConvert.SerializeObject(row);

                    if (auditActionType == AuditActionType.Delete || lastVersion?.NewEntity != rowJson)
                    {
                        int versionNo = (lastVersion?.VersionNo ?? 0) + 1;

                        var auditLogRow = new AuditLogRow
                        {
                            VersionNo = versionNo,
                            UserId = int.Parse(Authorization.UserId),
                            ActionType = auditActionType,
                            ActionDate = DateTime.Now,
                            EntityTableName = row.Table,
                            EntityId = entityId,
                            OldEntity = oldrowJson,
                            NewEntity = rowJson,
#if COREFX

#else
                            IpAddress = HttpContext.Current.Request.UserHostAddress,
                            SessionId = HttpContext.Current.Session.SessionID
#endif
                        };

                        auditLogConnection.Insert<AuditLogRow>(auditLogRow);
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Debug("_Ext.AuditLog Failed.", ex, row.GetType());
            }
        }

        private static void ClearAssignment(Row row)
        {
            if (row is IIdRow idRow)
            {
                if (idRow.IdField is Field idField)
                    row.ClearAssignment(idField);
            }

            if (row is IInsertLogRow iInsertLogRow)
            {
                if (iInsertLogRow.InsertDateField is Field idateField)
                    row.ClearAssignment(idateField);

                if (iInsertLogRow.InsertUserIdField is Field iuserField)
                    row.ClearAssignment(iuserField);
            }

            if (row is IUpdateLogRow iUpdateLogRow)
            {
                if (iUpdateLogRow.UpdateDateField is Field udateField)
                    row.ClearAssignment(udateField);

                if (iUpdateLogRow.UpdateUserIdField is Field uuserField)
                    row.ClearAssignment(uuserField);
            }
        }

        string GetPageUrl()
        {
            string pageUrl = "";
#if COREFX

#else
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.UrlReferrer != null)
                    pageUrl = httpRequest.UrlReferrer.PathAndQuery;
                else if (httpRequest.Url != null)
                    pageUrl = httpRequest.Url.PathAndQuery;
            }
#endif

            return pageUrl;
        }
    }

    /// <summary>
    /// This interface is used to log the changes for Insert / Update and Delete.
    /// This identify the Identity Column as Row Id (Unique Id) and save in Audit Table. If Identity column is not found then it use Id (Hard Coded) column.
    /// </summary>
    public interface IAuditLog
    {
    }


    [EnumKey("Enum.Audit.AuditActionType"), ScriptInclude]
    public enum AuditActionType
    {
        Insert = 1,
        Update = 2,
        Delete = 3
    }

    /// <summary>
    /// Any field which does not required to log in audit table. For Example InsertUserId, InsertDate etc
    /// </summary>
    //public class IgnoreAuditLogAttribute : Attribute
    //{
    //}
}