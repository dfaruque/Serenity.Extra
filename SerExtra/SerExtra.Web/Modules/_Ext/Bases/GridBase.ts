/// <reference path="../_q/_q.d.ts" />
namespace _Ext {

    @Serenity.Decorators.filterable()
    export class GridBase<TItem, TOptions>
        //this comment is for preventing replacement 
        extends Serenity.EntityGrid<TItem, TOptions> {
        protected getRowType(): { idProperty?: string, localTextPrefix?: string, nameProperty?: string, insertPermission?: string, updatePermission?: string, deletePermission?: string, } { return {}; }
        protected getIdProperty() { return this.getRowType().idProperty; }
        protected getLocalTextPrefix() { return this.getRowType().localTextPrefix; }
        protected getNameProperty() { return this.getRowType().nameProperty; }
        protected getInsertPermission() { return this.getRowType().insertPermission; }
        protected getUpdatePermission() { return this.getRowType().updatePermission; }
        protected getDeletePermission() { return this.getRowType().deletePermission; }

        protected get_ExtGridOptions(): ExtGridOptions { return Q.deepClone(q.DefaultMainGridOptions); }
        protected isPickerMode(): boolean { return this.element.hasClass('RowSelectionCheckGrid'); }
        protected getGrouping(): Slick.GroupInfo<TItem>[] { return []; }

        isReadOnly: boolean;
        isRequired: boolean;
        isAutosized = false;
        isChildGrid = false;
        nextRowNumber = 1;
        public autoColumnSizePlugin;

        public rowSelection = new Serenity.GridRowSelectionMixin(this);
        public pickerDialog: GridItemPickerDialog;

        constructor(container: JQuery, options?: TOptions) {
            super(container, options);
            this.slickContainer.fadeTo(0, 0);

            let grouping = this.getGrouping();
            if (grouping.length > 0)
                this.setGrouping(grouping);

        }

        protected markupReady(): void {
            super.markupReady();

            setTimeout(() => {
                if (this.isAutosized == false) {
                    if (this.get_ExtGridOptions().AutoColumnSize == true) {
                        this.resizeAllCulumn();
                    }
                    this.slickContainer.fadeTo(100, 1);
                }
            }, 100);

        }

        protected getButtons() {
            var buttons = super.getButtons();
            let reportRequest = this.getReportRequest();

            if (reportRequest.ListExcelServiceMethodName) {
                buttons.push(ExcelExportHelper.createToolButton({
                    grid: this,
                    service: this.getService() + '/' + reportRequest.ListExcelServiceMethodName,
                    onViewSubmit: () => this.onViewSubmit(),
                    separator: true
                }));
            }

            if (reportRequest.ReportKey) {
                buttons.push({
                    title: 'Export to PDF',
                    icon: 'fa fa-file-pdf-o',
                    onClick: () => {
                        ReportHelper.execute({ reportKey: reportRequest.ReportKey, params: { request: this.getReportRequest() } });
                    }
                });

                buttons.push({
                    title: 'View as Report',
                    icon: 'fa fa-html5',
                    onClick: () => {
                        let request = this.getReportRequest();
                        if (request)
                            ReportHelper.execute({ reportKey: reportRequest.ReportKey, params: { request: request }, extension: 'html' });
                    }
                });

            } else if (reportRequest.ReportServiceMethodName) {
                buttons.push({
                    title: 'View as Report',
                    icon: 'fa fa-eye',
                    onClick: () => {
                        Q.postToService({ service: Q.resolveUrl(this.getService() + '/' + reportRequest.ReportServiceMethodName), request: this.getReportRequest(), target: '_blank' });
                    }
                });

            } else {
                //buttons.push(PdfExportHelper.createToolButton({
                //    grid: this,
                //    tableOptions: { theme: 'grid' },
                //    onViewSubmit: () => this.onViewSubmit()
                //}));
            }




            return buttons;
        }

        protected getReportRequest(): _Ext.ListReportRequest {
            let view = this.getView();

            var request = Q.deepClone(view ? view.params : {}) //as _Ext.ReportRequest;
            request.ReportServiceMethodName = null;     // if some value found in this property then "view as report" button will appear
            request.ReportKey = null;                   // if some value found in this property then "export to pdf" button will appear
            request.ListExcelServiceMethodName = null;  // if some value found in this property then "export to xls" button will appear
            request.EqualityFilterWithTextValue = {};
            request.CustomParameters = {};

            if (view) {
                let quickFilters = this.getQuickFilters();

                for (let quickFilter of quickFilters) {
                    let filterValue = request.EqualityFilter[quickFilter.field];
                    if (filterValue && filterValue.length > 0) {
                        if (quickFilter.options.lookupKey) {
                            let lookup = Q.getLookup(quickFilter.options.lookupKey);
                            request.EqualityFilterWithTextValue[quickFilter.title] = lookup.itemById[filterValue][lookup.textField];
                        }
                        else if (quickFilter.options.enumKey) {
                            let enumKey = quickFilter.options.enumKey;
                            let enumValue = Q.toId(filterValue);
                            request.EqualityFilterWithTextValue[quickFilter.title] = Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), enumValue);
                        }
                        else if (quickFilter.type == GridItemPickerEditor) {
                            var customFilter = this.findQuickFilter(GridItemPickerEditor, quickFilter.field);
                            request.EqualityFilterWithTextValue[quickFilter.title] = customFilter.text;

                        }
                        else {
                            request.EqualityFilterWithTextValue[quickFilter.title] = filterValue;
                        }
                    } else if (quickFilter.type == Serenity.DateEditor) {
                        let qf = this.findQuickFilter(Serenity.DateEditor, quickFilter.field);
                        let dateFrom = qf.element.val();
                        let dateTo = qf.element.siblings('input').val()

                        let filterText = '';

                        if (!Q.isEmptyOrNull(dateFrom))
                            filterText = Q.format(q.text('Controls.FromDate', 'From {0}'), dateFrom) + ' ';

                        if (!Q.isEmptyOrNull(dateTo))
                            filterText = filterText + Q.format(q.text('Controls.ToDate', 'To {0}'), dateTo);

                        if (!Q.isEmptyOrNull(filterText)) {
                            request.EqualityFilterWithTextValue[quickFilter.title] = filterText
                        }
                        else if (this.get_ExtGridOptions().ShowAnyInEqualityFilterWithTextValue == true) {
                            request.EqualityFilterWithTextValue[quickFilter.title] = q.text('Controls.All', 'all')
                        }
                    } else if (this.get_ExtGridOptions().ShowAnyInEqualityFilterWithTextValue == true) {
                        request.EqualityFilterWithTextValue[quickFilter.title] = q.text('Controls.All', 'all')
                    }
                }

                if (this.filterBar) {
                    let filterBarDisplayText = this.filterBar.get_store().get_displayText();
                    if (!Q.isEmptyOrNull(filterBarDisplayText))
                        request.EqualityFilterWithTextValue[Q.text('Controls.FilterPanel.EditFilter')] = filterBarDisplayText;
                }

            }

            return request;
        }

        protected getColumns(): Slick.Column[] {
            let columns = super.getColumns();

            let isEditable = this.getSlickOptions().editable;
            let extOptions = this.get_ExtGridOptions();

            if (isEditable == true) {
                usingSlickGridEditors();
            }

            columns.forEach(column => {
                if (extOptions.AutoColumnSize == true) {
                    column.width = column.minWidth || column.width || 50;
                    column.cssClass = column.cssClass || '';
                }

                if (column.sourceItem) {
                    let formatterType = column.sourceItem.formatterType;
                    //width and cssClass
                    if (column.sourceItem.filteringType == "Lookup") {
                        column.cssClass += ' align-left';
                        column.width = column.minWidth > 100 ? column.minWidth : 100;
                    } else if (formatterType == "Enum") {
                        column.width = column.minWidth > 100 ? column.minWidth : 100;
                    } else if (formatterType == "Date") {
                        column.cssClass += ' align-center';
                        column.width = column.minWidth > 99 ? column.minWidth : 99;
                    } else if (formatterType == "DateTime") {
                        column.cssClass += ' align-center';
                        column.width = column.minWidth > 140 ? column.minWidth : 140;
                    } else if (formatterType == "Number") {
                        column.cssClass += ' align-right';

                    } else if (formatterType == "Checkbox") {
                        column.cssClass += ' align-center';
                    } else {
                        column.cssClass += ' align-left';
                        column.width = column.minWidth > 99 ? column.minWidth : 99;
                    }

                    //formatter                    
                    let emptyText = column.sourceItem.placeholder == 'Controls.All' ? Q.text('Controls.All') : '-';

                    if (column.sourceItem.editorType == "Lookup") {
                        if (!column.sourceItem.editorParams.autoComplete) {
                            (column as any).lookup = Q.getLookup(column.sourceItem.editorParams.lookupKey)
                            column.formatter = (row, cell, value, columnDef: any, dataContext) => {
                                if (columnDef.sourceItem.editorParams.multiple == true) {
                                    if (value) {
                                        let items = value.map(m => columnDef.lookup.itemById[m]);
                                        let texts = items.map(m => m[columnDef.lookup.textField]);

                                        return texts.length > 0 ? texts.join(', ') : emptyText;;
                                    }
                                } else {
                                    let item = columnDef.lookup.itemById[value];
                                    if (item) return item[columnDef.lookup.textField];
                                    else return emptyText;
                                }
                            };
                        }
                    } else if (column.sourceItem.editorType == "ServiceLookup") {
                        if (!column.sourceItem.editorParams.autoComplete) {
                            (column as any).textFieldInThisRow = column.sourceItem.editorParams.textFieldInThisRow || column.sourceItem.editorParams.textField;
                            column.formatter = (row, cell, value, columnDef: any, dataContext) => {
                                if (dataContext) return dataContext[columnDef.textFieldInThisRow];
                                else return emptyText;
                            };
                        }
                    } else if (column.sourceItem.filteringType == "Lookup") {
                        column.formatter = (row, cell, value, columnDef: any, dataContext) => {
                            if (Q.isEmptyOrNull(value)) return emptyText;
                            else return value;
                        };

                    } else if (formatterType == "Enum") {

                        column.formatter = (row, cell, value, columnDef: any, dataContext) => {
                            let enumKey = columnDef.sourceItem.editorParams.enumKey
                            if (columnDef.sourceItem.editorParams.multiple == true) {
                                let texts = '';

                                let vals = value as number[];
                                if (vals && vals.length > 0) {
                                    texts = vals.map(m => Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), Q.toId(m))).join(', ');
                                }
                                if (texts) return texts;
                                else return emptyText;

                            }
                            else {
                                let text = Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), Q.toId(value));
                                if (text) return text;
                                else return emptyText;
                            }
                        };
                    } else if (column.sourceItem.editorType == "Decimal") {

                        let formatSrt = '#,##0.00';

                        if (column.sourceItem.editorParams) {
                            let decimals = column.sourceItem.editorParams['decimals'];
                            if (decimals) {
                                formatSrt = '#,##0.'
                                for (let i = 0; i < decimals; i++) {
                                    formatSrt += '0'
                                }
                            }
                            else if (column.sourceItem.editorParams['minValue']) {
                                let splitedMinValue = (column.sourceItem.editorParams['minValue'] as string).split('.');
                                if (splitedMinValue.length > 1) {
                                    formatSrt = '#,##0.' + splitedMinValue[1];
                                } else {
                                    formatSrt = '#,##0';

                                }
                            }
                        }

                        column.format = ctx => Serenity.NumberFormatter.format(ctx.value, formatSrt);
                    }

                    //editor
                    if (isEditable == true && column.sourceItem.readOnly != true) {
                        if (q.useSerenityInlineEditors) {
                            column.editor = SerenityInlineEditor;
                        } else {
                            let editorType = column.sourceItem.editorType;

                            if (editorType == "Lookup" || editorType == "Enum") {
                                column.editor = Slick['Editors']['Select2'];
                                column.width = column.minWidth > 160 ? column.minWidth : 160;
                            } else if (editorType == "Date") {
                                column.editor = Slick['Editors']['Date'];
                            } else if (editorType == "Boolean") {
                                column.editor = Slick['Editors']['Checkbox'];
                            } else if (editorType == "Integer") {
                                column.editor = Slick['Editors']['Integer'];
                            } else if (editorType == "Decimal") {
                                column.editor = Slick['Editors']['Float'];
                            } else if (editorType == "YesNoSelect") {
                                column.editor = Slick['Editors']['YesNoSelect'];
                            } else if (editorType == "PercentComplete") {
                                column.editor = Slick['Editors']['PercentComplete'];
                            } else if (editorType == "LongText") {
                                column.editor = Slick['Editors']['LongText'];
                            } else {
                                column.editor = Slick['Editors']['Text'];
                            }
                        }
                    }
                }
            });

            columns.unshift({
                field: 'RowNum',
                name: '#',
                cssClass: 'rownum-column',
                headerCssClass: 'align-center',
                width: 40,
                minWidth: 40,
                maxWidth: 40,
                visible: extOptions.ShowRowNumberColumn,
                format: ctx => {
                    if (!ctx.item.RowNum) {
                        ctx.item.RowNum = this.nextRowNumber++;
                    }
                    return String(ctx.item.RowNum);
                }
            });

            if (extOptions.ShowInlineActionsColumn == true) {
                let inlineActionsColumnWidth = 0;
                let inlineActionsColumnContent = '';

                if (extOptions.ShowEditInlineButtun == true) {
                    inlineActionsColumnWidth += 32;
                    var title = this.isReadOnly ? q.text('Controls.View', 'View Details') : q.text('Controls.Edit', 'Edit');
                    inlineActionsColumnContent += `<a class="inline-actions view-details" title="${title}" style="padding: 0 5px; font-size: 1.2em;"><i class="view-details fa fa-pencil-square-o"></i></a>`;
                }

                if (extOptions.ShowDeleteInlineButtun == true) {
                    inlineActionsColumnWidth += 22;
                    inlineActionsColumnContent += `<a class="inline-actions delete-row" title="${q.text('Controls.Delete', 'Delete')}" style="padding-left: 5px;"><i class="delete-row fa fa-trash-o text-red"></i></a>`;
                }

                if (extOptions.ShowPrintInlineButtun == true) {
                    inlineActionsColumnWidth += 25;
                    inlineActionsColumnContent += `<a class="inline-actions print-row" title="${q.text('Controls.Print', 'Print')}" style="padding-left: 5px;"><i class="print-row fa fa-print"></i></a>`;
                }

                columns.unshift({
                    field: 'inline-actions',
                    name: '',
                    cssClass: 'inline-actions-column',
                    width: inlineActionsColumnWidth,
                    minWidth: inlineActionsColumnWidth,
                    maxWidth: inlineActionsColumnWidth,
                    formatter: (row, cell, value, columnDef, dataContext) => {
                        return inlineActionsColumnContent;
                    }
                });
            }

            if (extOptions.ShowRowSelectionCheckboxColumn == true) {
                let rowSelectionCol = Serenity.GridRowSelectionMixin.createSelectColumn(() => this.rowSelection);
                rowSelectionCol.width = rowSelectionCol.minWidth = rowSelectionCol.maxWidth = 27
                columns.unshift(rowSelectionCol);
            }

            if (this.isPickerMode()) { //show checkbox column in picker mode
                let options = (this.options as any) as GridItemPickerEditorOptions;
                if (!options.multiple && !options.gridType) {
                    Q.notifyWarning("Could not determine multiple/single. Probably there is no 'options' parameter in grid's constructor.");
                }

                //remove edit link in picker mode
                columns.forEach(column => {
                    if (column.sourceItem && column.sourceItem.editLink)
                        column.format = undefined;
                });

                if (options.multiple == true) {
                    let rowSelectionCol = Serenity.GridRowSelectionMixin.createSelectColumn(() => this.rowSelection);
                    rowSelectionCol.width = rowSelectionCol.minWidth = rowSelectionCol.maxWidth = 27
                    columns.unshift(rowSelectionCol);
                } else {
                    columns.unshift({
                        field: 'row-selection',
                        name: '',
                        cssClass: 'inline-actions-column',
                        width: 66,
                        minWidth: 66,
                        maxWidth: 66,
                        format: ctx => '<a class="inline-actions select-row"><i class="select-row fa fa-check"></i> Select</a>'
                    });

                }

            }

            return columns;
        }

        protected createSlickGrid() {
            var grid = super.createSlickGrid();

            usingSlickAutoColumnSize();

            if (Slick.AutoColumnSize) {
                this.autoColumnSizePlugin = new Slick.AutoColumnSize();
                grid.registerPlugin(this.autoColumnSizePlugin);
            }
            grid.registerPlugin(new Slick.Data.GroupItemMetadataProvider());

            return grid;
        }

        public resetColumns(columns: Slick.Column[]) {

            this.slickContainer.fadeTo(0, 0);

            this.slickGrid.setColumns(columns);

            setTimeout(() => {
                if (this.get_ExtGridOptions().AutoColumnSize == true) {
                    this.resizeAllCulumn();
                }
                this.slickContainer.fadeTo(100, 1);
            }, 100);

        }

        public resizeAllCulumn() {
            this.isAutosized = true;

            let gridContainerWidth = this.slickContainer.width();

            if (gridContainerWidth > 0) { } else { gridContainerWidth = this.element.closest('.s-Dialog').width() - 55; }
            if (gridContainerWidth > 0) { } else { gridContainerWidth = this.element.closest('.s-Panel').width() - 55; }
            if (gridContainerWidth > 0) { } else { gridContainerWidth = $('section.content').width() - 75; }

            this.slickGrid.setOptions({ forceFitColumns: false });

            let allVisibleColumns = this.autoColumnSizePlugin.resizeAllColumns().filter(f => f.visible != false) as Slick.Column[];// this.allColumns;


            let allVisibleColumnWidth = 0;
            allVisibleColumns.map(m => m.width).forEach(e => allVisibleColumnWidth += e);


            if (allVisibleColumnWidth > gridContainerWidth) {
                this.autoColumnSizePlugin.resizeAllColumns()

            } else if (allVisibleColumnWidth < gridContainerWidth) {
                this.autoColumnSizePlugin.resizeAllColumns()
                let fixedSizeColumns = [];
                let resizableColumns = [];

                allVisibleColumns.forEach(c => {

                    if (c.minWidth == c.maxWidth) {
                        fixedSizeColumns.push(c);
                        c.width = c.maxWidth;
                    } else if (c.cssClass && c.cssClass.indexOf("no-auto-size") >= 0) {
                        fixedSizeColumns.push(c);
                    } else if (c.sourceItem) {
                        if (c.sourceItem.formatterType == String("Number")) {
                            fixedSizeColumns.push(c);
                        }
                        else if (c.sourceItem.filteringType == String("Enum")) {
                            fixedSizeColumns.push(c);
                            if (c.width < 80) c.width = 80
                        }
                        else if (c.sourceItem.formatterType == String("Date")) {
                            fixedSizeColumns.push(c);

                            if (c.width < 80) c.width = 80
                        } else if (c.sourceItem.formatterType == String("DateTime")) {
                            fixedSizeColumns.push(c);

                            if (c.width < 150) c.width = 150
                        } else if (c.sourceItem.formatterType == String("Checkbox")) {
                            fixedSizeColumns.push(c);
                        } else {
                            resizableColumns.push(c);
                        }
                    }
                    else {
                        resizableColumns.push(c);
                    }

                });

                if (resizableColumns.length == 0) {
                    fixedSizeColumns = [];
                    resizableColumns = [];

                    allVisibleColumns.forEach(c => {

                        if (c.minWidth == c.maxWidth) {
                            fixedSizeColumns.push(c);
                            c.width = c.maxWidth;
                        } else {
                            resizableColumns.push(c);
                        }

                    });
                }

                let fixedSizeColumnsWidth = 0;
                fixedSizeColumns.map(m => m.width).forEach(e => fixedSizeColumnsWidth += e);

                let stretchableGridAreaWidth = gridContainerWidth - fixedSizeColumnsWidth - (this.isChildGrid ? 48 : 18);

                let resizableColumnsWidth = 0;
                resizableColumns
                    .map(m => m.width)
                    .forEach(e => resizableColumnsWidth += e);

                resizableColumns.forEach(c => {
                    let widthMultiplyingFactor = stretchableGridAreaWidth / resizableColumnsWidth;
                    let newWidth = c.width * widthMultiplyingFactor;
                    let increment = newWidth - c.width;

                    //if (increment <= 200) // maximum streching is 200
                    c.width = newWidth;
                    //else c.width = c.width + 200;

                });

                this.slickGrid.setColumns(allVisibleColumns);
                this.slickGrid.onColumnsResized.notify();

            }
            this.setItems(this.getItems());
        }

        protected getSlickOptions() {
            let opt = super.getSlickOptions();
            if (this.get_ExtGridOptions().AutoColumnSize == true) {
                opt.forceFitColumns = true;
            }

            opt.enableTextSelectionOnCells = true;

            opt.enableCellNavigation = true;
            opt.asyncEditorLoading = false;
            opt.autoEdit = true;
            opt.rowHeight = 27;

            return opt;
        }

        protected getViewOptions() {
            let opt = super.getViewOptions();

            opt.rowsPerPage = q.DefaultMainGridOptions.RowsPerPage;

            return opt;
        }

        protected getPrintRowServiceMethod() { return 'Print' }

        protected onClick(e: JQueryEventObject, row: number, cell: number) {
            super.onClick(e, row, cell);

            if (e.isDefaultPrevented())
                return;

            var item = this.itemAt(row) as TItem;
            let recordId = item[this.getIdProperty()];
            var target = $(e.target);

            // if user clicks "i" element, e.g. icon
            if (target.parent().hasClass('inline-action') || target.parent().hasClass('inline-actions') || target.parent().hasClass('inline-btn'))
                target = target.parent();

            if (target.hasClass('inline-action') || target.hasClass('inline-actions') || target.hasClass('inline-btn')) {
                //e.preventDefault();

                this.onInlineActionClick(target, recordId, item);

            }
        }

        protected onInlineActionClick(target: JQuery, recordId, item: TItem): void {
            if (target.hasClass('delete-row')) {
                if (this.isReadOnly == true) {
                    Q.notifyWarning('Read only records could not be deleted!');
                } else {
                    Q.confirm(q.text('Db.Administration.Translation.DeleteWarning', 'Delete record?'), () => {
                        let o = this as any;
                        if (o.deleteEntity) { //for in-memory grid
                            o.deleteEntity(recordId);
                        }
                        else {
                            Q.serviceRequest(this.getService() + '/Delete', { EntityId: recordId }, response => {
                                this.refresh();
                            });
                        }
                    });
                }
            }
            else if (target.hasClass('view-details')) {
                (this.slickGrid as any).getEditController().commitCurrentEdit();

                this.editItem(recordId);
            }
            else if (target.hasClass('print-row')) {
                let request: Serenity.RetrieveRequest = { EntityId: recordId };

                Q.postToService({ service: Q.resolveUrl(this.getService() + '/' + this.getPrintRowServiceMethod()), request: request, target: '_blank' });
            }
            else if (target.hasClass('select-row')) {
                this.rowSelection.setSelectedKeys([recordId]);
                this.pickerDialog.onSuccess(this.selectedItems);
                this.pickerDialog.dialogClose();
            }
        }

        protected resetRowNumber() {
            this.nextRowNumber = 1;
            let items = this.getItems();

            let grouping_fields = this.view.getGrouping();

            if (grouping_fields.length == 0) {
                for (let i = 0; i < items.length; i++) {
                    (items[i] as any).RowNum = i + 1;
                }
            } else if (grouping_fields.length > 0) {

                let generateRowNumber = (groups: Slick.Group<any>[]) => {

                    for (let gi = 0; gi < groups.length; gi++) {
                        let subGroups = groups[gi].groups;
                        if (subGroups) {
                            generateRowNumber(subGroups);
                        } else {
                            let rows = groups[gi].rows;
                            for (let i = 0; i < rows.length; i++) {
                                rows[i].RowNum = i + 1;
                            }
                        }
                    }
                };

                let groups = this.view.getGroups();
                generateRowNumber(groups);
            }

            this.setItems(items);
        }

        //override getGrouping instead of calling setGrouping
        public setGrouping(groupInfo: Slick.GroupInfo<TItem>[]): void {
            this.view.setGrouping(groupInfo);
            this.resetRowNumber();
        }

        protected getIncludeColumns(include: { [key: string]: boolean; }) {
            super.getIncludeColumns(include);
            let grouping = this.getGrouping();

            if (grouping.length > 0)
                grouping.forEach(f => include[f.getter] = true);
        }

        protected getDefaultSortBy() {
            let sortBy = super.getDefaultSortBy();
            let grouping = this.getGrouping();

            if (grouping.length > 0)
                grouping.forEach(f => sortBy.unshift(f.getter));

            return sortBy;
        }

        protected onViewProcessData(response: Serenity.ListResponse<TItem>): Serenity.ListResponse<TItem> {
            let r = super.onViewProcessData(response);

            if (this.get_ExtGridOptions().ShowRowNumberColumn == true) {
                setTimeout(() => { this.resetRowNumber() });
            }
            return r;
        }

        public initDialog(dialog: DialogBase<TItem, any>): void {
            super.initDialog(dialog);

            dialog.parentGrid = this;
        }

        get selectedItems() {
            return this.rowSelection.getSelectedKeys().map(m => {
                let item = this.view.getItemById(m);

                if (!item) {
                    item = {} as any;
                    item[this.getIdProperty()] = m
                }

                return item
            })
        }

        set selectedKeys(value: any[]) {
            let options = (this.options as any) as GridItemPickerEditorOptions;
            if (options.multiple == true) {
                this.rowSelection.setSelectedKeys(value);
            } else {

            }
        }

        protected onViewSubmit() {
            if (!super.onViewSubmit()) {
                return false;
            }

            var request = this.view.params as Serenity.ListRequest;

            let options = (this.options as any) as GridItemPickerEditorOptions;

            if (options.filteringCriteria) {
                request.Criteria = Serenity.Criteria.and(request.Criteria, options.filteringCriteria);
            }

            if (options.filterField && Q.isValue(options.filterValue))
                request.Criteria = Serenity.Criteria.and(request.Criteria, [[options.filterField], '=', options.filterValue]);

            let cascadeField = options.cascadeField || options.cascadeFrom;
            if (cascadeField && Q.isValue(options.cascadeValue))
                request.Criteria = Serenity.Criteria.and(request.Criteria, [[cascadeField], '=', options.cascadeValue]);

            return true;
        }

    }
}
