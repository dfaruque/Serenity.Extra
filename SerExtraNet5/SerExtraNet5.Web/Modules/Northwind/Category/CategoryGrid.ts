namespace SerExtraNet5.Northwind {

    @Serenity.Decorators.registerClass()
    export class CategoryGrid extends _Ext.GridBase<CategoryRow, any> {
        protected getColumnsKey() { return "Northwind.Category"; }
        protected getDialogType() { return <any>CategoryDialog; }
        protected getIdProperty() { return CategoryRow.idProperty; }
        protected getLocalTextPrefix() { return CategoryRow.localTextPrefix; }
        protected getService() { return CategoryService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}