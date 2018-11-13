namespace SerExtra.Northwind {

    import fld = ProductRow.Fields;

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.filterable()
    export class ProductCheckGrid extends _Ext.GridBase<ProductRow, any> {
        protected getColumnsKey() { return "Northwind.Product"; }
        protected getDialogType() { return <any>ProductDialog; }
        protected getIdProperty() { return ProductRow.idProperty; }
        protected getLocalTextPrefix() { return ProductRow.localTextPrefix; }
        protected getService() { return ProductService.baseUrl; }

        private rowSelection = new Serenity.GridRowSelectionMixin(this);

        constructor(container: JQuery) {
            super(container);
        }

        get selectedItems() {
            return this.rowSelection.getSelectedAsInt32().map(m => {
                return this.view.getItemById(m)
            })
        }

        protected getButtons() {
            var buttons = super.getButtons();


            return buttons;
        }

        protected getColumns() {
            var columns = super.getColumns();

            columns.unshift(Serenity.GridRowSelectionMixin.createSelectColumn(() => this.rowSelection));

            return columns;
        }

    }
}
