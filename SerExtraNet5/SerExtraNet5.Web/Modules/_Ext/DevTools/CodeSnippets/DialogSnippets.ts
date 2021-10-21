namespace _Ext {

    export class DialogSnippets extends DialogBase<AuditLogRow, any> {
        protected getFormKey() { return AuditLogForm.formKey; }
        protected getRowType() { return AuditLogRow; }
        protected getService() { return AuditLogService.baseUrl; }

        protected form = new AuditLogForm(this.idPrefix);
        

        protected addCssClass(): void { super.addCssClass(); }
        protected getTemplate(): string { return super.getTemplate(); }
        protected getTemplateName(): string { return super.getTemplateName(); }
        protected getFallbackTemplate(): string { return super.getFallbackTemplate(); }

        protected initValidator(): void { super.initValidator(); }
        protected getValidatorOptions(): JQueryValidation.ValidationOptions { return super.getValidatorOptions(); }


        protected initTabs(): void { super.initTabs(); }
        protected initToolbar(): void { super.initToolbar(); }
        protected getToolbarButtons(): Serenity.ToolButton[] { return super.getToolbarButtons(); }
        protected initPropertyGrid(): void { super.initPropertyGrid(); }
        //protected initPropertyGridAsync(): PromiseLike<void> { return super.initPropertyGridAsync(); }
        protected getPropertyGridOptions(): Serenity.PropertyGridOptions { return super.getPropertyGridOptions(); }
        //protected getPropertyGridOptionsAsync(): PromiseLike<Serenity.PropertyGridOptions> { return super.getPropertyGridOptionsAsync(); }
        protected initLocalizationGrid(): void { super.initLocalizationGrid(); }
        //protected initLocalizationGridAsync(): PromiseLike<void> { return super.initLocalizationGridAsync(); }
        protected initLocalizationGridCommon(pgOptions: Serenity.PropertyGridOptions): void { super.initLocalizationGridCommon(pgOptions); }

        load(entityOrId: any, done: () => void, fail: (ex: Q.Exception) => void): void { super.load(entityOrId, done, fail); }
        loadResponse(data: any): void { super.loadResponse(data); }
        protected onLoadingData(data: Serenity.RetrieveResponse<AuditLogRow>): void { super.onLoadingData(data); }
        protected beforeLoadEntity(entity: AuditLogRow): void { super.beforeLoadEntity(entity); }
        protected loadEntity(entity: AuditLogRow): void { super.loadEntity(entity); }
        protected set_entityId(value: any): void { super.set_entityId(value); }
        protected set_entity(entity: any): void { super.set_entity(entity); }

        protected isEditMode(): boolean { return super.isEditMode(); }
        protected get_entityId(): any { return super.get_entityId(); }
        protected get_entity(): AuditLogRow { return super.get_entity(); }

        protected afterLoadEntity(): void { super.afterLoadEntity(); }
        protected updateInterface(): void { super.updateInterface(); }

        protected isDeleted(): boolean { return super.isDeleted(); }
        protected isLocalizationMode(): boolean { return super.isLocalizationMode(); }
        protected isNew(): boolean { return super.isNew(); }

        protected updateTitle(): void { super.updateTitle(); }
        protected getEntityTitle(): string { return super.getEntityTitle(); }
        protected getEntitySingular(): string { return super.getEntitySingular(); }

        protected getSaveEntity(): AuditLogRow { return super.getSaveEntity(); }

        protected initDialog(): void { super.initDialog(); }
        protected getDialogOptions(): JQueryUI.DialogOptions { return super.getDialogOptions(); }
        protected getDialogTitle(): string { return super.getDialogTitle(); }
        protected handleResponsive(): void { super.handleResponsive(); }
        protected onDialogOpen(): void { super.onDialogOpen(); }

        protected arrange(): void { super.arrange(); }


        //save cycle
        protected save(callback?: (response: Serenity.SaveResponse) => void): void | boolean { return super.save(callback); }
        protected validateBeforeSave(): boolean { return super.validateBeforeSave(); }
        protected save_submitHandler(callback: (response: Serenity.SaveResponse) => void): void { super.save_submitHandler(callback); }
        protected getSaveOptions(callback: (response: Serenity.SaveResponse) => void): Serenity.ServiceOptions<Serenity.SaveResponse> { return super.getSaveOptions(callback); }
        //isEditMode
        //get_entityId
        //isCloneMode
        protected getSaveRequest(): Serenity.SaveRequest<AuditLogRow> { return super.getSaveRequest(); }
        //protected getSaveEntity(): AuditLogRow { return super.getSaveEntity(); }
        protected saveHandler(options: Serenity.ServiceOptions<Serenity.SaveResponse>, callback: (response: Serenity.SaveResponse) => void): void { super.saveHandler(options, callback); }

        protected onSaveSuccess(response: Serenity.SaveResponse): void { super.onSaveSuccess(response); }
        loadById(id: any, callback?: (response: Serenity.RetrieveResponse<AuditLogRow>) => void, fail?: () => void): void { super.loadById(id, callback); }
        protected getLoadByIdRequest(id: any): Serenity.RetrieveRequest { return super.getLoadByIdRequest(id); }
        protected getLoadByIdOptions(id: any, callback: (response: Serenity.RetrieveResponse<AuditLogRow>) => void): Serenity.ServiceOptions<Serenity.RetrieveResponse<AuditLogRow>> { return super.getLoadByIdOptions(id, callback); }
        protected loadByIdHandler(options: Serenity.ServiceOptions<Serenity.RetrieveResponse<AuditLogRow>>, callback: (response: Serenity.RetrieveResponse<AuditLogRow>) => void, fail: () => void): void { super.loadByIdHandler(options, callback, fail); }
        protected showSaveSuccessMessage(response: Serenity.SaveResponse): void { super.showSaveSuccessMessage(response); }
        //loadResponse(data: any): void { super.loadResponse(data); }



        //protected initializeAsync(): PromiseLike<void> { return super.initializeAsync(); }
        protected getEntityNameFieldValue(): any { return super.getEntityNameFieldValue(); }
        protected isCloneMode(): boolean { return super.isCloneMode(); }
        protected isNewOrDeleted(): boolean { return super.isNewOrDeleted(); }
        protected getDeleteOptions(callback: (response: Serenity.DeleteResponse) => void): Serenity.ServiceOptions<Serenity.DeleteResponse> { return super.getDeleteOptions(callback); }
        protected deleteHandler(options: Serenity.ServiceOptions<Serenity.DeleteResponse>, callback: (response: Serenity.DeleteResponse) => void): void { super.deleteHandler(options, callback); }
        protected doDelete(callback: (response: Serenity.DeleteResponse) => void): void { super.doDelete(callback); }
        protected onDeleteSuccess(response: Serenity.DeleteResponse): void { super.onDeleteSuccess(response); }
        //protected attrs<TAttr>(attrType: {
        //    new (...args: any[]): TAttr;
        //}): TAttr[];
        protected getEntityType(): string { return super.getEntityType(); }
        //protected getFormKey(): string { return super.getFormKey();}
        protected getLocalTextDbPrefix(): string { return super.getLocalTextDbPrefix(); }
        //protected getLocalTextPrefix(): string { return super.getLocalTextPrefix();}
        //protected getNameProperty(): string { return super.getNameProperty();}
        //protected getIdProperty(): string { return super.getIdProperty();}
        protected getIsActiveProperty(): string { return super.getIsActiveProperty(); }
        protected getIsDeletedProperty(): string { return super.getIsDeletedProperty(); }
        //protected getService(): string { return super.getService();}
        loadNewAndOpenDialog(asPanel?: boolean): void { super.loadNewAndOpenDialog(asPanel); }
        loadEntityAndOpenDialog(entity: AuditLogRow, asPanel?: boolean): void { super.loadNewAndOpenDialog(asPanel); }

        loadByIdAndOpenDialog(entityId: any, asPanel?: boolean): void { super.loadByIdAndOpenDialog(entityId, asPanel); }
        protected reloadById(): void { super.reloadById(); }
        protected isLocalizationModeAndChanged(): boolean { return super.isLocalizationModeAndChanged(); }
        protected localizationButtonClick(): void { super.localizationButtonClick(); }
        protected getLanguages(): any[] { return super.getLanguages(); }
        protected loadLocalization(): void { super.loadLocalization(); }
        protected setLocalizationGridCurrentValues(): void { super.setLocalizationGridCurrentValues(); }
        protected getLocalizationGridValue(): any { return super.getLocalizationGridValue(); }
        protected getPendingLocalizations(): any { return super.getPendingLocalizations(); }
        protected getPropertyItems(): Serenity.PropertyItem[] { return super.getPropertyItems(); }
        //protected getPropertyItemsAsync(): PromiseLike<Serenity.PropertyItem[]> { return super.getPropertyItemsAsync(); }
        protected getCloningEntity(): AuditLogRow { return super.getCloningEntity(); }
        protected getUndeleteOptions(callback?: (response: Serenity.UndeleteResponse) => void): Serenity.ServiceOptions<Serenity.UndeleteResponse> { return super.getUndeleteOptions(callback); }
        protected undeleteHandler(options: Serenity.ServiceOptions<Serenity.UndeleteResponse>, callback: (response: Serenity.UndeleteResponse) => void): void { super.undeleteHandler(options, callback); }
        protected undelete(callback?: (response: Serenity.UndeleteResponse) => void): void { super.undelete(callback); }

        //destroy(): void;
        //protected initToolbar(): void { super.initToolbar();}
        //protected getToolbarButtons(): Serenity.ToolButton[] { return super.getToolbarButtons();}
        protected resetValidation(): void { super.resetValidation(); }
        protected validateForm(): boolean { return super.validateForm(); }
        //dialogOpen(asPanel?: boolean): void;
        //static openPanel(element: JQuery, uniqueName: string): void;
        //static closePanel(element: JQuery, e?: JQueryEventObject): void;
        protected onDialogClose(): void { super.onDialogClose(); }
        destroy(): void { super.destroy(); }

        //dialogClose(): void;
        //set_dialogTitle(value: string): void;


    }
}
