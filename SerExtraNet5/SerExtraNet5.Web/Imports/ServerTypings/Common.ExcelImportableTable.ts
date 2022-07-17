namespace SerExtraNet5.Common {
    export interface ExcelImportableTable {
        TableName?: string;
        RowType?: string;
        ImportableFields?: ExcelImportableField[];
    }
}
