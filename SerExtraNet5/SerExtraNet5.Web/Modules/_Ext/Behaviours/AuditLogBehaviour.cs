using _Ext.Entities;
using Newtonsoft.Json;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using System.Linq;

namespace _Ext
{
    public class AuditRowBehavior : BaseSaveDeleteBehavior, IImplicitBehavior
    {
        protected ISqlConnections SqlConnections { get; }

        public AuditRowBehavior(ISqlConnections sqlConnections)
        {
            SqlConnections = sqlConnections;
        }

        public bool ActivateFor(IRow row)
        {
            if (row is IAuditLog)
            {
                return true;
            }
            return false;
        }

        public override void OnAudit(ISaveRequestHandler handler)
        {
            //if (handler.IsCreate)
            //{
            //    InsertNewLog(handler.UnitOfWork, handler.Row, handler.Old, AuditActionType.Insert);
            //}

            if (handler.IsUpdate)
            {
                InsertNewLog(handler.Context, handler.Row, handler.Old, AuditActionType.Update);
            }
        }

        public override void OnAudit(IDeleteRequestHandler handler)
        {
            InsertNewLog(handler.Context, handler.Row, null, AuditActionType.Delete);
        }

        private void InsertNewLog(IRequestContext context, IRow row, IRow oldRow, AuditActionType auditActionType)
        {
            try
            {
                using (var auditLogConnection = SqlConnections.NewFor<AuditLogRow>())
                {
                    var fld = AuditLogRow.Fields;

                    var entityId = Convert.ToInt64(row.IdField.AsObject(row) ?? 0);

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
                            UserId = int.Parse(context.User.GetIdentifier()),
                            ActionType = auditActionType,
                            ActionDate = DateTime.Now,
                            EntityTableName = row.Table,
                            EntityId = entityId,
                            OldEntity = oldrowJson,
                            NewEntity = rowJson,
//#if COREFX

//#else
//                            IpAddress = HttpContext.Current.Request.UserHostAddress,
//                            SessionId = HttpContext.Current.Session.SessionID
//#endif
                        };

                        auditLogConnection.Insert<AuditLogRow>(auditLogRow);
                    }
                }
            }
            catch (Exception ex)
            {
                //Log.Debug("_Ext.AuditLog Failed.", ex, row.GetType());
            }
        }

        private static void ClearAssignment(IRow row)
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
//#if COREFX

//#else
//            if (HttpContext.Current != null && HttpContext.Current.Request != null)
//            {
//                var httpRequest = HttpContext.Current.Request;
//                if (httpRequest.UrlReferrer != null)
//                    pageUrl = httpRequest.UrlReferrer.PathAndQuery;
//                else if (httpRequest.Url != null)
//                    pageUrl = httpRequest.Url.PathAndQuery;
//            }
//#endif

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