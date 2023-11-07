import { Decorators, deepClone, DeleteResponse, SaveResponse, ServiceOptions, tryGetText } from "@serenity-is/corelib"
import { DialogBase } from "../Bases/DialogBase"
import { GridEditorBase } from "./GridEditorBase"
import * as q from "../_q/_q"

@Decorators.registerClass()
export class EditorDialogBase<TEntity> extends DialogBase<TEntity, any> {

    protected get_ExtDialogOptions(): ExtDialogOptions { return deepClone(q.DefaultEditorDialogOptions); }

    protected getIdProperty() { return "__id"; }

    public onSave: (options: ServiceOptions<SaveResponse>,
        callback: (response: SaveResponse) => void) => void;

    public onDelete: (options: ServiceOptions<DeleteResponse>,
        callback: (response: DeleteResponse) => void) => void;

    public destroy() {
        this.onSave = null;
        this.onDelete = null;
        super.destroy();
    }

    protected updateInterface() {
        if (this.parentEditor && this.parentEditor.isReadOnly == true) {
            this.isReadOnly = true
        }
        super.updateInterface();

        let saveButtonText = this.isNew() ? (tryGetText('Controls.AddButton') || 'Add') : (tryGetText('Controls.ApplyButton') || 'Apply');
        this.saveAndCloseButton.find('.button-inner').html(`<i class="fa fa-check-circle text-purple"></i> ${saveButtonText}`);

        // apply changes button doesn't work properly with in-memory grids yet
        if (this.applyChangesButton) {
            this.applyChangesButton.hide();
        }

    }

    protected saveHandler(options: ServiceOptions<SaveResponse>,
        callback: (response: SaveResponse) => void): void {
        this.onSave && this.onSave(options, callback);
    }

    protected deleteHandler(options: ServiceOptions<DeleteResponse>,
        callback: (response: DeleteResponse) => void): void {
        this.onDelete && this.onDelete(options, callback);
    }

    parentEditor: GridEditorBase<TEntity>;

}
