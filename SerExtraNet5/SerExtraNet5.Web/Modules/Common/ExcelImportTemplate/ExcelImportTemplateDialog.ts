
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

            this.form.TemplateExcelFile.element.bind('fileuploadalways',
                e => {
                    this.getExcelMetadata(this.form.TemplateExcelFile.value?.Filename);
                });

            $('<button>Get Excel Metadata</button>')
                .css({ marginTop: 4, float: 'right' })
                .appendTo(this.form.TemplateExcelFile.element.find('.tool-buttons'))
                .click(e => this.getExcelMetadata(this.form.TemplateExcelFile.value?.Filename));
        }

        protected afterLoadEntity() {
            super.afterLoadEntity();

            this.loadExcelSheet(this.entity.ExcelMetadata);
        }

        private getExcelMetadata(filename: string) {
            ExcelImportTemplateService.GetExcelMetadata({ FileName: filename },
                response => {
                    this.form.ExcelMetadata.value = response.Entity;
                    this.loadExcelSheet(response.Entity);
                });
        }

        private loadExcelSheet(excelMetadata: ExcelMetadata) {
            let selectedValue = this.form.ExcelSheet.value || this.entity.ExcelSheet;

            let sheetSelect2Items = excelMetadata?.Sheets.map<Select2Item>(m => {
                return {
                    id: m.SheetName,
                    text: m.SheetName
                }
            });

            this.form.ExcelSheet.setSelect2Items(sheetSelect2Items);
            this.form.ExcelSheet.value = selectedValue;
        }
    }
}