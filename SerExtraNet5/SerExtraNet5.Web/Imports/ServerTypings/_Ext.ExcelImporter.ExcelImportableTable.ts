namespace _Ext.ExcelImporter {
    export interface ExcelImportableTable {
        TableName?: string;
        RowType?: string;
        ImportableFields?: Serenity.PropertyItem[];
    }
}
