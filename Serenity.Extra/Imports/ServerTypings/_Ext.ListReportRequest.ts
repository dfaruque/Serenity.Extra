namespace _Ext {
    export interface ListReportRequest extends Serenity.ListRequest {
        CargoType?: PMS.CargoType;
        ReportKey?: string;
        ReportServiceMethodName?: string;
        ListExcelServiceMethodName?: string;
        ReportDesignPath?: string;
        EqualityFilterWithTextValue?: { [key: string]: string };
    }
}

