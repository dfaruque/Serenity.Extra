namespace _Ext.ExcelImporter {
    export interface ExcelImportRequest extends Serenity.ServiceRequest {
        ExcelImportTemplateId?: number;
        FileName?: string;
    }
}
