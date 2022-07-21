
namespace SerExtraNet5.Common {
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
                Q.reloadLookup('Common.ExcelImportableTable');

                var saveRequest = this.getSaveRequest();

                let transformedData = ExcelImportDialog.getTransformedDataFlatToMasterDetail(this.form.ImportedData.value);
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

        static getTransformedDataFlatToMasterDetail(flatRecords: any[]): any[] {
            let firstRecord = flatRecords[0];
            let flatColumns: string[] = [];

            for (let field in firstRecord) {
                flatColumns.push(field)
            }

            let masterDetailModel = {};
            let detailFields: string[] = []

            for (let columnName of flatColumns) {
                let dotIndex = columnName.indexOf('.');
                if (dotIndex < 0) {
                    masterDetailModel[columnName] = columnName;
                } else {
                    let detailField = columnName.substr(0, dotIndex);
                    if (!masterDetailModel.hasOwnProperty(detailField)) {
                        masterDetailModel[detailField] = {};
                        detailFields.push(detailField)
                    }

                    masterDetailModel[detailField][columnName.substr(dotIndex + 1)] = columnName;
                }
            }

            if (detailFields.length == 0) //recursion termination
                return flatRecords;

            let groupByMasterFields = {};

            let masterRecords = [];

            for (let flatRecord of flatRecords) {
                let masterKey = '';
                let masterRecord = {};

                for (let field in masterDetailModel) {
                    masterKey += flatRecord[field];
                    masterRecord[field] = flatRecord[field];
                }

                flatRecord.masterKey = masterKey;
                masterRecord['masterKey'] = masterKey;

                if (!groupByMasterFields.hasOwnProperty(masterKey)) {
                    groupByMasterFields[masterKey] = [];
                    masterRecords.push(masterRecord);
                }
                groupByMasterFields[masterKey].push(flatRecord);
            }

            let masterDetailRecords = [];

            for (let masterKey in groupByMasterFields) {
                let masterRecord = masterRecords.filter(f => f.masterKey == masterKey)[0];
                delete masterRecord['masterKey'];
                let detailFieldInMaster = detailFields[0];

                let detailRecords = groupByMasterFields[masterKey];

                for (let detailRecord of detailRecords) {
                    delete detailRecord['masterKey'];

                    for (let masterField in masterDetailModel) {
                        delete detailRecord[masterField];
                    }

                    for (let detailFeild in detailRecord) {
                        let detailFeildWithoutPrefix = detailFeild.substr(detailFieldInMaster.length + 1)
                        detailRecord[detailFeildWithoutPrefix] = detailRecord[detailFeild];
                        delete detailRecord[detailFeild];
                    }
                }

                masterRecord[detailFieldInMaster] = ExcelImportDialog.getTransformedDataFlatToMasterDetail(detailRecords);

                masterDetailRecords.push(masterRecord);
            }

            return masterDetailRecords;
        }

        private setExcelDataGridColumns() {
            let templateId = Q.toId(this.form.TemplateId.value)

            if (templateId) {
                let selectedTemplate = this.form.TemplateId.selectedItem as ExcelImportTemplateRow;

                let tableLookup = Q.getLookup<ExcelImportableTable>('Common.ExcelImportableTable');
                let propertyItems = Q.deepClone(tableLookup.itemById[selectedTemplate.MasterTableName].ImportableFields);

                let mappedPropertyItems: Serenity.PropertyItem[] = [];

                selectedTemplate.FieldMappings.forEach(field => {
                    let propertyItem = propertyItems.filter(f => f.name == field.TableColumnName)[0];
                    propertyItem.readOnly = true;
                    mappedPropertyItems.push(propertyItem);

                    if (propertyItem.editLinkIdField) {
                        let editLinkIdPropertyItem = propertyItems.filter(f => f.name == propertyItem.editLinkIdField)[0];
                        editLinkIdPropertyItem.readOnly = false;
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