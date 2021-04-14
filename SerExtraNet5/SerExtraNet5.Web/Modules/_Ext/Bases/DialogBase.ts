namespace _Ext {
    @Serenity.Decorators.responsive()
    @Serenity.Decorators.maximizable()
    export class DialogBase<TEntity, TOptions>
        //this comment is for preventing replacement 
        extends Serenity.EntityDialog<TEntity, TOptions> {
        protected getRowType(): { idProperty?: string, localTextPrefix?: string, nameProperty?: string, insertPermission?: string, updatePermission?: string, deletePermission?: string, } { return {}; }
        protected getIdProperty() { return this.getRowType().idProperty; }
        protected getLocalTextPrefix() { return this.getRowType().localTextPrefix; }
        protected getNameProperty() { return this.getRowType().nameProperty; }
        protected getInsertPermission() { return this.getRowType().insertPermission; }
        protected getUpdatePermission() { return this.getRowType().updatePermission; }
        protected getDeletePermission() { return this.getRowType().deletePermission; }

        protected get_ExtDialogOptions(): ExtDialogOptions { return Q.deepClone(q.DefaultEntityDialogOptions); }

        private loadedState: string;
        isReadOnly: boolean = false;
        protected form: any;

        constructor(opt?) {
            super(opt);
            //this.element.fadeTo(0, 0);

            if (this.get_ExtDialogOptions().PendingChangesConfirmation == true) {
                _Ext.DialogUtils.pendingChangesConfirmation(this.element, () => this.getSaveState() != this.loadedState);
            }
        }

        protected updateInterface() {
            super.updateInterface();

            this.setReadOnly(this.isReadOnly);

            //this.element.fadeTo(100, 1);
        }

        protected onDialogOpen() {
            super.onDialogOpen();

            if (this.get_ExtDialogOptions().AutoFitContentArea == true) {
                this.fullContentArea();
            }

            if (this.get_ExtDialogOptions().HideCategoyLinksBar == true) {
                this.element.find('.category-links').hide();

                let $FirstCategory = this.element.find('.first-category > .category-title');

                if (Q.isEmptyOrNull($FirstCategory.find('.category-anchor').text()))
                    $FirstCategory.hide();

            }

            if (this.get_ExtDialogOptions().ShowKeyboardLayoutButtonInToolbar == true) {
                let $thisElement = this.element;

                //if (q.isBanglaMode())
                //    q.switchKeybordLayout($thisElement, 'phonetic')

                this.toolbar.element.append(`<div class="dropdown pull-right" style="padding: 5px 10px;">
                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="${q.text('Controls.KeyboardLayout.Title', 'Keyboard Layout')}">
                        <i class="fa fa-keyboard-o"></i> <span class="selected-layout"> </span> <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right choose-keyboard">
                        <li class="dropdown-header">${q.text('Controls.KeyboardLayout.Title', 'Keyboard Layout')}</li>
                        <li data-kb="phonetic"><a href="javascript:"> ${q.text('Controls.KeyboardLayout.BanglaPhonetic', 'Bangla-Phonetic')}</a></li>
                        <li data-kb="probhat"><a href="javascript:"> ${q.text('Controls.KeyboardLayout.BanglaProbhat', 'Bangla-Probhat')}</a></li>
                        <li data-kb="unijoy"><a href="javascript:"> ${q.text('Controls.KeyboardLayout.BanglaUnijoy', 'Bangla-Unijoy')}</a></li>
                        <li data-kb="english"><a href="javascript:"> ${q.text('Controls.KeyboardLayout.English', 'English')}</a></li>
                    </ul>
                </div>`);

                let selected_layout_display_span = this.toolbar.element.find('.selected-layout');
                let keyboard_choice_ul = this.toolbar.element.find('.choose-keyboard');
                let keyboard_choice_li = keyboard_choice_ul.find('li');

                keyboard_choice_li.on('click', function () {
                    let select_choice = $(this);
                    let selected_val = select_choice.data('kb');

                    if (selected_val) {
                        selected_layout_display_span.text(select_choice.text());

                        q.switchKeybordLayout($thisElement, selected_val);

                        keyboard_choice_li.removeClass('active');
                        keyboard_choice_ul.find('[data-kb="' + selected_val + '"]').addClass('active');
                    }
                });

            }

            //temporary fix for set grid editor height
            setTimeout(() => { this.onAfterSetDialogSize(); }, 200)

        }

        protected onDialogClose() {
            super.onDialogClose();

            this.onAfterDialogClose(this.getSaveEntity());
        }

        protected setReadOnly(value: boolean) {
            this.readOnly = value;
            this.isReadOnly = value;

            if (this.isReadOnly == true) {
                this.saveAndCloseButton.toggleClass('disabled', this.isReadOnly);
                this.applyChangesButton.toggleClass('disabled', this.isReadOnly);
                this.deleteButton.toggleClass('disabled', this.isReadOnly);
                this.cloneButton.toggleClass('disabled', this.isReadOnly);
                this.undeleteButton.toggleClass('disabled', this.isReadOnly);
                this.toolbar.findButton('btn-save-and-close').addClass('disabled');
                this.toolbar.findButton('btn-save-and-new').addClass('disabled');
                this.toolbar.findButton('btn-replace-row').addClass('disabled');
                this.toolbar.findButton('btn-history').addClass('disabled');
                this.toolbar.findButton('btn-custom').addClass('disabled');

                // remove required asterisk (*)
                this.element.find('sup').toggle(this.isReadOnly);
                for (let editor in this.form) {
                    if (this.form[editor].widgetName) {

                        try {
                            Serenity.EditorUtils.setReadOnly(this.form[editor], this.isReadOnly);
                        } catch{ }
                    }
                }

            }
        }

        protected getToolbarButtons(): Serenity.ToolButton[] {
            let buttons = super.getToolbarButtons();
            let extOptions = this.get_ExtDialogOptions();

            if (extOptions.ShowSaveAndNewButtonInToolbar == true)
                buttons.push({
                    title: q.text('Controls.EntityDialog.SaveAndNew', 'Save & New'),
                    icon: 'fa fa-save',
                    cssClass: 'btn-save-and-new',
                    onClick: () => {
                        this.onSaveAndNewButtonClick();
                    }
                });

            if (extOptions.ShowCloseButtonInToolbar == true)
                buttons.push({
                    title: q.text('Controls.EntityDialog.Close', 'Close'),
                    icon: 'fa fa-close',
                    cssClass: 'btn-close',
                    onClick: () => {
                        this.dialogClose();
                    }
                });

            if (extOptions.ShowRefreshButtonInToolbar == true)
                buttons.push({
                    title: q.text('Controls.EntityDialog.Refresh', 'Refresh'),
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
                        cssClass: 'btn-history',
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

                //clone button click event customization
                let cloneButton = Q.tryFirst(buttons, x => x.cssClass == 'clone-button');

                cloneButton.onClick = () => {

                    if (!this.isEditMode()) {
                        return;
                    }

                    var cloneEntity = this.getCloningEntity();

                    Serenity.Widget.create({
                        type: Q.getInstanceType(this),
                        init: (dlg: DialogBase<any, any>) => {
                            this.parentGrid.initDialog(dlg);
                            dlg.loadEntityAndOpenDialog(cloneEntity, null);
                        }
                    });

                    this.dialogClose();
                }
            } catch (e) { }

            return buttons;
        }

        protected onRefreshClick() {
            this.reloadById();
        }

        protected onSaveAndNewButtonClick() {
            this.save(response => {
                this.loadEntity({} as any);
            });
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

                let $categories = this.element.find('.categories');
                let categoriesTop = $categories.position().top;

                $categories.height(dialogHeight - titleBarHeight - categoriesTop - 20);

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

                let $categories = this.element.find('.categories');
                let categoriesTop = $categories.position().top;

                $categories.height(dialogHeight - titleBarHeight - categoriesTop - 20);

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

        parentGrid: GridBase<TEntity, any>;
    }
}