namespace _Ext {

    @Serenity.Decorators.registerClass()
    export class GridItemPickerDialog extends Serenity.TemplatedDialog<GridItemPickerEditorOptions> {
        getTemplate() {
            return `<div id="~_RowSelectionCheckGrid" 
                class="RowSelectionCheckGrid ${this.options.multiple == true ? 'multi-select' : 'single-select'}" 
                style = "margin: 15px 15px 0 15px;" >
            </div>`
        }

        checkGrid: GridBase<any, GridItemPickerEditorOptions>;
        get selectedItems() { return this.checkGrid.selectedItems }

        constructor(options: GridItemPickerEditorOptions) {
            super(options);

            var gridType = options.gridType;

            if (!gridType.prototype)
                gridType = Q.typeByFullName(options.gridType);

            try {
                this.checkGrid = new gridType(this.byId("RowSelectionCheckGrid"), options);
                if (options.preSelectedKeys)
                    this.checkGrid.selectedKeys = options.preSelectedKeys;

                this.dialogTitle = "Select " + this.checkGrid.getTitle();
                this.checkGrid.setTitle(null);
                this.checkGrid.pickerDialog = this;
            } catch (ex) {
                Q.notifyError('Could not intialize ' + options.gridType);
            }
        }

        onSuccess = (selectedItems) => { }

        getDialogOptions() {
            let opt = super.getDialogOptions();
            opt.buttons = [{
                text: Q.text("Dialogs.OkButton"),
                click: () => {
                    var selectedItems = this.checkGrid.selectedItems;
                    if (!selectedItems.length) {
                        Q.notifyWarning("Please select some items!");
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