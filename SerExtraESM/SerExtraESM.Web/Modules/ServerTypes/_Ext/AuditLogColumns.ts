import { AuditLogActionTypeFormatter } from "@/Administration/AuditLog/AuditLogActionTypeFormatter";
import { ColumnsBase, fieldsProxy } from "@serenity-is/corelib";
import { Column } from "@serenity-is/sleekgrid";
import { AuditActionType } from "./AuditActionType";
import { AuditLogRow } from "./AuditLogRow";

export interface AuditLogColumns {
    Id: Column<AuditLogRow>;
    EntityTableName: Column<AuditLogRow>;
    ActionType: Column<AuditLogRow>;
    ActionDate: Column<AuditLogRow>;
    EntityId: Column<AuditLogRow>;
    Changes: Column<AuditLogRow>;
    UserId: Column<AuditLogRow>;
    IpAddress: Column<AuditLogRow>;
    SessionId: Column<AuditLogRow>;
    RequestedURI: Column<AuditLogRow>;
}

export class AuditLogColumns extends ColumnsBase<AuditLogRow> {
    static readonly columnsKey = '_Ext.AuditLog';
    static readonly Fields = fieldsProxy<AuditLogColumns>();
}

[AuditLogActionTypeFormatter, AuditActionType]; // referenced types