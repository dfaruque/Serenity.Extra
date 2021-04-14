namespace SerExtraNet5.Northwind {

    @Serenity.Decorators.registerClass()
    export class ShipperDialog extends _Ext.DialogBase<ShipperRow, any> {
        protected getFormKey() { return ShipperForm.formKey; }
        protected getIdProperty() { return ShipperRow.idProperty; }
        protected getLocalTextPrefix() { return ShipperRow.localTextPrefix; }
        protected getNameProperty() { return ShipperRow.nameProperty; }
        protected getService() { return ShipperService.baseUrl; }

        protected form = new ShipperForm(this.idPrefix);

        protected getLanguages() {
            return LanguageList.getValue();
        }
    }
}