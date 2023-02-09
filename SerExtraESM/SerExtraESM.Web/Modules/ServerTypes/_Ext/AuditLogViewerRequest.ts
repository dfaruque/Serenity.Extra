import { ServiceRequest } from "@serenity-is/corelib";

export interface AuditLogViewerRequest extends ServiceRequest {
    FormKey?: string;
    EntityId?: number;
}
