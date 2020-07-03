namespace _Ext.Reports {
    export interface CommonReportRequest extends Serenity.ListRequest {
        ColumnKey?: string;
        ReportKey?: string;
        ReportServiceMethodName?: string;
        ListExcelServiceMethodName?: string;
        ReportDesignPath?: string;
        EqualityFilterWithTextValue?: { [key: string]: string };
        CustomParameters?: { [key: string]: any };
    }
}

