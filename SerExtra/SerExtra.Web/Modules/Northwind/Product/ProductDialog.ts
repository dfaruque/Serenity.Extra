namespace SerExtra.Northwind {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.maximizable()
    export class ProductDialog extends _Ext.DialogBase<ProductRow, any> {
        protected getFormKey() { return ProductForm.formKey; }
        protected getIdProperty() { return ProductRow.idProperty; }
        protected getLocalTextPrefix() { return ProductRow.localTextPrefix; }
        protected getNameProperty() { return ProductRow.nameProperty; }
        protected getService() { return ProductService.baseUrl; }

        protected form = new ProductForm(this.idPrefix);
    }
}