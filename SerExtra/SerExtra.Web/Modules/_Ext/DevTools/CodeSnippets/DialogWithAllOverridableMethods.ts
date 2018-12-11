namespace _Ext {

    export class DialogWithAllOverridableMethods extends DialogBase<AuditLogRow, any> {
        protected getFormKey() { return AuditLogForm.formKey; }
        protected getIdProperty() { return AuditLogRow.idProperty; }
        protected getLocalTextPrefix() { return AuditLogRow.localTextPrefix; }
        protected getNameProperty() { return AuditLogRow.nameProperty; }
        protected getService() { return AuditLogService.baseUrl; }

        protected form = new AuditLogForm(this.idPrefix);

        protected initializeAsync(): PromiseLike<void> { console.log('initializeAsync'); return super.initializeAsync(); }
        destroy(): void { console.log('destroy'); super.destroy(); }
        protected get_entity(): AuditLogRow { console.log('get_entity'); return super.get_entity(); }
        protected set_entity(entity: any): void { console.log('set_entity(entity: any'); super.set_entity(entity); }
        protected get_entityId(): any { console.log('get_entityId'); return super.get_entityId(); }
        protected set_entityId(value: any): void { console.log('set_entityId(value: any'); super.set_entityId(value); }
        protected getEntityNameFieldValue(): any { console.log('getEntityNameFieldValue'); return super.getEntityNameFieldValue(); }
        protected getEntityTitle(): string { console.log('getEntityTitle'); return super.getEntityTitle(); }
        protected updateTitle(): void { console.log('updateTitle'); super.updateTitle(); }
        protected isCloneMode(): boolean { console.log('isCloneMode'); return super.isCloneMode(); }
        protected isEditMode(): boolean { console.log('isEditMode'); return super.isEditMode(); }
        protected isDeleted(): boolean { console.log('isDeleted'); return super.isDeleted(); }
        protected isNew(): boolean { console.log('isNew'); return super.isNew(); }
        protected isNewOrDeleted(): boolean { console.log('isNewOrDeleted'); return super.isNewOrDeleted(); }
        protected getDeleteOptions(callback: (response: Serenity.DeleteResponse) => void): Serenity.ServiceOptions<Serenity.DeleteResponse> { console.log('getDeleteOptions(callback: (response: DeleteResponse) => void'); return super.getDeleteOptions(callback); }
        protected deleteHandler(options: Serenity.ServiceOptions<Serenity.DeleteResponse>, callback: (response: Serenity.DeleteResponse) => void): void { console.log('deleteHandler(options: ServiceOptions<DeleteResponse>, callback: (response: DeleteResponse) => void'); super.deleteHandler(options, callback); }
        protected doDelete(callback: (response: Serenity.DeleteResponse) => void): void { console.log('doDelete(callback: (response: DeleteResponse) => void'); super.doDelete(callback); }
        protected onDeleteSuccess(response: Serenity.DeleteResponse): void { console.log('onDeleteSuccess(response: DeleteResponse'); super.onDeleteSuccess(response); }
        //protected attrs<TAttr>(attrType: {
        //    new (...args: any[]): TAttr;
        //}): TAttr[];
        protected getEntityType(): string { console.log('getEntityType'); return super.getEntityType(); }
        //protected getFormKey(): string { console.log('getFormKey'); return super.getFormKey();}
        protected getLocalTextDbPrefix(): string { console.log('getLocalTextDbPrefix'); return super.getLocalTextDbPrefix(); }
        //protected getLocalTextPrefix(): string { console.log('getLocalTextPrefix'); return super.getLocalTextPrefix();}
        protected getEntitySingular(): string { console.log('getEntitySingular'); return super.getEntitySingular(); }
        //protected getNameProperty(): string { console.log('getNameProperty'); return super.getNameProperty();}
        //protected getIdProperty(): string { console.log('getIdProperty'); return super.getIdProperty();}
        protected getIsActiveProperty(): string { console.log('getIsActiveProperty'); return super.getIsActiveProperty(); }
        protected getIsDeletedProperty(): string { console.log('getIsDeletedProperty'); return super.getIsDeletedProperty(); }
        //protected getService(): string { console.log('getService'); return super.getService();}
        load(entityOrId: any, done: () => void, fail: (ex: ss.Exception) => void): void { console.log('load'); super.load(entityOrId, done, fail); }
        loadNewAndOpenDialog(asPanel?: boolean): void { console.log('loadNewAndOpenDialog'); super.loadNewAndOpenDialog(asPanel); }
        loadEntityAndOpenDialog(entity: AuditLogRow, asPanel?: boolean): void { console.log('loadNewAndOpenDialog'); super.loadNewAndOpenDialog(asPanel); }

        loadResponse(data: any): void { console.log('loadResponse(data: any'); super.loadResponse(data); }
        protected loadEntity(entity: AuditLogRow): void { console.log('loadEntity(entity: AuditLogRow'); super.loadEntity(entity); }
        protected beforeLoadEntity(entity: AuditLogRow): void { console.log('beforeLoadEntity(entity: AuditLogRow'); super.beforeLoadEntity(entity); }
        protected afterLoadEntity(): void { console.log('afterLoadEntity'); super.afterLoadEntity(); }
        loadByIdAndOpenDialog(entityId: any, asPanel?: boolean): void { console.log('loadNewAndOpenDialog'); super.loadByIdAndOpenDialog(entityId, asPanel); }
        protected onLoadingData(data: Serenity.RetrieveResponse<AuditLogRow>): void { console.log('onLoadingData(data: RetrieveResponse<AuditLogRow>'); super.onLoadingData(data); }
        protected getLoadByIdOptions(id: any, callback: (response: Serenity.RetrieveResponse<AuditLogRow>) => void): Serenity.ServiceOptions<Serenity.RetrieveResponse<AuditLogRow>> { console.log('getLoadByIdOptions(id: any, callback: (response: RetrieveResponse<AuditLogRow>) => void'); return super.getLoadByIdOptions(id, callback); }
        protected getLoadByIdRequest(id: any): Serenity.RetrieveRequest { console.log('getLoadByIdRequest(id: any'); return super.getLoadByIdRequest(id); }
        protected reloadById(): void { console.log('reloadById'); super.reloadById(); }
        loadById(id: any, callback?: (response: Serenity.RetrieveResponse<AuditLogRow>) => void, fail?: () => void): void { console.log('loadById'); super.loadById(id, callback); }
        protected loadByIdHandler(options: Serenity.ServiceOptions<Serenity.RetrieveResponse<AuditLogRow>>, callback: (response: Serenity.RetrieveResponse<AuditLogRow>) => void, fail: () => void): void { console.log('loadByIdHandler(options: ServiceOptions<RetrieveResponse<AuditLogRow>>, callback: (response: RetrieveResponse<AuditLogRow>) => void, fail: () => void'); super.loadByIdHandler(options, callback, fail); }
        protected initLocalizationGrid(): void { console.log('initLocalizationGrid'); super.initLocalizationGrid(); }
        protected initLocalizationGridAsync(): PromiseLike<void> { console.log('initLocalizationGridAsync'); return super.initLocalizationGridAsync(); }
        protected initLocalizationGridCommon(pgOptions: Serenity.PropertyGridOptions): void { console.log('initLocalizationGridCommon(pgOptions: PropertyGridOptions'); super.initLocalizationGridCommon(pgOptions); }
        protected isLocalizationMode(): boolean { console.log('isLocalizationMode'); return super.isLocalizationMode(); }
        protected isLocalizationModeAndChanged(): boolean { console.log('isLocalizationModeAndChanged'); return super.isLocalizationModeAndChanged(); }
        protected localizationButtonClick(): void { console.log('localizationButtonClick'); super.localizationButtonClick(); }
        protected getLanguages(): any[] { console.log('getLanguages'); return super.getLanguages(); }
        protected loadLocalization(): void { console.log('loadLocalization'); super.loadLocalization(); }
        protected setLocalizationGridCurrentValues(): void { console.log('setLocalizationGridCurrentValues'); super.setLocalizationGridCurrentValues(); }
        protected getLocalizationGridValue(): any { console.log('getLocalizationGridValue'); return super.getLocalizationGridValue(); }
        protected getPendingLocalizations(): any { console.log('getPendingLocalizations'); return super.getPendingLocalizations(); }
        protected initPropertyGrid(): void { console.log('initPropertyGrid'); super.initPropertyGrid(); }
        protected initPropertyGridAsync(): PromiseLike<void> { console.log('initPropertyGridAsync'); return super.initPropertyGridAsync(); }
        protected getPropertyItems(): Serenity.PropertyItem[] { console.log('getPropertyItems'); return super.getPropertyItems(); }
        protected getPropertyGridOptions(): Serenity.PropertyGridOptions { console.log('getPropertyGridOptions'); return super.getPropertyGridOptions(); }
        protected getPropertyGridOptionsAsync(): PromiseLike<Serenity.PropertyGridOptions> { console.log('getPropertyGridOptionsAsync'); return super.getPropertyGridOptionsAsync(); }
        protected getPropertyItemsAsync(): PromiseLike<Serenity.PropertyItem[]> { console.log('getPropertyItemsAsync'); return super.getPropertyItemsAsync(); }
        protected validateBeforeSave(): boolean { console.log('validateBeforeSave'); return super.validateBeforeSave(); }
        protected getSaveOptions(callback: (response: Serenity.SaveResponse) => void): Serenity.ServiceOptions<Serenity.SaveResponse> { console.log('getSaveOptions(callback: (response: SaveResponse) => void'); return super.getSaveOptions(callback); }
        protected getSaveEntity(): AuditLogRow { console.log('getSaveEntity'); return super.getSaveEntity(); }
        protected getSaveRequest(): Serenity.SaveRequest<AuditLogRow> { console.log('getSaveRequest'); return super.getSaveRequest(); }
        protected onSaveSuccess(response: Serenity.SaveResponse): void { console.log('onSaveSuccess(response: SaveResponse'); super.onSaveSuccess(response); }
        protected save_submitHandler(callback: (response: Serenity.SaveResponse) => void): void { console.log('save_submitHandler(callback: (response: SaveResponse) => void'); super.save_submitHandler(callback); }
        protected save(callback?: (response: Serenity.SaveResponse) => void): void | boolean { console.log('save(callback?: (response: SaveResponse) => void'); return super.save(callback); }
        protected saveHandler(options: Serenity.ServiceOptions<Serenity.SaveResponse>, callback: (response: Serenity.SaveResponse) => void): void { console.log('saveHandler(options: ServiceOptions<SaveResponse>, callback: (response: SaveResponse) => void'); super.saveHandler(options, callback); }
        protected initToolbar(): void { console.log('initToolbar'); super.initToolbar(); }
        protected showSaveSuccessMessage(response: Serenity.SaveResponse): void { console.log('showSaveSuccessMessage(response: SaveResponse'); super.showSaveSuccessMessage(response); }
        protected getToolbarButtons(): Serenity.ToolButton[] { console.log('getToolbarButtons'); return super.getToolbarButtons(); }
        protected getCloningEntity(): AuditLogRow { console.log('getCloningEntity'); return super.getCloningEntity(); }
        protected updateInterface(): void { console.log('updateInterface'); super.updateInterface(); }
        protected getUndeleteOptions(callback?: (response: Serenity.UndeleteResponse) => void): Serenity.ServiceOptions<Serenity.UndeleteResponse> { console.log('getUndeleteOptions(callback?: (response: UndeleteResponse) => void'); return super.getUndeleteOptions(callback); }
        protected undeleteHandler(options: Serenity.ServiceOptions<Serenity.UndeleteResponse>, callback: (response: Serenity.UndeleteResponse) => void): void { console.log('undeleteHandler(options: ServiceOptions<UndeleteResponse>, callback: (response: UndeleteResponse) => void'); super.undeleteHandler(options, callback); }
        protected undelete(callback?: (response: Serenity.UndeleteResponse) => void): void { console.log('undelete(callback?: (response: UndeleteResponse) => void'); super.undelete(callback); }

        //Serenity.TemplatedDialog ---------------------------
        //destroy(): void;
        protected initDialog(): void { console.log('initDialog'); super.initDialog(); }
        //protected initToolbar(): void { console.log('initToolbar'); super.initToolbar();}
        //protected getToolbarButtons(): Serenity.ToolButton[] { console.log('getToolbarButtons'); return super.getToolbarButtons();}
        protected getValidatorOptions(): JQueryValidation.ValidationOptions { console.log('getValidatorOptions'); return super.getValidatorOptions(); }
        protected initValidator(): void { console.log('initValidator'); super.initValidator(); }
        protected resetValidation(): void { console.log('resetValidation'); super.resetValidation(); }
        protected validateForm(): boolean { console.log('validateForm'); return super.validateForm(); }
        //dialogOpen(asPanel?: boolean): void;
        //static openPanel(element: JQuery, uniqueName: string): void;
        //static closePanel(element: JQuery, e?: JQueryEventObject): void;
        protected onDialogOpen(): void { console.log('onDialogOpen'); super.onDialogOpen(); }
        protected arrange(): void { console.log('arrange'); super.arrange(); }
        protected onDialogClose(): void { console.log('onDialogClose');  super.onDialogClose(); }
        protected addCssClass(): void { console.log('addCssClass'); super.addCssClass(); }
        protected getDialogOptions(): JQueryUI.DialogOptions { console.log('getDialogOptions'); return super.getDialogOptions(); }
        protected getDialogTitle(): string { console.log('getDialogTitle'); return super.getDialogTitle(); }
        //dialogClose(): void;
        //set_dialogTitle(value: string): void;
        protected initTabs(): void { console.log('initTabs'); super.initTabs(); }
        protected handleResponsive(): void { console.log('handleResponsive'); super.handleResponsive(); }

        //Serenity.TemplatedWidget -------------------------------
        protected getTemplateName(): string { console.log('getTemplateName'); return super.getTemplateName(); }
        protected getFallbackTemplate(): string { console.log('getFallbackTemplate'); return super.getFallbackTemplate(); }
        protected getTemplate(): string { console.log('getTemplate'); return super.getTemplate(); }

    }
}

//open a new dialog cycle-------------
//addCssClass
// getTemplate
// getTemplateName
//initValidator
//getValidatorOptions
// initTabs
//initToolbar
//getToolbarButtons
//initPropertyGrid
//getPropertyGridOptions
//getPropertyItems
//initLocalizationGrid
//getPropertyGridOptions
//getPropertyItems
//initLocalizationGridCommon(pgOptions: PropertyGridOptions
//load
//loadResponse(data: any
//onLoadingData(data: RetrieveResponse<AuditLogRow>
//beforeLoadEntity(entity: AuditLogRow
//loadEntity(entity: AuditLogRow
//set_entityId(value: any
//set_entity(entity: any
//isEditMode
//get_entityId
//set_entity(entity: any
//afterLoadEntity
//updateInterface
//isDeleted
//get_entityId
//isLocalizationMode
//isLocalizationMode
//isEditMode
//get_entityId
//isEditMode
//get_entityId
//isNew
//get_entityId
//updateTitle
//getEntityTitle
//isEditMode
//get_entityId
//getEntitySingular
//getLocalTextDbPrefix
//getSaveEntity
//isEditMode
//get_entityId
//initDialog
// getDialogOptions
// getDialogTitle
// handleResponsive
// onDialogOpen
// arrange

//dialog closing cycle-----------------
//getSaveEntity
//isEditMode
//get_entityId
// onDialogClose
//destroy

//save cycle---------------------------
//save(callback?: (response: SaveResponse) => void
//validateBeforeSave
//save_submitHandler(callback: (response: SaveResponse) => void
//getSaveOptions(callback: (response: SaveResponse) => void
//isEditMode
//get_entityId
//isCloneMode
//getSaveRequest
//getSaveEntity
//isEditMode
//get_entityId
//isCloneMode
//get_entityId
//isEditMode
//get_entityId
//isCloneMode
//get_entityId
//saveHandler(options: ServiceOptions<SaveResponse>, callback: (response: SaveResponse) => void
//onSaveSuccess(response: SaveResponse
// isEditMode
//get_entityId
//isCloneMode
//loadById
//getLoadByIdRequest(id: any
//getLoadByIdOptions(id: any, callback: (response: RetrieveResponse<AuditLogRow>) => void
//loadByIdHandler(options: ServiceOptions<RetrieveResponse<AuditLogRow>>, callback: (response: RetrieveResponse<AuditLogRow>) => void, fail: () => void
//showSaveSuccessMessage(response: SaveResponse
//isEditMode
//get_entityId
//isCloneMode
//isEditMode
//get_entityId
//isCloneMode
//get_entityId
//loadResponse(data: any
//onLoadingData(data: RetrieveResponse<AuditLogRow>
//beforeLoadEntity(entity: AuditLogRow
//loadEntity(entity: AuditLogRow
//set_entityId(value: any
//set_entity(entity: any
//isEditMode
//get_entityId
//isCloneMode
//set_entity(entity: any
//afterLoadEntity
//updateInterface
//isDeleted
//get_entityId
//getIsDeletedProperty
//get_entity
//getIsActiveProperty
//isLocalizationMode
//isLocalizationMode
//isEditMode
//get_entityId
//isCloneMode
//isEditMode
//get_entityId
//isCloneMode
//isNew
//get_entityId
//updateTitle
//getEntityTitle
//isEditMode
//get_entityId
//isCloneMode
//getEntityNameFieldValue
//get_entity
//getEntitySingular
//getSaveEntity
//isEditMode
//get_entityId
//isCloneMode
//get_entityId

//delete entity ------------------------
//doDelete(callback: (response: DeleteResponse) => void
//get_entityId
//getDeleteOptions(callback: (response: DeleteResponse) => void
//deleteHandler(options: ServiceOptions<DeleteResponse>, callback: (response: DeleteResponse) => void
//onDeleteSuccess(response: DeleteResponse
// onDialogClose
//destroy