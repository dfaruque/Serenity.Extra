namespace _Ext {
    @Serenity.Decorators.filterable()
    export class GridWithAllOverridableMethods extends _Ext.GridBase<AuditLogRow, any> {
        protected getDialogType() { console.log('getDialogType'); return AuditLogDialog; }



        constructor(container: JQuery, options?) {

            console.log('constructor');

            super(container, options);

        }

        protected getInitialTitle(): string { console.log('getInitialTitle'); return super.getInitialTitle() }
        protected getDisplayName(): string { console.log('getDisplayName'); return super.getDisplayName() }
        protected getLocalTextPrefix() { console.log('getLocalTextPrefix'); return AuditLogRow.localTextPrefix; }

        setTitle(value: string): void { console.log('setTitle'); super.setTitle(value) }
        getTitle(): string { console.log('getTitle'); return super.getTitle() }

        //called on resizing the grid canvas
        protected layout(): void { console.log('layout'); super.layout() }

        protected getButtons(): Serenity.ToolButton[] { console.log('getButtons'); return super.getButtons() }
        protected getAddButtonCaption(): string { console.log('getAddButtonCaption'); return super.getAddButtonCaption() }

        protected getItemName(): string { console.log('getItemName'); return super.getItemName() }

        protected newRefreshButton(noText?: boolean): Serenity.ToolButton { console.log('newRefreshButton'); return super.newRefreshButton() }

        getView(): Slick.RemoteView<AuditLogRow> { console.log('getView'); return super.getView() }

        protected createToolbar(buttons: Serenity.ToolButton[]): void { console.log('createToolbar'); super.createToolbar(buttons) }
        protected createSlickContainer(): JQuery { console.log('createSlickContainer'); return super.createSlickContainer() }
        protected createView(): Slick.RemoteView<AuditLogRow> { console.log('createView'); return super.createView() }
        protected getViewOptions(): Slick.RemoteViewOptions { console.log('getViewOptions'); return super.getViewOptions() }
        protected getIdProperty() { console.log('getIdProperty'); return AuditLogRow.idProperty; }
        protected getDefaultSortBy(): any[] { console.log('getDefaultSortBy'); return super.getDefaultSortBy() }
        protected usePager(): boolean { console.log('usePager'); return true }
        protected getService() { console.log('getService'); return AuditLogService.baseUrl; }
        protected createSlickGrid(): Slick.Grid { console.log('createSlickGrid'); return super.createSlickGrid() }

        protected getColumns(): Slick.Column[] { console.log('getColumns'); return super.getColumns() }
        protected getPropertyItems(): Serenity.PropertyItem[] { console.log('getPropertyItems'); return super.getPropertyItems() }
        protected getColumnsKey() { console.log('getColumnsKey'); return '_Ext.AuditLog'; }
        protected propertyItemsToSlickColumns(propertyItems: Serenity.PropertyItem[]): Slick.Column[] { console.log('propertyItemsToSlickColumns'); return super.propertyItemsToSlickColumns(propertyItems) }

        protected itemLink(itemType?: string, idField?: string, text?: (ctx: Slick.FormatterContext) => string, cssClass?: (ctx: Slick.FormatterContext) => string, encode?: boolean): Slick.Format { console.log('itemLink(itemType?: string, idField?: string, text?: (ctx: Slick.FormatterContext) => string, cssClass?: '); return super.itemLink() }
        protected getItemType(): string { console.log('getItemType'); return super.getItemType() }
        protected getEntityType(): string { console.log('getEntityType'); return super.getEntityType() }
        //getIdProperty
        protected getSlickOptions(): Slick.GridOptions { console.log('getSlickOptions'); return super.getSlickOptions() }
        protected get_ExtGridOptions(): ExtGridOptions {
            console.log('get_ExtGridOptions');
            let opt = Q.deepClone(super.get_ExtGridOptions());
            //change some options here

            opt.ShowRowSelectionCheckboxColumn = true;
            return opt;

        }
        protected postProcessColumns(columns: Slick.Column[]): Slick.Column[] { console.log('postProcessColumns'); return super.postProcessColumns(columns) }
        protected setInitialSortOrder(): void { console.log('setInitialSortOrder'); super.setInitialSortOrder() }

        protected enableFiltering(): boolean { console.log('enableFiltering'); return super.enableFiltering() }
        protected createFilterBar(): void { console.log('createFilterBar'); super.createFilterBar() }
        protected initializeFilterBar(): void { console.log('initializeFilterBar'); super.initializeFilterBar() }
        //call for each quick Column
        protected canFilterColumn(column: Slick.Column): boolean { console.log('canFilterColumn'); return super.canFilterColumn(column) }

        //usePager
        protected createPager(): void { console.log('createPager'); super.createPager() }
        protected getPagerOptions(): Slick.PagerOptions { console.log('getPagerOptions'); return super.getPagerOptions() }

        protected bindToSlickEvents(): void { console.log('bindToSlickEvents'); super.bindToSlickEvents() }
        protected bindToViewEvents(): void { console.log('bindToViewEvents'); super.bindToViewEvents() }

        protected createToolbarExtensions(): void { console.log('createToolbarExtensions'); super.createToolbarExtensions() }
        protected createIncludeDeletedButton(): void { console.log('createIncludeDeletedButton'); super.createIncludeDeletedButton() }
        protected createQuickSearchInput(): void { console.log('createQuickSearchInput'); super.createQuickSearchInput() }
        protected getQuickSearchFields(): Serenity.QuickSearchField[] { console.log('getQuickSearchFields'); return super.getQuickSearchFields() }

        protected createQuickFilters(): void { console.log('createQuickFilters'); super.createQuickFilters() }
        protected getQuickFilters(): Serenity.QuickFilter<Serenity.Widget<any>, any>[] { console.log('getQuickFilters'); return super.getQuickFilters() }
        protected dateTimeRangeQuickFilter(field: string, title?: string): Serenity.QuickFilter<Serenity.DateTimeEditor, Serenity.DateTimeEditorOptions> { console.log('dateTimeRangeQuickFilter'); return super.dateTimeRangeQuickFilter(field, title) }

        //call for each quick filter
        protected addQuickFilter<TWidget extends Serenity.Widget<any>, TOptions>(opt: Serenity.QuickFilter<TWidget, TOptions>): TWidget { console.log('addQuickFilter<TWidget extends Serenity.Widget<any>, TOptions>'); return super.addQuickFilter(opt) }
        protected add_submitHandlers(action: () => void): void { console.log('add_submitHandlers(action: '); super.add_submitHandlers(action) }

        protected updateDisabledState(): void { console.log('updateDisabledState'); super.updateDisabledState() }

        protected getCurrentSettings(flags?: Serenity.GridPersistanceFlags): Serenity.PersistedGridSettings { console.log('getCurrentSettings'); return super.getCurrentSettings() }
        protected gridPersistanceFlags(): Serenity.GridPersistanceFlags { console.log('gridPersistanceFlags'); return super.gridPersistanceFlags() }
        protected restoreSettings(settings?: Serenity.PersistedGridSettings, flags?: Serenity.GridPersistanceFlags): void { console.log('restoreSettings'); super.restoreSettings() }
        protected getPersistedSettings(): Serenity.PersistedGridSettings { console.log('getPersistedSettings'); return super.getPersistedSettings() }
        protected getPersistanceStorage(): Serenity.SettingStorage { console.log('getPersistanceStorage'); return super.getPersistanceStorage() }

        //getView
        getGrid(): Slick.Grid { console.log('getGrid'); return super.getGrid() }
        //getView
        //getGrid

        protected initialPopulate(): void { console.log('initialPopulate'); super.initialPopulate() }
        //called for each refresh request
        protected populateWhenVisible(): boolean { console.log('populateWhenVisible'); return super.populateWhenVisible() }

        //called for each refresh request
        protected onViewSubmit(): boolean { console.log('onViewSubmit'); return super.onViewSubmit() }
        //called for each refresh request
        protected getGridCanLoad(): boolean { console.log('getGridCanLoad'); return super.getGridCanLoad() }
        //called for each refresh request
        protected setCriteriaParameter(): void { console.log('setCriteriaParameter'); super.setCriteriaParameter() }
        //called for each refresh request
        protected setIncludeColumnsParameter(): void { console.log('setIncludeColumnsParameter'); super.setIncludeColumnsParameter() }
        //called for each refresh request
        protected getIncludeColumns(include: { [key: string]: boolean; }): void { console.log('getIncludeColumns'); super.getIncludeColumns(include) }

        //called for each refresh request
        protected invokeSubmitHandlers(): void { console.log('invokeSubmitHandlers'); super.invokeSubmitHandlers() }

        //called for each refresh request
        protected onViewProcessData(response: Serenity.ListResponse<AuditLogRow>): Serenity.ListResponse<AuditLogRow> { console.log('onViewProcessData'); return super.onViewProcessData(response) }

        //called for each row on every Refresh OR Layout change
        protected getItemMetadata(item: AuditLogRow, index: number): any { console.log('getItemMetadata'); return super.getItemMetadata(item, index) }
        //called for each row on every Refresh OR Layout change
        protected getItemCssClass(item: AuditLogRow, index: number): string { console.log('getItemCssClass'); return super.getItemCssClass(item, index) }
        //called for each row on every Refresh OR Layout change
        protected getIsActiveProperty(): string { console.log('getIsActiveProperty'); return super.getIsActiveProperty() }
        //called for each row on every Refresh OR Layout change
        protected getIsDeletedProperty(): string { console.log('getIsDeletedProperty'); return super.getIsDeletedProperty() }

        //called for each row on every refresh request
        protected onViewFilter(item: AuditLogRow): boolean { console.log('onViewFilter'); return super.onViewFilter(item) }

        getElement(): JQuery { console.log('getElement'); return super.getElement() }

        //called for each refresh request
        protected viewDataChanged(e: any, rows: AuditLogRow[]): void { console.log('viewDataChanged'); super.viewDataChanged(e, rows) }
        //called for each refresh request
        protected markupReady(): void { console.log('markupReady'); super.markupReady() }

        //called for each refresh request
        getItems(): AuditLogRow[] { console.log('getItems'); return super.getItems() }
        //called for each refresh request
        setItems(value: AuditLogRow[]): void { console.log('setItems'); super.setItems(value) }





        protected addButtonClick(): void { console.log('addButtonClick'); super.addButtonClick() }

        protected editItem(entityOrId: any): void { console.log('editItem'); super.editItem(entityOrId) }

        protected editItemOfType(itemType: string, entityOrId: any): void { console.log('editItemOfType'); super.editItemOfType(itemType, entityOrId) }

        //protected getService(): string { console.log('getService'); return super.getButtons() }



        protected routeDialog(itemType: string, dialog: Serenity.Widget<any>): void { console.log('routeDialog'); super.routeDialog(itemType, dialog) }

        //protected initDialog(dialog): void { console.log('initDialog'); super.initDialog(dialog) }

        protected initEntityDialog(itemType: string, dialog: Serenity.Widget<any>): void { console.log('initEntityDialog'); super.initEntityDialog(itemType, dialog) }

        protected createEntityDialog(itemType: string, callback?: (dlg: Serenity.Widget<any>) => void): Serenity.Widget<any> { console.log('createEntityDialog(itemType: string, callback?: '); return super.createEntityDialog(itemType, callback) }

        protected getDialogOptions(): JQueryUI.DialogOptions { console.log('getDialogOptions'); return super.getDialogOptions() }

        protected getDialogOptionsFor(itemType: string): JQueryUI.DialogOptions { console.log('getDialogOptionsFor'); return super.getDialogOptionsFor(itemType) }

        //protected getDialogTypeFor(itemType: string): { console.log('getDialogTypeFor');

        //    new(...args: any[]): Serenity.Widget<any>;

        //};

        //protected getDialogType(): { console.log('getDialogType');

        //    new(...args: any[]): Serenity.Widget<any>;

        //};
        //Inherited from Serenity.DataGrid ______________________________________________________________________


        protected remove_submitHandlers(action: () => void): void { console.log('remove_submitHandlers(action: '); super.remove_submitHandlers(action) }


        //protected getInitialTitle(): string;

        //protected createToolbarExtensions(): void;



        //protected findQuickFilter<TWidget>(type: { console.log('findQuickFilter<TWidget>');

        //    new (...args: any[]): TWidget;

        //}, field: string): TWidget;

        //protected tryFindQuickFilter<TWidget>(type: { console.log('tryFindQuickFilter<TWidget>');

        //    new(...args: any[]): TWidget;

        //}, field: string): TWidget;



        destroy(): void { console.log('destroy'); super.destroy() }


        protected initializeAsync(): PromiseLike<void> { console.log('initializeAsync'); return super.initializeAsync() }



        //itemAt(row: number): any;

        //rowCount(): number;



        //protected getAddButtonCaption(): string;

        //protected getButtons(): ToolButton[];

        //protected editItem(entityOrId: any): void;

        //protected editItemOfType(itemType: string, entityOrId: any): void;

        protected onClick(e: JQueryEventObject, row: number, cell: number): void { console.log('onClick'); super.onClick(e, row, cell) }


        protected setEquality(field: string, value: any): void { console.log('setEquality'); super.setEquality(field, value) }

        //protected usePager(): boolean;

        //protected getViewOptions(): Slick.RemoteViewOptions;

        //protected getItemType(): string;


        //protected getColumnsKey(): string;

        protected getPropertyItemsAsync(): PromiseLike<Serenity.PropertyItem[]> { console.log('getPropertyItemsAsync'); return super.getPropertyItemsAsync() }


        protected getColumnsAsync(): PromiseLike<Slick.Column[]> { console.log('getColumnsAsync'); return super.getColumnsAsync() }

        protected populateLock(): void { console.log('populateLock'); super.populateLock() }

        protected populateUnlock(): void { console.log('populateUnlock'); super.populateUnlock() }


        refresh(): void { console.log('refresh'); super.refresh() }

        protected refreshIfNeeded(): void { console.log('refreshIfNeeded'); super.refreshIfNeeded() }

        //called for each refresh request
        protected internalRefresh(): void { console.log('internalRefresh'); super.internalRefresh() }

        setIsDisabled(value: boolean): void { console.log('setIsDisabled'); super.setIsDisabled(value) }

        //protected getLocalTextDbPrefix(): string;

        //protected getLocalTextPrefix(): string;

        //protected getIdProperty(): string;



        protected resizeCanvas(): void { console.log('resizeCanvas'); super.resizeCanvas() }

        protected subDialogDataChange(): void { console.log('subDialogDataChange'); super.subDialogDataChange() }

        protected addFilterSeparator(): void { console.log('addFilterSeparator'); super.addFilterSeparator() }

        protected determineText(getKey: (prefix: string) => string): string { console.log('determineText'); return super.determineText(getKey) }


        protected addDateRangeFilter(field: string, title?: string): Serenity.DateEditor { console.log('addDateRangeFilter'); return super.addDateRangeFilter(field, title) }

        protected dateRangeQuickFilter(field: string, title?: string): Serenity.QuickFilter<Serenity.DateEditor, Serenity.DateTimeEditorOptions> { console.log('dateRangeQuickFilter'); return super.dateRangeQuickFilter(field, title) }

        protected addDateTimeRangeFilter(field: string, title?: string): Serenity.DateTimeEditor { console.log('addDateTimeRangeFilter'); return super.addDateTimeRangeFilter(field, title) }


        protected addBooleanFilter(field: string, title?: string, yes?: string, no?: string): Serenity.SelectEditor { console.log('addBooleanFilter'); return super.addBooleanFilter(field, title, yes, no) }

        protected booleanQuickFilter(field: string, title?: string, yes?: string, no?: string): Serenity.QuickFilter<Serenity.SelectEditor, Serenity.SelectEditorOptions> { console.log('booleanQuickFilter'); return super.booleanQuickFilter(field, title, yes, no) }


        protected quickFilterChange(e: JQueryEventObject): void { console.log('quickFilterChange'); super.quickFilterChange(e) }


        protected getPersistanceKey(): string { console.log('getPersistanceKey'); return super.getPersistanceKey() }


        protected canShowColumn(column: Slick.Column): boolean { console.log('canShowColumn'); return super.canShowColumn(column) }



        protected persistSettings(flags?: Serenity.GridPersistanceFlags): void { console.log('persistSettings'); super.persistSettings() }

        getFilterStore(): Serenity.FilterStore { console.log('getFilterStore'); return super.getFilterStore() }

    }

}

// * represnts the frequency
//------------------------------------------
//GRID Refresh CYCLE 
//------------------------------------------

//  refresh
//  populateWhenVisible
//  internalRefresh
//  onViewSubmit ***
//  getGridCanLoad
//  setCriteriaParameter
//  setIncludeColumnsParameter
//  getIncludeColumns
//  invokeSubmitHandlers
//  onViewProcessData **
//  get_ExtGridOptions
//for each row {
//  onViewFilter
//  getItemMetadata
//  getItemCssClass
//  getIsActiveProperty
//  getIsDeletedProperty
//  }
//  viewDataChanged
//  markupReady *
//the following should not be called. now it is called because of _Ext row number generation.
//  getItems
//  setItems
//  onViewFilter
//  viewDataChanged
//  markupReady

//------------------------------------------
//GRID onClick CYCLE 
//------------------------------------------
//  onClick
//  getIdProperty
//the following are called twice ?? {
//  getItemMetadata
//  getItemCssClass
//  getIsActiveProperty
//  getIsDeletedProperty 
//  }

//------------------------------------------
//GRID edit link onClick CYCLE 
//------------------------------------------

//  onClick
//  getIdProperty
//  editItem
//  getItemType
//  getEntityType
//  createEntityDialog(itemType: string, callback?: 
//  getItemType
//  getEntityType
//  getDialogType
//  getDialogOptionsFor
//  getItemType
//  getEntityType
//  getDialogOptions
//  initEntityDialog
//  getItemType
//  getEntityType
//  getItemType
//  getEntityType
//  routeDialog
//the following are called twice ?? {
//  getItemMetadata
//  getItemCssClass
//  getIsActiveProperty
//  getIsDeletedProperty
//  }
//  getItemType
//  getEntityType


//------------------------------------------
//GRID quickFilterChange CYCLE 
//------------------------------------------

//  quickFilterChange
//  persistSettings
//  getPersistanceStorage
//  refresh CYCLE