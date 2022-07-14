
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

            let getExcelMetadataButton = $('<button>Get Excel Metadata</button>')
                .css({ marginTop: 4, float: 'right' })
                .click(e => {
                    ExcelImportTemplateService.GetExcelMetadata({ FileName: this.form.TemplateExcelFile.value.Filename },
                        response => {
                            this.form.ExcelMetadata.value = response.Entity;
                            this.loadExcelSheet(response.Entity);
                        });
                });
            this.form.TemplateExcelFile.element.find('.tool-buttons').append(getExcelMetadataButton);
        }

        protected afterLoadEntity() {
            super.afterLoadEntity();

            this.loadExcelSheet(this.entity.ExcelMetadata);
        }

        private loadExcelSheet(excelMetadata: ExcelMetadata) {
            let selectedValue = this.form.ExcelSheet.value || this.entity.ExcelSheet;

            let sheetSelect2Items = excelMetadata.Sheets.map<Select2Item>(m => {
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