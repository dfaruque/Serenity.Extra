import { Decorators, getType, notifyWarning, TemplatedDialog, text } from "@serenity-is/corelib"
import * as q from "../../_q/_q"
import { GridBase } from "../../Bases/GridBase"

@Decorators.registerClass()
export class GridItemPickerDialog extends TemplatedDialog<GridItemPickerEditorOptions> {
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


            try {
                var gridType = getType(options.gridType) as any;

                this.checkGrid = new gridType(this.byId("RowSelectionCheckGrid"), options);
                if (options.preSelectedKeys)
                    this.checkGrid.selectedKeys = options.preSelectedKeys;

                this.dialogTitle = q.text('Controls.Select', "Select") + " - " + this.checkGrid.getTitle();
                this.checkGrid.setTitle(null);
                this.checkGrid.element.height(500);

                this.checkGrid.pickerDialog = this;
            } catch (ex) {
                console.warn('Could not intialize ' + options.gridType);
            }
    }

    onSuccess = (selectedItems) => { }

    getDialogOptions() {
        let opt = super.getDialogOptions();
        opt.buttons = [{
            text: text("Dialogs.OkButton"),
            click: () => {
                var selectedItems = this.checkGrid.selectedItems;
                if (!selectedItems.length) {
                    notifyWarning("Please select some items!");
                    return
                }
                this.onSuccess(selectedItems);
                this.dialogClose();
            }
        }, {
            text: text("Dialogs.CancelButton"),
            click: () => {
                this.dialogClose()
            }
        }];

        opt.height = 500;
        return opt
    }

}
