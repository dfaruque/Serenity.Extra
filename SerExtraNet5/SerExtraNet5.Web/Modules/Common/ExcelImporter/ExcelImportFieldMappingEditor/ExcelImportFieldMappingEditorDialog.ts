
namespace SerExtraNet5.Common {
    import fld = ExcelImportTemplateRow.Fields;

    @Serenity.Decorators.registerClass()
    export class ExcelImportFieldMappingEditorDialog extends _Ext.EditorDialogBase<ExcelImportTemplateRow> {
        //protected getFormKey() { return ExcelImportFieldMappingColumns.formKey; }
        protected getLocalTextPrefix() { return ExcelImportTemplateRow.localTextPrefix; }

        //protected form = new ExcelImportFieldMappingColumns(this.idPrefix);

    }
}