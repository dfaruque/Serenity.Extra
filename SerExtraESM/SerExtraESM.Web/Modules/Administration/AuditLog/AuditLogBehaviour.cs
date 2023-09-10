using System;
using System.Collections.Generic;
using _Ext.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Routing;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Services;

namespace _Ext;

public class AuditRowBehavior : BaseSaveDeleteBehavior, IImplicitBehavior
{
    protected ISqlConnections SqlConnections { get; }
    public HttpContext HttpContext { get; }

    public AuditRowBehavior(ISqlConnections sqlConnections, IHttpContextAccessor httpContextAccessor)
    {
        SqlConnections = sqlConnections;
        HttpContext = httpContextAccessor.HttpContext;
    }

    public bool ActivateFor(IRow row)
    {
        return row is IAuditLog;
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
            using var auditLogConnection = SqlConnections.NewFor<AuditLogRow>();
            var fld = AuditLogRow.Fields;

            var entityId = row.IdField.AsObject(row);

            var changes = GetChanges(row, oldRow);

            if (changes.Count > 0)
            {
                var auditLogRow = new AuditLogRow
                {
                    UserId = context.User.GetIdentifier(),
                    ActionType = auditActionType,
                    ActionDate = DateTime.Now,
                    EntityTableName = row.Table,
                    EntityId = entityId.ToString(),
                    Changes = changes.ToJson(),
                    IpAddress = HttpContext.Connection.RemoteIpAddress.ToString(),
                    SessionId = HttpContext.TraceIdentifier,
                    RequestedURI = HttpContext.Request.GetEncodedUrl()
                };

                auditLogConnection.Insert(auditLogRow);
            }
        }
        catch (Exception ex)
        {
            ex.Log(null);
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
                object oldValue;
                object newValue;

                if (field.Type == FieldType.Object)
                {
                    oldValue = oldRow?[field.Name].ToJson();
                    newValue = row[field.Name].ToJson();
                }
                else
                {
                    oldValue = oldRow?[field.Name];
                    newValue = row[field.Name];
                }

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