namespace _Ext {
    @Serenity.Decorators.responsive()
    @Serenity.Decorators.maximizable()
    export class DialogBase<TEntity, TOptions>
        //this comment is for preventing replacement 
        extends Serenity.EntityDialog<TEntity, TOptions> {
        //protected getLookupKey() { return this.getLocalTextPrefix() }
        private loadedState: string;
        isReadOnly: boolean;
        protected form: any;

        constructor(opt?) {
            super(opt);
            this.element.fadeTo(0, 0);
            _Ext.DialogUtils.pendingChangesConfirmation(this.element, () => this.getSaveState() != this.loadedState);
        }

        protected updateInterface() {
            super.updateInterface();

            if (this.isReadOnly == true) {
                this.saveAndCloseButton.addClass('disabled');
                this.applyChangesButton.addClass('disabled');
                this.deleteButton.addClass('disabled');

                // remove required asterisk (*)
                this.element.find('sup').hide();
                for (let editor in this.form) {
                    if (this.form[editor].widgetName) {

                        Serenity.EditorUtils.setReadOnly(this.form[editor], this.isReadOnly);
                    }
                }
            }

        }
        protected onDialogOpen() {
            super.onDialogOpen();
            this.fullContentArea();
            this.element.fadeTo(100, 1);
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
                this.element.dialog("option", "width", $content.width() + (width || 0));
                this.element.dialog("option", "height", $content.height() + (height || 105));

                dialogElement.css({
                    left: $content.position().left + 15 + (left || 0),
                    top: (top || 0),
                });
            }
        }

        hideEditorCaption(editor: JQuery) {
            editor.siblings('.caption').hide();
        }

        setGridEditorHeight(editor: JQuery, heightInPx: number) {
            editor.css('height', heightInPx + 'px');
            editor.children('.grid-container').css('height', (heightInPx - 25) + 'px');

        }
    }
}