namespace SerExtraNet5.Common {
    export interface ExcelImportTemplateRow {
        Id?: number;
        TemplateName?: string;
        MasterTableName?: string;
        TemplateExcelFile?: string;
        ExcelMetadata?: ExcelMetadata;
        ExcelSheet?: string;
        FieldMappings?: ExcelImportFieldMappingRow[];
        Remarks?: string;
        InsertUserId?: number;
        InsertDate?: string;
        UpdateUserId?: number;
        UpdateDate?: string;
    }

    export namespace ExcelImportTemplateRow {
        export const idProperty = 'Id';
        export const nameProperty = 'TemplateName';
        export const localTextPrefix = 'Common.ExcelImportTemplate';
        export const deletePermission = 'Common:ExcelImportTemplate:Delete';
        export const insertPermission = 'Common:ExcelImportTemplate:Insert';
        export const readPermission = 'Common:ExcelImportTemplate:Read';
        export const updatePermission = 'Common:ExcelImportTemplate:Update';

        export declare const enum Fields {
            Id = "Id",
            TemplateName = "TemplateName",
            MasterTableName = "MasterTableName",
            TemplateExcelFile = "TemplateExcelFile",
            ExcelMetadata = "ExcelMetadata",
            ExcelSheet = "ExcelSheet",
            FieldMappings = "FieldMappings",
            Remarks = "Remarks",
            InsertUserId = "InsertUserId",
            InsertDate = "InsertDate",
            UpdateUserId = "UpdateUserId",
            UpdateDate = "UpdateDate"
        }
    }
}
