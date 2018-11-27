namespace SerExtra.Northwind {

    @Serenity.Decorators.registerClass()
    export class SupplierGrid extends _Ext.GridBase<SupplierRow, any> {
        protected getColumnsKey() { return "Northwind.Supplier"; }
        protected getDialogType() { return <any>SupplierDialog; }
        protected getIdProperty() { return SupplierRow.idProperty; }
        protected getLocalTextPrefix() { return SupplierRow.localTextPrefix; }
        protected getService() { return SupplierService.baseUrl; }

        constructor(container: JQuery, options?) {
            options.SomeProp = 15;
            super(container, options);
        }
    }
}