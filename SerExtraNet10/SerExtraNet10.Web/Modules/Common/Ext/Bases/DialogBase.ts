import { Decorators, deepClone, EditorUtils, EntityDialog, getInstanceType, localText, ToolButton, tryFirst, Widget } from "@serenity-is/corelib";
import { DialogUtils } from "@serenity-is/extensions";
import { DefaultEntityDialogOptions, showField } from "../q/q";
import { GridBase } from "./GridBase";
import { hasPermission } from "../../../Administration/User/Authentication/Authorization";

@Decorators.maximizable()
export class DialogBase<TEntity, TOptions> extends EntityDialog<TEntity, TOptions> {

    protected getExtDialogOptions() { return deepClone(DefaultEntityDialogOptions); }

    protected getTenantIdEditor() { return this.form.TenantId; }

    protected loadedState: string;
    isReadOnly: boolean = false;
    protected form: any;

    constructor(opt?: TOptions) {
        super(opt);

        const extOpt = this.getExtDialogOptions();

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

    protected override updateInterface() {
        super.updateInterface();

        this.setReadOnly(this.isReadOnly);

        showField(this.getTenantIdEditor(), hasPermission('Administration:Tenant:Update'));
    }

    protected override onDialogClose() {
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

    protected override getToolbarButtons(): ToolButton[] {
        let buttons = super.getToolbarButtons();
        let extOptions = this.getExtDialogOptions();

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

    override loadResponse(data) {
        super.loadResponse(data);

        if (this.getExtDialogOptions().PendingChangesConfirmation == true) {
            this.loadedState = this.getSaveState();
        }
    }

    onAfterDialogClose(entity: TEntity) { }

    parentGrid: GridBase<TEntity, any>;
}
