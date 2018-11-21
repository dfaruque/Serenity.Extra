namespace _Ext {

    @Serenity.Decorators.registerClass()
    export class GridItemPickerDialog extends Serenity.TemplatedDialog<any> {
        getTemplate() { return '<div id="~_CheckGrid" style="margin: 15px 15px 0 15px;"><\/div>' }

        checkGrid: GridBase<any,any>;
        get selectedItems() { return this.checkGrid.selectedItems }

        constructor(gridType) {
            super();

            this.checkGrid = new gridType(this.byId("CheckGrid"));

            this.dialogTitle = "Select " + this.checkGrid.getTitle();
            this.checkGrid.setTitle(null);

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