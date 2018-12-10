namespace _Ext {
    @Serenity.Decorators.filterable()
    export class GridSnippets extends _Ext.GridBase<AuditLogRow, any> {
        protected getColumnsKey() { return '_Ext.AuditLog'; }
        protected getDialogType() { return AuditLogDialog; }
        protected getIdProperty() { return AuditLogRow.idProperty; }
        protected getLocalTextPrefix() { return AuditLogRow.localTextPrefix; }
        protected getService() { return AuditLogService.baseUrl; }

        constructor(container: JQuery, options?) {
            super(container, options);
        }

        protected getInitialTitle(): string { return super.getInitialTitle() }
        protected getDisplayName(): string { return super.getDisplayName() }

        setTitle(value: string): void { super.setTitle(value) }
        getTitle(): string { return super.getTitle() }

        //called on resizing the grid canvas
        protected layout(): void { super.layout() }

        protected getButtons(): Serenity.ToolButton[] {
            let buttons = super.getButtons();

            //To remove Add button
            buttons = buttons.filter(f => f.cssClass != 'add-button');

            //To create a new button
            buttons.push({
                title: 'Sample Button',
                icon: 'fa fa-bell',
                onClick: e => {
                    Q.alert('Sample Button is clicked!');
                }
            });

            return buttons
        }
        protected getAddButtonCaption(): string { return super.getAddButtonCaption() }

        protected getItemName(): string { return super.getItemName() }

        protected newRefreshButton(noText?: boolean): Serenity.ToolButton { return super.newRefreshButton() }

        getView(): Slick.RemoteView<AuditLogRow> { return super.getView() }

        protected createToolbar(buttons: Serenity.ToolButton[]): void { super.createToolbar(buttons) }
        protected createSlickContainer(): JQuery { return super.createSlickContainer() }
        protected createView(): Slick.RemoteView<AuditLogRow> { return super.createView() }
        protected getViewOptions(): Slick.RemoteViewOptions { return super.getViewOptions() }
        protected getDefaultSortBy(): any[] { return super.getDefaultSortBy() }
        protected usePager(): boolean { return true }
        protected createSlickGrid(): Slick.Grid { return super.createSlickGrid() }

        protected getColumns(): Slick.Column[] { return super.getColumns() }
        protected getPropertyItems(): Serenity.PropertyItem[] { return super.getPropertyItems() }
        protected propertyItemsToSlickColumns(propertyItems: Serenity.PropertyItem[]): Slick.Column[] { return super.propertyItemsToSlickColumns(propertyItems) }

        protected itemLink(itemType?: string, idField?: string, text?: (ctx: Slick.FormatterContext) => string, cssClass?: (ctx: Slick.FormatterContext) => string, encode?: boolean): Slick.Format { return super.itemLink() }
        protected getItemType(): string { return super.getItemType() }
        protected getEntityType(): string { return super.getEntityType() }
        //getIdProperty
        protected getSlickOptions(): Slick.GridOptions { return super.getSlickOptions() }
        protected get_ExtGridOptions(): ExtGridOptions {

            let opt = Q.deepClone(super.get_ExtGridOptions());
            //change some options here

            opt.ShowRowSelectionCheckboxColumn = true;
            return opt;

        }
        protected postProcessColumns(columns: Slick.Column[]): Slick.Column[] { return super.postProcessColumns(columns) }
        protected setInitialSortOrder(): void { super.setInitialSortOrder() }

        protected enableFiltering(): boolean { return super.enableFiltering() }
        protected createFilterBar(): void { super.createFilterBar() }
        protected initializeFilterBar(): void { super.initializeFilterBar() }
        //call for each quick Column
        protected canFilterColumn(column: Slick.Column): boolean { return super.canFilterColumn(column) }

        //usePager
        protected createPager(): void { super.createPager() }
        protected getPagerOptions(): Slick.PagerOptions { return super.getPagerOptions() }

        protected bindToSlickEvents(): void { super.bindToSlickEvents() }
        protected bindToViewEvents(): void { super.bindToViewEvents() }

        protected createToolbarExtensions(): void { super.createToolbarExtensions() }
        protected createIncludeDeletedButton(): void { super.createIncludeDeletedButton() }
        protected createQuickSearchInput(): void { super.createQuickSearchInput() }
        protected getQuickSearchFields(): Serenity.QuickSearchField[] { return super.getQuickSearchFields() }

        protected createQuickFilters(): void { super.createQuickFilters() }
        protected getQuickFilters(): Serenity.QuickFilter<Serenity.Widget<any>, any>[] { return super.getQuickFilters() }
        protected dateTimeRangeQuickFilter(field: string, title?: string): Serenity.QuickFilter<Serenity.DateTimeEditor, Serenity.DateTimeEditorOptions> { return super.dateTimeRangeQuickFilter(field, title) }

        //call for each quick filter
        protected addQuickFilter<TWidget extends Serenity.Widget<any>, TOptions>(opt: Serenity.QuickFilter<TWidget, TOptions>): TWidget { return super.addQuickFilter(opt) }
        protected add_submitHandlers(action: () => void): void { super.add_submitHandlers(action) }

        protected updateDisabledState(): void { super.updateDisabledState() }

        protected getCurrentSettings(flags?: Serenity.GridPersistanceFlags): Serenity.PersistedGridSettings { return super.getCurrentSettings() }
        protected gridPersistanceFlags(): Serenity.GridPersistanceFlags { return super.gridPersistanceFlags() }
        protected restoreSettings(settings?: Serenity.PersistedGridSettings, flags?: Serenity.GridPersistanceFlags): void { super.restoreSettings() }
        protected getPersistedSettings(): Serenity.PersistedGridSettings { return super.getPersistedSettings() }
        protected getPersistanceStorage(): Serenity.SettingStorage { return super.getPersistanceStorage() }

        //getView
        getGrid(): Slick.Grid { return super.getGrid() }
        //getView
        //getGrid

        protected initialPopulate(): void { super.initialPopulate() }
        //called for each refresh request
        protected populateWhenVisible(): boolean { return super.populateWhenVisible() }

        //called for each refresh request
        protected onViewSubmit(): boolean { return super.onViewSubmit() }
        //called for each refresh request
        protected getGridCanLoad(): boolean { return super.getGridCanLoad() }
        //called for each refresh request
        protected setCriteriaParameter(): void { super.setCriteriaParameter() }
        //called for each refresh request
        protected setIncludeColumnsParameter(): void { super.setIncludeColumnsParameter() }
        //called for each refresh request
        protected getIncludeColumns(include: { [key: string]: boolean; }): void { super.getIncludeColumns(include) }

        //called for each refresh request
        protected invokeSubmitHandlers(): void { super.invokeSubmitHandlers() }

        //called for each refresh request
        protected onViewProcessData(response: Serenity.ListResponse<AuditLogRow>): Serenity.ListResponse<AuditLogRow> { return super.onViewProcessData(response) }

        //called for each row on every Refresh OR Layout change
        protected getItemMetadata(item: AuditLogRow, index: number): any { return super.getItemMetadata(item, index) }
        //called for each row on every Refresh OR Layout change
        protected getItemCssClass(item: AuditLogRow, index: number): string { return super.getItemCssClass(item, index) }
        //called for each row on every Refresh OR Layout change
        protected getIsActiveProperty(): string { return super.getIsActiveProperty() }
        //called for each row on every Refresh OR Layout change
        protected getIsDeletedProperty(): string { return super.getIsDeletedProperty() }

        //called for each row on every refresh request
        protected onViewFilter(item: AuditLogRow): boolean { return super.onViewFilter(item) }

        getElement(): JQuery { return super.getElement() }

        //called for each refresh request
        protected viewDataChanged(e: any, rows: AuditLogRow[]): void { super.viewDataChanged(e, rows) }
        //called for each refresh request
        protected markupReady(): void { super.markupReady() }

        //called for each refresh request
        getItems(): AuditLogRow[] { return super.getItems() }
        //called for each refresh request
        setItems(value: AuditLogRow[]): void { super.setItems(value) }





        protected addButtonClick(): void { super.addButtonClick() }

        protected editItem(entityOrId: any): void { super.editItem(entityOrId) }

        protected editItemOfType(itemType: string, entityOrId: any): void { super.editItemOfType(itemType, entityOrId) }

        //protected getService(): string {  return super.getButtons() }



        protected routeDialog(itemType: string, dialog: Serenity.Widget<any>): void { super.routeDialog(itemType, dialog) }

        //protected initDialog(dialog): void {  super.initDialog(dialog) }

        protected initEntityDialog(itemType: string, dialog: Serenity.Widget<any>): void { super.initEntityDialog(itemType, dialog) }

        protected createEntityDialog(itemType: string, callback?: (dlg: Serenity.Widget<any>) => void): Serenity.Widget<any> { return super.createEntityDialog(itemType, callback) }

        protected getDialogOptions(): JQueryUI.DialogOptions { return super.getDialogOptions() }

        protected getDialogOptionsFor(itemType: string): JQueryUI.DialogOptions { return super.getDialogOptionsFor(itemType) }

        //protected getDialogTypeFor(itemType: string): { 

        //    new(...args: any[]): Serenity.Widget<any>;

        //};

        //protected getDialogType(): { 

        //    new(...args: any[]): Serenity.Widget<any>;

        //};
        //Inherited from Serenity.DataGrid ______________________________________________________________________


        protected remove_submitHandlers(action: () => void): void { super.remove_submitHandlers(action) }


        //protected getInitialTitle(): string;

        //protected createToolbarExtensions(): void;



        //protected findQuickFilter<TWidget>(type: { 

        //    new (...args: any[]): TWidget;

        //}, field: string): TWidget;

        //protected tryFindQuickFilter<TWidget>(type: { 

        //    new(...args: any[]): TWidget;

        //}, field: string): TWidget;



        destroy(): void { super.destroy() }


        protected initializeAsync(): PromiseLike<void> { return super.initializeAsync() }



        //itemAt(row: number): any;

        //rowCount(): number;



        //protected getAddButtonCaption(): string;

        //protected getButtons(): ToolButton[];

        //protected editItem(entityOrId: any): void;

        //protected editItemOfType(itemType: string, entityOrId: any): void;

        protected onClick(e: JQueryEventObject, row: number, cell: number): void { super.onClick(e, row, cell) }


        protected setEquality(field: string, value: any): void { super.setEquality(field, value) }

        //protected usePager(): boolean;

        //protected getViewOptions(): Slick.RemoteViewOptions;

        //protected getItemType(): string;


        //protected getColumnsKey(): string;

        protected getPropertyItemsAsync(): PromiseLike<Serenity.PropertyItem[]> { return super.getPropertyItemsAsync() }


        protected getColumnsAsync(): PromiseLike<Slick.Column[]> { return super.getColumnsAsync() }

        protected populateLock(): void { super.populateLock() }

        protected populateUnlock(): void { super.populateUnlock() }


        refresh(): void { super.refresh() }

        protected refreshIfNeeded(): void { super.refreshIfNeeded() }

        //called for each refresh request
        protected internalRefresh(): void { super.internalRefresh() }

        setIsDisabled(value: boolean): void { super.setIsDisabled(value) }

        //protected getLocalTextDbPrefix(): string;

        //protected getLocalTextPrefix(): string;

        //protected getIdProperty(): string;



        protected resizeCanvas(): void { super.resizeCanvas() }

        protected subDialogDataChange(): void { super.subDialogDataChange() }

        protected addFilterSeparator(): void { super.addFilterSeparator() }

        protected determineText(getKey: (prefix: string) => string): string { return super.determineText(getKey) }


        protected addDateRangeFilter(field: string, title?: string): Serenity.DateEditor { return super.addDateRangeFilter(field, title) }

        protected dateRangeQuickFilter(field: string, title?: string): Serenity.QuickFilter<Serenity.DateEditor, Serenity.DateTimeEditorOptions> { return super.dateRangeQuickFilter(field, title) }

        protected addDateTimeRangeFilter(field: string, title?: string): Serenity.DateTimeEditor { return super.addDateTimeRangeFilter(field, title) }


        protected addBooleanFilter(field: string, title?: string, yes?: string, no?: string): Serenity.SelectEditor { return super.addBooleanFilter(field, title, yes, no) }

        protected booleanQuickFilter(field: string, title?: string, yes?: string, no?: string): Serenity.QuickFilter<Serenity.SelectEditor, Serenity.SelectEditorOptions> { return super.booleanQuickFilter(field, title, yes, no) }


        protected quickFilterChange(e: JQueryEventObject): void { super.quickFilterChange(e) }


        protected getPersistanceKey(): string { return super.getPersistanceKey() }


        protected canShowColumn(column: Slick.Column): boolean { return super.canShowColumn(column) }



        protected persistSettings(flags?: Serenity.GridPersistanceFlags): void { super.persistSettings() }

        getFilterStore(): Serenity.FilterStore { return super.getFilterStore() }

    }

}
