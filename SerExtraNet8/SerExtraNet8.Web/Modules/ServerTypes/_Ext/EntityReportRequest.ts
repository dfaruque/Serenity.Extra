import { RetrieveRequest } from "@serenity-is/corelib";

export interface EntityReportRequest extends RetrieveRequest {
    ReportKey?: string;
    ReportServiceMethodName?: string;
    ReportDesignPath?: string;
}