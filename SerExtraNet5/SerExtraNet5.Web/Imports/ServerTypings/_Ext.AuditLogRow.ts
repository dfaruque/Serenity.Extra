namespace _Ext {
    export interface AuditLogRow {
        Id?: number;
        UserId?: string;
        ActionType?: AuditActionType;
        ActionDate?: string;
        EntityTableName?: string;
        EntityId?: string;
        Changes?: string;
        IpAddress?: string;
        SessionId?: string;
    }

    export namespace AuditLogRow {
        export const idProperty = 'Id';
        export const nameProperty = 'EntityTableName';
        export const localTextPrefix = '_Ext.AuditLog';
        export const deletePermission = 'Administration:AuditLog:Modify';
        export const insertPermission = 'Administration:AuditLog:Modify';
        export const readPermission = 'Administration:AuditLog';
        export const updatePermission = 'Administration:AuditLog:Modify';

        export declare const enum Fields {
            Id = "Id",
            UserId = "UserId",
            ActionType = "ActionType",
            ActionDate = "ActionDate",
            EntityTableName = "EntityTableName",
            EntityId = "EntityId",
            Changes = "Changes",
            IpAddress = "IpAddress",
            SessionId = "SessionId"
        }
    }
}
