﻿
namespace _Ext.ExcelImporter {
    import fld = ExcelImportRow.Fields;

    @Serenity.Decorators.registerClass()
    export class ExcelImportDialog extends _Ext.DialogBase<ExcelImportRow, any> {
        protected getFormKey() { return ExcelImportForm.formKey; }
        protected getRowType() { return ExcelImportRow; }
        protected getService() { return ExcelImportService.baseUrl; }

        public form = new ExcelImportForm(this.idPrefix);

        constructor(options) {
            super(options);

            usingSlickGridEditors();

            this.form.TemplateId.changeSelect2(e => {
                this.setExcelDataGridColumns();
                this.getExcelData();
            });

            this.form.ImportedExcelFile.element.bind('fileuploadalways', e => this.getExcelData());

            $('<button class="btn-custom">Get Excel Data</button>')
                .css({ marginTop: 4, float: 'right' })
                .appendTo(this.form.ImportedExcelFile.element.find('.tool-buttons'))
                .click(e => this.getExcelData());

            q.initDetailEditor(this, this.form.ImportedData);

            this.form.ImportedData.onImportButtonClick = () => {
                Q.reloadLookup('ExcelImporter.ExcelImportableTable');

                var saveRequest = this.getSaveRequest();

                let transformedData = this.form.ImportedData.getTransformedDataFlatToMasterDetail();
                saveRequest.Entity.ImportedData = JSON.stringify(transformedData);

                ExcelImportService.ImportExcelData(saveRequest, response => {
                    Q.notifyInfo('Imported records: ' + (response.Inserted || 0));

                    if (response.ErrorList != null && response.ErrorList.length > 0) {
                        Q.notifyError(response.ErrorList.join(',\r\n '));
                    } else {
                        this.form.ExcelImportStatus.value = ExcelImportStatus.Completed.toString();
                        this.save();
                        this.setReadOnly(true);
                    }
                });
            };
        }

        private setExcelDataGridColumns() {
            let templateId = Q.toId(this.form.TemplateId.value)

            if (templateId) {
                let selectedTemplate = this.form.TemplateId.selectedItem as ExcelImportTemplateRow;

                let tableLookup = Q.getLookup<ExcelImportableTable>('ExcelImporter.ExcelImportableTable');
                let propertyItems = Q.deepClone(tableLookup.itemById[selectedTemplate.MasterTableName].ImportableFields);

                let mappedPropertyItems: Serenity.PropertyItem[] = [];

                selectedTemplate.FieldMappings.forEach(field => {
                    let propertyItem = propertyItems.filter(f => f.name == field.TableColumnName)[0];
                    propertyItem.readOnly = true;
                    mappedPropertyItems.push(propertyItem);

                    if (propertyItem.editLinkIdField) {
                        let editLinkIdPropertyItem = propertyItems.filter(f => f.name == propertyItem.editLinkIdField)[0];
                        editLinkIdPropertyItem.readOnly = false;
                        let editorType = Serenity.EditorTypeRegistry.get(editLinkIdPropertyItem.editorType);
                        let editor = new editorType($('<input/>'), editLinkIdPropertyItem.editorParams);
                        editLinkIdPropertyItem['editor'] = editor;

                        mappedPropertyItems.push(editLinkIdPropertyItem);
                    }
                });

                let columns = this.form.ImportedData['propertyItemsToSlickColumns'](mappedPropertyItems);
                columns = this.form.ImportedData.postProcessColumns(columns);
                this.form.ImportedData.resetColumns(columns);
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
                    let allColumns = this.form.ImportedData.getAllColumns();
                    let columnsWithEditLinkId = allColumns.filter(f => f.sourceItem.editLinkIdField);

                    response.Entities.forEach(entity => {
                        columnsWithEditLinkId.forEach(column => {
                            let editLinkIdColumn = allColumns.filter(f => f.field == column.sourceItem.editLinkIdField)[0];
                            let editLinkEditor = editLinkIdColumn.sourceItem['editor'];
                            let lookup = editLinkEditor?.lookup;
                            if (lookup) {
                                let lookupItemByTextField = lookup.items.filter(f => f[lookup.textField] == entity[column.field])[0];
                                entity[editLinkIdColumn.field] = lookupItemByTextField?.[lookup.idField];
                            }

                        });
                    });

                    this.form.ImportedData.value = response.Entities;
                });
            }
        }

        protected afterLoadEntity() {
            super.afterLoadEntity();

            this.setExcelDataGridColumns();

            if (this.entity.ExcelImportStatus == ExcelImportStatus.Completed) {
                this.setReadOnly(true);
            }
        }

    }
}