namespace SerExtra.Northwind {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.panel()
    export class OrderDialog extends _Ext.DialogBase<OrderRow, any> {
        protected getFormKey() { return OrderForm.formKey; }
        protected getIdProperty() { return OrderRow.idProperty; }
        protected getLocalTextPrefix() { return OrderRow.localTextPrefix; }
        protected getNameProperty() { return OrderRow.nameProperty; }
        protected getService() { return OrderService.baseUrl; }

        protected form = new OrderForm(this.idPrefix);

        constructor() {
            super();

            (this.form.DetailList.view as any).onDataChanged.subscribe(() => {
                this.calculateTotal();
            });

            //the following event will handle delete case
            (this.form.DetailList.view as any).onRowCountChanged.subscribe(() => {
                this.calculateTotal();
            });
        }

        calculateTotal() {
            var total = 0;
            for (var k of this.form.DetailList.getItems()) {
                total += k.LineTotal || 0;
            }
            Q.notifySuccess(total.toString());
        }

        getToolbarButtons() {
            var buttons = super.getToolbarButtons();

            buttons.push(SerExtra.Common.ReportHelper.createToolButton({
                title: 'Invoice',
                cssClass: 'export-pdf-button',
                reportKey: 'Northwind.OrderDetail',
                getParams: () => ({
                    OrderID: this.get_entityId()
                })
            }));

            return buttons;
        }

        protected updateInterface() {
            super.updateInterface();

            this.toolbar.findButton('export-pdf-button').toggle(this.isEditMode());
        }
    }
}