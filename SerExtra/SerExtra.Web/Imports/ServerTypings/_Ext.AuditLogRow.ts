namespace _Ext {
    export interface AuditLogRow {
        Id?: number;
        VersionNo?: number;
        UserId?: number;
        ActionType?: AuditActionType;
        ActionDate?: string;
        EntityTableName?: string;
        EntityId?: number;
        OldEntity?: string;
        NewEntity?: string;
        IpAddress?: string;
        SessionId?: string;
    }

    export namespace AuditLogRow {
        export const idProperty = 'Id';
        export const nameProperty = 'EntityTableName';
        export const localTextPrefix = '_Ext.AuditLog';

        export declare const enum Fields {
            Id = "Id",
            VersionNo = "VersionNo",
            UserId = "UserId",
            ActionType = "ActionType",
            ActionDate = "ActionDate",
            EntityTableName = "EntityTableName",
            EntityId = "EntityId",
            OldEntity = "OldEntity",
            NewEntity = "NewEntity",
            IpAddress = "IpAddress",
            SessionId = "SessionId"
        }
    }
}

