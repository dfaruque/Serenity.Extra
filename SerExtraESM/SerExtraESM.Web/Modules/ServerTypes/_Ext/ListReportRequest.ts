import { ListRequest } from "@serenity-is/corelib";

export interface ListReportRequest extends ListRequest {
    ReportKey?: string;
    ReportServiceMethodName?: string;
    ListExcelServiceMethodName?: string;
    ReportDesignPath?: string;
    EqualityFilterWithTextValue?: { [key: string]: string };
    CustomParameters?: { [key: string]: any };
}
