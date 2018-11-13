/// <reference path="ProductCheckGrid.ts" />
namespace SerExtra.Northwind {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.maximizable()
    export class ProductPickerDialog extends Serenity.TemplatedDialog<any> {
        getTemplate() { return '<div id="~_CheckGrid"><\/div>' }

        checkGrid = new ProductCheckGrid(this.byId("CheckGrid"))

        constructor() {
            super();

            this.dialogTitle = "Select Products"
        }

        get selectedItems() {
            return this.checkGrid.selectedItems
        }

        onSuccess = (selectedItems) => { }

        getDialogOptions() {
            let opt = super.getDialogOptions();
            opt.buttons = [{
                text: Q.text("Dialogs.OkButton"),
                click: () => {
                    var selectedItems = this.checkGrid.selectedItems;
                    if (!selectedItems.length) {
                        Q.notifyWarning("Please select some products!");
                        return
                    }
                    this.onSuccess(selectedItems);
                    this.dialogClose();
                }
            }, {
                text: Q.text("Dialogs.CancelButton"),
                click: () => {
                    this.dialogClose()
                }
            }];

            return opt
        }
    }
}