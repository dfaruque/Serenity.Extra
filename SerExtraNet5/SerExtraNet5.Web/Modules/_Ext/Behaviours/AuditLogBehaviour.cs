using _Ext.Entities;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Collections.Generic;

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

                    var changes = GetChanges(row, oldRow);

                    if (changes.Count > 0)
                    {
                        int.TryParse(context.User.GetIdentifier(), out int userID);
                        var auditLogRow = new AuditLogRow
                        {
                            UserId = userID,
                            ActionType = auditActionType,
                            ActionDate = DateTime.Now,
                            EntityTableName = row.Table,
                            EntityId = entityId,
                            Changes = changes.ToJson(),
//#if COREFX

//#else
//                            IpAddress = HttpContext.Current.Request.UserHostAddress,
//                            SessionId = HttpContext.Current.Session.SessionID
//#endif
                        };

                        auditLogConnection.Insert(auditLogRow);
                    }
                }
            }
            catch
            {
                //Log.Debug("_Ext.AuditLog Failed.", ex, row.GetType());
            }
        }

        private static Dictionary<string, object[]> GetChanges(IRow row, IRow oldRow)
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