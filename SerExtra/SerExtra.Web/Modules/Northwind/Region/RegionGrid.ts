namespace SerExtra.Northwind {

    @Serenity.Decorators.registerClass()
    export class RegionGrid extends _Ext.GridBase<RegionRow, any> {
        protected getColumnsKey() { return "Northwind.Region"; }
        protected getDialogType() { return <any>RegionDialog; }
        protected getIdProperty() { return RegionRow.idProperty; }
        protected getLocalTextPrefix() { return RegionRow.localTextPrefix; }
        protected getService() { return RegionService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}