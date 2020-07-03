namespace SerExtraCore.ExtraSamples {

    import fld = Northwind.ProductRow.Fields;

    @Serenity.Decorators.registerClass()
    export class MainGridMultiEditingGrid extends _Ext.GridBase<Northwind.ProductRow, any> {
        protected getColumnsKey() { return "ExtraSamples.MainGridMultiEditing"; }
        protected getDialogType() { return <any>Northwind.ProductDialog; }
        protected getIdProperty() { return Northwind.ProductRow.idProperty; }
        protected getLocalTextPrefix() { return Northwind.ProductRow.localTextPrefix; }
        protected getService() { return Northwind.ProductService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
            this.store = new _Ext.MultiEditStore(this.getPropertyItems());
            this.onMultiEditStoreChanged = () => this.filterStoreChanged();
            this.store.add_changed(this.onMultiEditStoreChanged);
        }

        private store: _Ext.MultiEditStore;

        private onMultiEditStoreChanged: () => void;

        destroy() {

            if (this.store) {
                this.store.remove_changed(this.onMultiEditStoreChanged);
                this.onMultiEditStoreChanged = null;
                this.store = null;
            }

            super.destroy();
        }

        protected filterStoreChanged() {
        }

        get_store(): _Ext.MultiEditStore {
            return this.store;
        }

        set_store(value: _Ext.MultiEditStore): void {
            if (this.store !== value) {
                if (this.store != null)
                    this.store.remove_changed(this.onMultiEditStoreChanged);

                this.store = value || new _Ext.MultiEditStore([]);
                this.store.add_changed(this.onMultiEditStoreChanged);
                this.filterStoreChanged();
            }
        }

        protected getButtons() {
            var buttons = super.getButtons();

            buttons.push({
                title: 'Update Multiple',
                cssClass: 'apply-changes-button',
                onClick: e => {

                    var dialog = new _Ext.MultiEditDialog();
                    dialog.get_filterPanel().set_store(this.get_store());
                    dialog.dialogOpen(null);
                },
                separator: true
            });
            return buttons;
        }
    }
}