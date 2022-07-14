
namespace SerExtraNet5.Common {
    import fld = ExcelImportTemplateRow.Fields;

    @Serenity.Decorators.registerClass()
    export class ExcelImportTemplateDialog extends _Ext.DialogBase<ExcelImportTemplateRow, any> {
        protected getFormKey() { return ExcelImportTemplateForm.formKey; }
        protected getRowType() { return ExcelImportTemplateRow; }
        protected getService() { return ExcelImportTemplateService.baseUrl; }

        protected form = new ExcelImportTemplateForm(this.idPrefix);

        constructor(options) {
            super(options);
        }

    }
}