
namespace SerExtraNet5.Common {
    import fld = ExcelImportRow.Fields;

    @Serenity.Decorators.registerClass()
    export class ExcelImportDialog extends _Ext.DialogBase<ExcelImportRow, any> {
        protected getFormKey() { return ExcelImportForm.formKey; }
        protected getRowType() { return ExcelImportRow; }
        protected getService() { return ExcelImportService.baseUrl; }

        protected form = new ExcelImportForm(this.idPrefix);

        constructor(options) {
            super(options);

            this.form.ImportedExcelFile.element.bind('fileuploadalways',
                e => {
                    this.getExcelData();
                });

            $('<button>Get Excel Data</button>')
                .css({ marginTop: 4, float: 'right' })
                .appendTo(this.form.ImportedExcelFile.element.find('.tool-buttons'))
                .click(e => this.getExcelData());

        }

        private getExcelData() {

            ExcelImportService.GetExcelData({
                ExcelImportTemplateId: Q.toId(this.form.TemplateId.value),
                FileName: this.form.ImportedExcelFile.value?.Filename
            }, response => {
                console.log(response)
            });
        }

    }
}