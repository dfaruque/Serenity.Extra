using _Ext.Entities;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Collections.Generic;
using System.Web;

namespace _Ext
{
    public class AuditRowBehavior : IImplicitBehavior, ISaveBehavior, IDeleteBehavior
    {
        public bool ActivateFor(Row row)
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

        private void InsertNewLog(IUnitOfWork uow, Row row, Row oldRow, AuditActionType auditActionType)
        {
            try
            {
                using (var auditLogConnection = SqlConnections.NewFor<AuditLogRow>())
                {
                    var fld = AuditLogRow.Fields;

                    var entityId = (row as IIdRow).IdField[row] ?? 0;

                    var changes = GetChanges(row, oldRow);

                    if (changes.Count > 0)
                    {
                        int.TryParse(Authorization.UserId, out int userID);
                        var auditLogRow = new AuditLogRow
                        {
                            UserId = userID,
                            ActionType = auditActionType,
                            ActionDate = DateTime.Now,
                            EntityTableName = row.Table,
                            EntityId = entityId,
                            Changes = changes.ToJson(),
#if COREFX

#else
                            IpAddress = HttpContext.Current?.Request?.UserHostAddress,
                            SessionId = HttpContext.Current?.Session?.SessionID
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

        private static Dictionary<string, object[]> GetChanges(Row row, Row oldRow)
        {
            var changes = new Dictionary<string, object[]>();
            var tableFields = row.EnumerateTableFields();

            foreach (var field in tableFields)
            {
                if (row.IsAssigned(field))
                {
                    var oldValue = oldRow[field.Name];
                    var newValue = row[field.Name];
                    if (!Equals(oldValue, newValue))
                    {
                        var fieldChange = new object[] { oldValue, newValue };
                        changes.Add(field.Name, fieldChange);
                    }
                }
            }

            return changes;
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