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

            if (q.hideCategoyLinksBarInPropertyDialog == true) {
                this.element.find('.category-links').hide();
            }
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
            try {
                if (Q.Authorization.username.indexOf('admin') >= 0) {
                    if (Q.isEmptyOrNull(this.getService()) == false) {
                        buttons.push({
                            title: 'Replace',
                            icon: 'fa fa-trash-o',
                            onClick: () => {
                                let idProperty = this['getIdProperty']();
                                let nameProperty = this['getNameProperty']();
                                let entityId = this.entity[idProperty];
                                let entityName = this.entity[nameProperty];

                                if (entityId) {

                                    Q.serviceRequest(this.getService() + '/List', {}, (response: Serenity.ListResponse<any>) => {
                                        let entityList = response.Entities;

                                        let dlg = new ReplaceRowDialog({
                                            FormKey: this.getFormKey(),
                                            IdProperty: idProperty,
                                            NameProperty: nameProperty,
                                            EntityTypeTitle: this.getEntitySingular(),
                                            DeletedEntityName: entityName,
                                            DeletedEntityId: entityId,
                                        },
                                            entityList);

                                        dlg.dialogOpen();

                                        this.dialogClose();
                                    });
                                }
                            }
                        })
                    }

                    buttons.push({
                        title: 'Change Log',
                        icon: 'fa fa-history',
                        onClick: () => {
                            let entityId = this.entity['Id'];
                            if (entityId) {
                                let dlg = new AuditLogViewerDialog({ FormKey: this.getFormKey(), EntityId: entityId });

                                dlg.dialogOpen();
                            } else {
                                Q.alert('No change log found for this entity.')
                            }
                        }
                    })
                }
            } catch (e) { }
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