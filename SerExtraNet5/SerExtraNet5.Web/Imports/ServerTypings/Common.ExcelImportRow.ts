namespace SerExtraNet5.Common {
    export interface ExcelImportRow {
        Id?: number;
        TemplateId?: number;
        MasterTableName?: string;
        FieldMappings?: string;
        ImportedExcelFile?: string;
        ExcelImportStatus?: number;
        ImportedData?: string;
        Remarks?: string;
        TemplateTemplateName?: string;
        TemplateMasterTableName?: string;
        TemplateFieldMappings?: string;
        InsertUserId?: number;
        InsertDate?: string;
        UpdateUserId?: number;
        UpdateDate?: string;
    }

    export namespace ExcelImportRow {
        export const idProperty = 'Id';
        export const nameProperty = 'MasterTableName';
        export const localTextPrefix = 'Common.ExcelImport';
        export const deletePermission = 'Common:ExcelImport:Delete';
        export const insertPermission = 'Common:ExcelImport:Insert';
        export const readPermission = 'Common:ExcelImport:Read';
        export const updatePermission = 'Common:ExcelImport:Update';

        export declare const enum Fields {
            Id = "Id",
            TemplateId = "TemplateId",
            MasterTableName = "MasterTableName",
            FieldMappings = "FieldMappings",
            ImportedExcelFile = "ImportedExcelFile",
            ExcelImportStatus = "ExcelImportStatus",
            ImportedData = "ImportedData",
            Remarks = "Remarks",
            TemplateTemplateName = "TemplateTemplateName",
            TemplateMasterTableName = "TemplateMasterTableName",
            TemplateFieldMappings = "TemplateFieldMappings",
            InsertUserId = "InsertUserId",
            InsertDate = "InsertDate",
            UpdateUserId = "UpdateUserId",
            UpdateDate = "UpdateDate"
        }
    }
}
