import { AuditActionType } from "./AuditActionType";
import { fieldsProxy } from "@serenity-is/corelib/q";

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
    RequestedURI?: string;
}

export abstract class AuditLogRow {
    static readonly idProperty = 'Id';
    static readonly nameProperty = 'EntityTableName';
    static readonly localTextPrefix = '_Ext.AuditLog';
    static readonly deletePermission = 'Administration:AuditLog';
    static readonly insertPermission = 'Administration:AuditLog';
    static readonly readPermission = 'Administration:AuditLog';
    static readonly updatePermission = 'Administration:AuditLog';

    static readonly Fields = fieldsProxy<AuditLogRow>();
}
