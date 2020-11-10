
namespace SerExtra.Northwind {

    @Serenity.Decorators.registerClass()
    export class OrderDetailDialog extends _Ext.EditorDialogBase<OrderDetailRow> {
        protected getFormKey() { return OrderDetailForm.formKey; }
        protected getLocalTextPrefix() { return OrderDetailRow.localTextPrefix; }

        protected form: OrderDetailForm;

        constructor() {
            super();

            this.form = new OrderDetailForm(this.idPrefix);

            this.form.ProductID.changeSelect2(e => {
                var product = this.form.ProductID.selectedItem;
                if (product) {
                    this.form.UnitPrice.value = product.UnitPrice;
                    
                }
            });

            this.form.Discount.addValidationRule(this.uniqueName, e => {
                var price = this.form.UnitPrice.value;
                var quantity = this.form.Quantity.value;
                var discount = this.form.Discount.value;
                if (price != null && quantity != null && discount != null &&
                    discount > 0 && discount >= price * quantity) {
                    return "Discount can't be higher than total price!";
                }
            });
        }

        protected getSaveEntity() {
            let entity = super.getSaveEntity();

            entity.ProductName = this.form.ProductID.text;
            entity.LineTotal = (entity.Quantity || 0) * (entity.UnitPrice || 0) - (entity.Discount || 0);

            return entity;
        }
    }
}