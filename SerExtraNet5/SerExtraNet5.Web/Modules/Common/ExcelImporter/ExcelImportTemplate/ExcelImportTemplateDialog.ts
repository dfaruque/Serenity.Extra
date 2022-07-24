
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

            this.form.TemplateExcelFile.element.bind('fileuploadalways', e => this.getExcelMetadata());

            $('<button>Get Excel Metadata</button>')
                .css({ marginTop: 4, float: 'right' })
                .appendTo(this.form.TemplateExcelFile.element.find('.tool-buttons'))
                .click(e => this.getExcelMetadata());

            this.form.ExcelSheet.changeSelect2(e => {
                let selectedSheet = this.form.ExcelSheet.selectedItem as ExcelSheet;

                let excelImportFieldMappings = selectedSheet?.Columns?.map<ExcelImportFieldMappingRow>(m => {
                    return {
                        ExcelColumnName: m
                    }
                });

                this.form.FieldMappings.value = excelImportFieldMappings;
            });

            this.form.MasterTableName.change(e => {
                let selectedTable = this.form.MasterTableName.selectedItem as ExcelImportableTable;

                Q.getLookup<Serenity.PropertyItem>('Common.ExcelImportableField')
                    .update(selectedTable?.ImportableFields);

                //(this.form.FieldMappings.slickGrid as any).getEditController().commitCurrentEdit();
            });
        }

        protected afterLoadEntity() {
            super.afterLoadEntity();

            this.loadExcelSheet(this.entity.ExcelMetadata);
        }

        protected validateBeforeSave() {
            let fieldMappings = this.form.FieldMappings.value;
            let selectedTable = this.form.MasterTableName.selectedItem as ExcelImportableTable;
            let importableFields = selectedTable.ImportableFields;
            let requiredFields = importableFields.filter(f => f.required && String(f.editLinkCssClass).indexOf('IsEditLink') == -1);

            let missingMappingOfRequiredFields: Serenity.PropertyItem[] = [];
            requiredFields.forEach(importableField => {
                let fieldMapping = fieldMappings.filter(f => f.TableColumnName == importableField.name)[0];
                if (!fieldMapping) {
                    missingMappingOfRequiredFields.push(importableField)
                }
            });

            if (missingMappingOfRequiredFields.length > 0) {
                let validationMsg = 'Following field(s) are required in the database table but not mapped with excel column!\n\n'
                    + missingMappingOfRequiredFields.map(m => m.title).join('\n');
                Q.alert(validationMsg);
                return false;
            }

            return super.validateBeforeSave();
        }

        private getExcelMetadata() {
            ExcelImportTemplateService.GetExcelMetadata({ FileName: this.form.TemplateExcelFile.value?.Filename },
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
                    text: m.SheetName,
                    source: m
                }
            });

            this.form.ExcelSheet.setSelect2Items(sheetSelect2Items);
            this.form.ExcelSheet.value = selectedValue;
        }
    }
}