
namespace _Ext.ExcelImporter {
    import fld = ExcelImportTemplateRow.Fields;

    @Serenity.Decorators.registerClass()
    export class ExcelImportTemplateGrid extends _Ext.GridBase<ExcelImportTemplateRow, any> {
        protected getColumnsKey() { return 'Common.ExcelImportTemplate'; }
        protected getDialogType() { return ExcelImportTemplateDialog; }
        protected getRowType() { return ExcelImportTemplateRow; }
        protected getService() { return ExcelImportTemplateService.baseUrl; }

        constructor(container: JQuery, options) {
            super(container, options);
        }
    }
}