
namespace SerExtraNet5.Common {

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