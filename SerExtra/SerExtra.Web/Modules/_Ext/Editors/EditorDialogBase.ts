/// <reference path="../Bases/DialogBase.ts" />
namespace _Ext {

    @Serenity.Decorators.registerClass()
    export class EditorDialogBase<TEntity> extends DialogBase<TEntity, any> {

        protected get_ExtDialogOptions() : ExtDialogOptions { return q.DefaultEditorDialogOptions; }

        protected getIdProperty() { return "__id"; }

        public onSave: (options: Serenity.ServiceOptions<Serenity.SaveResponse>,
            callback: (response: Serenity.SaveResponse) => void) => void;

        public onDelete: (options: Serenity.ServiceOptions<Serenity.DeleteResponse>,
            callback: (response: Serenity.DeleteResponse) => void) => void;

        public destroy() {
            this.onSave = null;
            this.onDelete = null;
            super.destroy();
        }

        protected updateInterface() {
            super.updateInterface();
            this.saveAndCloseButton.find('.button-inner').text(this.isNew() ? 'Add' : 'Apply');
            // apply changes button doesn't work properly with in-memory grids yet
            if (this.applyChangesButton) {
                this.applyChangesButton.hide();
            }

            if (this.parentEditor.isReadOnly == true) {
                this.saveAndCloseButton.addClass('disabled');
                this.deleteButton.addClass('disabled');

                Serenity.EditorUtils.setReadonly(this.element.find('.editor'), true);

                // remove required asterisk (*)
                this.element.find('sup').hide();

            }
        }

        protected saveHandler(options: Serenity.ServiceOptions<Serenity.SaveResponse>,
            callback: (response: Serenity.SaveResponse) => void): void {
            this.onSave && this.onSave(options, callback);
        }

        protected deleteHandler(options: Serenity.ServiceOptions<Serenity.DeleteResponse>,
            callback: (response: Serenity.DeleteResponse) => void): void {
            this.onDelete && this.onDelete(options, callback);
        }

        parentEditor: GridEditorBase<any>;

    }
}