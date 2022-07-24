
namespace _Ext.ExcelImporter {

    @Serenity.Decorators.registerClass()
    export class ExcelImportDataEditor extends _Ext.JsonGridEditorBase<any> {

        constructor(container: JQuery) {
            container.css({ minHeight: 230 });
            super(container);

            this.slickGrid.onCellChange.subscribe((e, args) => {
                let cell = args.cell;
                let row = args.row;
                let grid = args.grid as Slick.Grid;
                let item = args.item;

                let column = this.allColumns[cell];
                let cellValue = item[column.field];

                let refColumn = this.allColumns.filter(f => f.sourceItem.editLinkIdField == column.field)[0];
                let refCellValue = item[refColumn.field];

                let items = this.getItems();

                items.forEach(f => {
                    if (f[refColumn.field] == refCellValue)
                        f[column.field] = cellValue;
                });

                this.setItems(items);

            });

        }

        protected getButtons(): Serenity.ToolButton[] {
            return [{
                title: 'Import',
                icon: 'fa-arrow-right',
                cssClass: 'btn-custom',
                onClick: () => {
                    if (this.onImportButtonClick)
                        this.onImportButtonClick();
                }
            }];
        }

        onImportButtonClick: Function;

        protected getItemCssClass(item, index): string {
            for (let column of this.allColumns) {
                if (column.sourceItem?.required && !item[column.field])
                    return 'bg-yellow-gradient';
            }
            return '';
        }

        public getTransformedDataFlatToMasterDetail(flatRecords?: any[]): any[] {
            flatRecords = flatRecords || this.value;
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

                masterRecord[detailFieldInMaster] = this.getTransformedDataFlatToMasterDetail(detailRecords);

                masterDetailRecords.push(masterRecord);
            }

            return masterDetailRecords;
        }

        public getAllColumns() {
            return this.allColumns;
        }

        protected getSlickOptions() {
            let options = super.getSlickOptions();

            options.editable = true;

            return options;
        }

        protected get_ExtGridOptions() {
            let options = super.get_ExtGridOptions();

            options.ShowInlineActionsColumn = false;

            return options;
        }

    }
}