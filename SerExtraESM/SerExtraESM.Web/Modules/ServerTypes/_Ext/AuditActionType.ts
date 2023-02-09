import { Decorators } from "@serenity-is/corelib";

export enum AuditActionType {
    Insert = 1,
    Update = 2,
    Delete = 3
}
Decorators.registerEnumType(AuditActionType, '_Ext.AuditActionType', 'Enum.Audit.AuditActionType');
