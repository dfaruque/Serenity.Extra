namespace _Ext {
    @Serenity.Decorators.responsive()
    @Serenity.Decorators.maximizable()
    export class DialogBase<TEntity, TOptions>
        //this comment is for preventing replacement 
        extends Serenity.EntityDialog<TEntity, TOptions> {
        //protected getLookupKey() { return this.getLocalTextPrefix() }
        private loadedState: string;
        isReadOnly: boolean = false;
        protected form: any;

        constructor(opt?) {
            super(opt);
            this.element.fadeTo(0, 0);
            _Ext.DialogUtils.pendingChangesConfirmation(this.element, () => this.getSaveState() != this.loadedState);
        }

        protected updateInterface() {
            super.updateInterface();

            this.setReadOnly(this.isReadOnly);
        }
        protected onDialogOpen() {
            super.onDialogOpen();
            this.fullContentArea();
            this.element.fadeTo(100, 1);
        }

        protected setReadOnly(value: boolean) {
            this.isReadOnly = value;

            if (this.isReadOnly == true) {
                this.saveAndCloseButton.toggleClass('disabled', this.isReadOnly);
                this.applyChangesButton.toggleClass('disabled', this.isReadOnly);
                this.deleteButton.toggleClass('disabled', this.isReadOnly);

                // remove required asterisk (*)
                this.element.find('sup').toggle(this.isReadOnly);
                for (let editor in this.form) {
                    if (this.form[editor].widgetName) {

                        Serenity.EditorUtils.setReadOnly(this.form[editor], this.isReadOnly);
                    }
                }

            }
        }

        protected getToolbarButtons(): Serenity.ToolButton[] {
            let buttons = super.getToolbarButtons();
            //buttons.push({
            //    title: 'Refresh',
            //    icon: 'fa fa-refresh',
            //    onClick: () => {
            //        this.onRefreshClick();
            //    }
            //})

            //buttons.push({
            //    title: 'Change Log',
            //    icon: 'fa fa-history',
            //    onClick: () => {
            //        let entityId = this.entity['Id'];
            //        if (entityId) {
            //            let dlg = new AuditLogViewerDialog({ FormKey: this.getFormKey(), EntityId: entityId });

            //            dlg.dialogOpen();
            //        } else {
            //            Q.alert('No change log found for this entity.')
            //        }
            //    }
            //})

            return buttons;
        }

        onRefreshClick() {
        }

        protected getSaveState() {
            try {
                return $.toJSON(this.getSaveEntity());
            }
            catch (e) {
                return null;
            }
        }

        protected onSaveSuccess(response) {
            super.onSaveSuccess(response);
            isPageRefreshRequired = true;
            //Q.reloadLookup(this.getLookupKey());
        }

        loadResponse(data) {
            super.loadResponse(data);
            this.loadedState = this.getSaveState();
        }

        maximize() {
            this.element.closest(".ui-dialog").find(".ui-icon-maximize-window").click();
        }

        fullContentArea() {
            this.setDialogSize();
        }
        // set the dialog size relative to content area (to shrink use negative value)
        setDialogSize(width?, height?, top?, left?) {
            let $content = $('section.content');
            let dialogElement = this.element ? this.element.closest(".ui-dialog") : $(".ui-dialog");

            if ($content.length > 0) {
                try {
                    this.element.dialog("option", "width", $content.width() + 30 + (width || 0));
                    this.element.dialog("option", "height", $content.height() + (height || 30));
                } catch (e) {
                }

                dialogElement.css({
                    left: $content.position().left + (left || 0),
                    top: (top || 50),
                });
            }

            setTimeout(() => {
                this.afterSetDialogSize();
            }, 200);

        }

        afterSetDialogSize() {

        }

    }
}