import { ServiceResponse } from "@serenity-is/corelib";
import { AuditLogRow } from "./AuditLogRow";

export interface AuditLogViewerResponse extends ServiceResponse {
    EntityVersions?: AuditLogRow[];
}
