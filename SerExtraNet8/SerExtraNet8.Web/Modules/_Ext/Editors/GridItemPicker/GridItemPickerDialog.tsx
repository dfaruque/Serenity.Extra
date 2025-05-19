import { BaseDialog, Decorators, getType, localText, notifyWarning } from "@serenity-is/corelib";
import { GridBase } from "../../Bases/GridBase";

@Decorators.registerClass()
export class GridItemPickerDialog<TItem> extends BaseDialog<GridItemPickerEditorOptions> {

    checkGrid: GridBase<TItem, GridItemPickerEditorOptions>;
    get selectedItems() { return this.checkGrid.selectedItems }

    constructor(options: GridItemPickerEditorOptions) {
        super(options);

        try {
            var gridType = getType(options.gridType) as any;
            (options as any).element = this.byId("RowSelectionCheckGrid");

            this.checkGrid = new gridType(options);
            if (options.preSelectedKeys)
                this.checkGrid.selectedKeys = options.preSelectedKeys;

            this.dialogTitle = localText('Controls.Select', "Select") + " - " + this.checkGrid.getTitle();
            this.checkGrid.setTitle(null);

            this.checkGrid.pickerDialog = this;
        } catch (ex) {
            console.warn('Could not intialize ' + options.gridType);
        }
    }

    onSuccess = (selectedItems: TItem[]) => { }

    getDialogOptions() {
        let opt = super.getDialogOptions();
        opt.buttons = [{
            text: localText("Dialogs.OkButton"),
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
            text: localText("Dialogs.CancelButton"),
            click: () => {
                this.dialogClose()
            }
        }];

        opt.size = 'xl';

        return opt;
    }

    protected renderContents(): any {
        const id = this.useIdPrefix();
        return <div id={id.RowSelectionCheckGrid}
            class={"RowSelectionCheckGrid " + (this.options.multiple == true ? 'multi-select' : 'single-select')}
        >
        </div>;
    }
}