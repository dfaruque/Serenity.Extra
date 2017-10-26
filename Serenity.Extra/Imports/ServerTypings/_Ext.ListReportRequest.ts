namespace _Ext {
    export interface ListReportRequest extends Serenity.ListRequest {
        ReportKey?: string;
        ReportServiceMethodName?: string;
        ListExcelServiceMethodName?: string;
        ReportDesignPath?: string;
        EqualityFilterWithTextValue?: { [key: string]: string };
    }
}

