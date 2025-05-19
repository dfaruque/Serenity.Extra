import { hasPermission } from "@/Administration/User/Authentication/Authorization";
import { Decorators, deepClone, EditorUtils, EntityDialog, getInstanceType, localText, ToolButton, tryFirst, Widget } from "@serenity-is/corelib";
import { DialogUtils } from "@serenity-is/extensions";
import { DefaultEntityDialogOptions, showField } from "../_q/_q";
import { GridBase } from "./GridBase";

@Decorators.maximizable()
export class DialogBase<TEntity, TOptions> extends EntityDialog<TEntity, TOptions> {

    protected get_ExtDialogOptions() { return deepClone(DefaultEntityDialogOptions); }

    protected getTenantIdEditor() { return this.form.TenantId; }

    protected loadedState: string;
    isReadOnly: boolean = false;
    protected form: any;

    constructor(opt?: TOptions) {
        super(opt);

        const extOpt = this.get_ExtDialogOptions();

        if (extOpt.PendingChangesConfirmation == true) {
            DialogUtils.pendingChangesConfirmation(this.element, () =>
                this.getSaveState() != this.loadedState);
        }

        if (extOpt.VerticalForm == true) {
            this.propertyGrid.element.addClass('s-vertical-form');
        }

        if (extOpt.HasSubcategory == true) {
            this.propertyGrid.element.addClass('has-sub-category')
                .findAll('.sub-category')
                .forEach(subCat => {
                    subCat.closest('.category')
                        .classList.add('sub-category');
                });
        }
    }

    protected updateInterface() {
        super.updateInterface();

        this.setReadOnly(this.isReadOnly);

        showField(this.getTenantIdEditor(), hasPermission('Administration:Tenant:Update'));
    }

    protected onDialogOpen() {
        super.onDialogOpen();

        let extOptions = this.get_ExtDialogOptions();

        if (extOptions.ShowKeyboardLayoutButtonInToolbar == true) {
            //let $thisElement = this.element;

            //if (q.isBanglaMode())
            //    q.switchKeybordLayout($thisElement, 'phonetic')

            //this.toolbar.element.append(`<div class="dropdown pull-right" style="padding: 5px 10px;">
            //        <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="${q.text('Controls.KeyboardLayout.Title', 'Keyboard Layout')}">
            //            <i class="fa fa-keyboard-o"></i> <span class="selected-layout"> </span> <span class="caret"></span>
            //        </a>
            //        <ul class="dropdown-menu dropdown-menu-right choose-keyboard">
            //            <li class="dropdown-header">${q.text('Controls.KeyboardLayout.Title', 'Keyboard Layout')}</li>
            //            <li data-kb="phonetic"><a href="javascript:"> ${q.text('Controls.KeyboardLayout.BanglaPhonetic', 'Bangla-Phonetic')}</a></li>
            //            <li data-kb="probhat"><a href="javascript:"> ${q.text('Controls.KeyboardLayout.BanglaProbhat', 'Bangla-Probhat')}</a></li>
            //            <li data-kb="unijoy"><a href="javascript:"> ${q.text('Controls.KeyboardLayout.BanglaUnijoy', 'Bangla-Unijoy')}</a></li>
            //            <li data-kb="english"><a href="javascript:"> ${q.text('Controls.KeyboardLayout.English', 'English')}</a></li>
            //        </ul>
            //    </div>`);

            //let selected_layout_display_span = this.toolbar.element.find('.selected-layout');
            //let keyboard_choice_ul = this.toolbar.element.find('.choose-keyboard');
            //let keyboard_choice_li = keyboard_choice_ul.find('li');

            //keyboard_choice_li.on('click', function () {
            //    let select_choice = $(this);
            //    let selected_val = select_choice.data('kb');

            //    if (selected_val) {
            //        selected_layout_display_span.text(select_choice.text());

            //        q.switchKeybordLayout($thisElement, selected_val);

            //        keyboard_choice_li.removeClass('active');
            //        keyboard_choice_ul.find('[data-kb="' + selected_val + '"]').addClass('active');
            //    }
            //});
        }
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
            this.element.findEach('sup', el => el.toggle(this.isReadOnly));

            for (let editor in this.form) {
                if (this.form[editor].uniqueName) {
                    try {
                        EditorUtils.setReadOnly(this.form[editor], this.isReadOnly);
                    } catch { }
                }
            }

        }
    }

    protected getToolbarButtons(): ToolButton[] {
        let buttons = super.getToolbarButtons();
        let extOptions = this.get_ExtDialogOptions();

        if (extOptions.ShowSaveAndNewButtonInToolbar == true)
            buttons.push({
                title: localText('Controls.EntityDialog.SaveAndNew', 'Save & New'),
                icon: 'fa fa-save',
                cssClass: 'btn-save-and-new',
                onClick: () => {
                    this.onSaveAndNewButtonClick();
                }
            });

        if (extOptions.ShowCloseButtonInToolbar == true)
            buttons.push({
                title: localText('Controls.EntityDialog.Close', 'Close'),
                icon: 'fa fa-close',
                cssClass: 'btn-close',
                onClick: () => {
                    this.dialogClose();
                }
            });

        if (extOptions.ShowRefreshButtonInToolbar == true)
            buttons.push({
                title: localText('Controls.EntityDialog.Refresh', 'Refresh'),
                icon: 'fa fa-refresh',
                onClick: () => {
                    this.onRefreshClick();
                }
            });

        try {
            //if (extOptions.ShowReplaceRowButtonInToolbar == true && Q.Authorization.hasPermission('Administration:ReplaceRow')) {
            //    if (Q.isEmptyOrNull(this.getService()) == false) {
            //        buttons.push({
            //            title: 'Replace',
            //            icon: 'fa fa-trash-o',
            //            cssClass: 'btn-replace-row',
            //            onClick: () => {
            //                let idProperty = this.getIdProperty();
            //                let nameProperty = this.getNameProperty();
            //                let entityId = this.entity[idProperty];
            //                let entityName = this.entity[nameProperty];

            //                if (entityId) {
            //                    Q.serviceRequest(this.getService() + '/List', {}, (response: ListResponse<any>) => {
            //                        let entityList = response.Entities;

            //                        let dlg = new ReplaceRowDialog({
            //                            FormKey: this.getFormKey(),
            //                            IdProperty: idProperty,
            //                            NameProperty: nameProperty,
            //                            EntityTypeTitle: this.getEntitySingular(),
            //                            DeletedEntityName: entityName,
            //                            DeletedEntityId: entityId,
            //                        },
            //                            entityList);

            //                        dlg.dialogOpen();

            //                        this.dialogClose();
            //                    });
            //                }
            //            }
            //        })
            //    }
            //}


            //if (extOptions.ShowChangeLogButtonInToolbar == true && Q.Authorization.hasPermission('Administration:AuditLog')) {
            //    buttons.push({
            //        cssClass: 'btn-history',
            //        icon: 'fa fa-history',
            //        onClick: () => {
            //            let entityId = this.entity[this.getIdProperty()];
            //            if (entityId) {
            //                let dlg = new AuditLogViewerDialog({ FormKey: this.getFormKey(), EntityId: entityId });

            //                dlg.dialogOpen();
            //            } else {
            //                Q.alert('No change log found for this entity.')
            //            }
            //        }
            //    });
            //}

            //clone button click event customization
            let cloneButton = tryFirst(buttons, x => x.cssClass == 'clone-button');

            cloneButton.onClick = () => {

                if (!this.isEditMode()) {
                    return;
                }

                var cloneEntity = this.getCloningEntity();

                Widget.create({
                    type: getInstanceType(this),
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
            return JSON.stringify(this.getSaveEntity());
        }
        catch (e) {
            return null;
        }
    }

    loadResponse(data) {
        super.loadResponse(data);

        if (this.get_ExtDialogOptions().PendingChangesConfirmation == true) {
            this.loadedState = this.getSaveState();
        }
    }

    onAfterDialogClose(entity: TEntity) { }

    parentGrid: GridBase<TEntity, any>;
}
