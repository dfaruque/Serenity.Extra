namespace _Ext {
    @Serenity.Decorators.responsive()
    @Serenity.Decorators.maximizable()
    export class DialogBase<TEntity, TOptions>
        //this comment is for preventing replacement 
        extends Serenity.EntityDialog<TEntity, TOptions> {

        protected get_ExtDialogOptions(): ExtDialogOptions { return q.DefaultEntityDialogOptions; }

        private loadedState: string;
        isReadOnly: boolean = false;
        protected form: any;

        constructor(opt?) {
            super(opt);
            this.element.fadeTo(0, 0);

            if (this.get_ExtDialogOptions().PendingChangesConfirmation == true) {
                _Ext.DialogUtils.pendingChangesConfirmation(this.element, () => this.getSaveState() != this.loadedState);
            }
        }

        protected updateInterface() {
            super.updateInterface();

            this.setReadOnly(this.isReadOnly);

            if (this.get_ExtDialogOptions().HideCategoyLinksBar == true) {
                this.element.find('.category-links').hide();
            }
        }
        protected onDialogOpen() {
            super.onDialogOpen();

            if (this.get_ExtDialogOptions().AutoFitContentArea == true) {
                this.fullContentArea();
            }

            //temporary fix for set grid editor height
            setTimeout(() => { this.onAfterSetDialogSize(); }, 200)

            this.element.fadeTo(100, 1);
        }

        protected onDialogClose() {
            super.onDialogClose();

            this.onAfterDialogClose(this.entity);
        }

        protected setReadOnly(value: boolean) {
            this.isReadOnly = value;

            if (this.isReadOnly == true) {
                this.saveAndCloseButton.toggleClass('disabled', this.isReadOnly);
                this.applyChangesButton.toggleClass('disabled', this.isReadOnly);
                this.deleteButton.toggleClass('disabled', this.isReadOnly);
                this.cloneButton.toggleClass('disabled', this.isReadOnly);
                this.undeleteButton.toggleClass('disabled', this.isReadOnly);
                this.toolbar.findButton('btn-replace-row').addClass('disabled');

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
            let extOptions = this.get_ExtDialogOptions();

            if (extOptions.ShowCloseButtonInToolbar == true)
                buttons.push({
                    title: 'Close',
                    icon: 'fa fa-close',
                    onClick: () => {
                        this.dialogClose();
                    }
                });

            if (extOptions.ShowRefreshButtonInToolbar == true)
                buttons.push({
                    title: 'Refresh',
                    icon: 'fa fa-refresh',
                    onClick: () => {
                        this.onRefreshClick();
                    }
                });

            try {
                if (extOptions.ShowReplaceRowButtonInToolbar == true && Q.Authorization.hasPermission('Administration:ReplaceRow')) {
                    if (Q.isEmptyOrNull(this.getService()) == false) {
                        buttons.push({
                            title: 'Replace',
                            icon: 'fa fa-trash-o',
                            cssClass: 'btn-replace-row',
                            onClick: () => {
                                let idProperty = this.getIdProperty();
                                let nameProperty = this.getNameProperty();
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


                }


                if (extOptions.ShowChangeLogButtonInToolbar == true && Q.Authorization.hasPermission('Administration:AuditLog')) {

                    buttons.push({
                        title: 'Change Log',
                        icon: 'fa fa-history',
                        onClick: () => {
                            let entityId = this.entity[this.getIdProperty()];
                            if (entityId) {
                                let dlg = new AuditLogViewerDialog({ FormKey: this.getFormKey(), EntityId: entityId });

                                dlg.dialogOpen();
                            } else {
                                Q.alert('No change log found for this entity.')
                            }
                        }
                    });
                }
            } catch (e) { }
            return buttons;
        }

        onRefreshClick() {
            this.reloadById();
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

            if (this.get_ExtDialogOptions().PendingChangesConfirmation == true) {
                this.loadedState = this.getSaveState();
            }
        }

        maximize() {
            this.element.closest(".ui-dialog").find(".ui-dialog-titlebar-maximize").click();

            setTimeout(() => {
                let dialogElement = this.element ? this.element.closest(".ui-dialog") : $(".ui-dialog");

                let dialogHeight = dialogElement.height();
                let titleBarHeight = dialogElement.find('.ui-dialog-title').height() || 20;
                let toolBarHeight = dialogElement.find('.s-DialogToolbar.s-Toolbar').height() || 0;
                let tabBarHeight = dialogElement.find('.nav.nav-tabs.property-tabs').height() || 0;
                let categoryLinkHeight = dialogElement.find('.category-links').height() || 0;

                this.element.find('.categories').height(dialogHeight - titleBarHeight - toolBarHeight - tabBarHeight - categoryLinkHeight - 40);
            }, 100);

        }

        fullContentArea() {
            this.setDialogSize();
        }
        // set the dialog size relative to content area (to shrink use negative value)
        setDialogSize(width?, height?, top?, left?, $content?) {
            if (!$content) {
                $content = $('section.content');
            }
            if ($content.length == 0) {
                $content = $('.content-wrapper');
            }

            let dialogElement = this.element ? this.element.closest(".ui-dialog") : $(".ui-dialog");

            if ($content.length > 0 && dialogElement.length > 0) {

                let dialogWidth = $content.width() + 30 + (width || 0);
                let dialogHeight = $content.height() + (height || 30);

                this.element.dialog("option", "width", dialogWidth);
                this.element.dialog("option", "height", dialogHeight);

                let titleBarHeight = dialogElement.find('.ui-dialog-title').height() || 20;
                let toolBarHeight = dialogElement.find('.s-DialogToolbar.s-Toolbar').height() || 0;
                let tabBarHeight = dialogElement.find('.nav.nav-tabs.property-tabs').height() || 0;
                let categoryLinkHeight = dialogElement.find('.category-links').height() || 0;

                this.element.find('.categories').height(dialogHeight - titleBarHeight - toolBarHeight - tabBarHeight - categoryLinkHeight - 40);

                dialogElement.css({
                    left: $content.position().left + (left || 0),
                    top: (top || 50),
                });
            }

            setTimeout(() => {
                this.onAfterSetDialogSize();
            }, 200);

        }

        onAfterSetDialogSize() { }
        onAfterDialogClose(entity: TEntity) { }

    }
}