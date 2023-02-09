import { AuditLogActionTypeFormatter } from "@/Administration/AuditLog/AuditLogActionTypeFormatter";
import { AuditActionType } from "./AuditActionType";

export class AuditLogColumns {
    static columnsKey = '_Ext.AuditLog';
}

[AuditLogActionTypeFormatter, AuditActionType]; // referenced types
