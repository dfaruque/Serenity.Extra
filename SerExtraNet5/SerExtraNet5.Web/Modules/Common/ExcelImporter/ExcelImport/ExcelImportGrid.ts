
namespace _Ext.ExcelImporter {
    import fld = ExcelImportRow.Fields;

    @Serenity.Decorators.registerClass()
    export class ExcelImportGrid extends _Ext.GridBase<ExcelImportRow, any> {
        protected getColumnsKey() { return 'Common.ExcelImport'; }
        protected getDialogType() { return ExcelImportDialog; }
        protected getRowType() { return ExcelImportRow; }
        protected getService() { return ExcelImportService.baseUrl; }

        constructor(container: JQuery, options) {
            super(container, options);
        }
    }
}