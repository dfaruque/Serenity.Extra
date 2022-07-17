namespace SerExtraNet5.Common {
    export interface ExcelImportRequest extends Serenity.ServiceRequest {
        ExcelImportTemplateId?: number;
        FileName?: string;
    }
}
