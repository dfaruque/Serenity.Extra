
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

            this.form.TemplateId.changeSelect2(e => {
                this.setExcelDataGridColumns();
                this.getExcelData();
            });

            this.form.ImportedExcelFile.element.bind('fileuploadalways', e => this.getExcelData());

            $('<button>Get Excel Data</button>')
                .css({ marginTop: 4, float: 'right' })
                .appendTo(this.form.ImportedExcelFile.element.find('.tool-buttons'))
                .click(e => this.getExcelData());

            this.form.ImportedData.onImportButtonClick = () => {
                Q.reloadLookup('Common.ExcelImportableTable');

                ExcelImportService.ImportExcelData(this.getSaveRequest(), response => {
                    Q.notifyInfo(
                        'Inserted: ' + (response.Inserted || 0) +
                        ', Updated: ' + (response.Updated || 0));

                    if (response.ErrorList != null && response.ErrorList.length > 0) {
                        Q.notifyError(response.ErrorList.join(',\r\n '));
                    }

                });
            };
        }

        private setExcelDataGridColumns() {
            let templateId = Q.toId(this.form.TemplateId.value)

            if (templateId) {
                let selectedTemplate = this.form.TemplateId.selectedItem as ExcelImportTemplateRow;

                let tableLookup = Q.getLookup<ExcelImportableTable>('Common.ExcelImportableTable');
                let propertyItems = tableLookup.itemById[selectedTemplate.MasterTableName].ImportableFields;

                let mappedPropertyItems = selectedTemplate.FieldMappings.map<Serenity.PropertyItem>(m => {
                    let propertyItem = propertyItems.filter(f => f.name == m.TableColumnName)[0]
                    return propertyItem;
                });

                let columns = this.form.ImportedData['propertyItemsToSlickColumns'](mappedPropertyItems);
                columns = this.form.ImportedData['postProcessColumns'](columns);
                this.form.ImportedData.slickGrid.setColumns(columns);
            }
        }

        private getExcelData() {

            let templateId = Q.toId(this.form.TemplateId.value)
            let importedExcelFile = this.form.ImportedExcelFile.value?.Filename;

            if (templateId && importedExcelFile) {

                ExcelImportService.GetExcelData({
                    ExcelImportTemplateId: templateId,
                    FileName: importedExcelFile
                }, response => {
                    this.form.ImportedData.value = response.Entities;
                });
            }
        }

        protected afterLoadEntity() {
            super.afterLoadEntity();

            this.setExcelDataGridColumns();
        }

    }
}