/// <reference path="../_q/_q.d.ts" />
import { confirmDialog, Criteria, DateEditor, Decorators, deepClone, EntityGrid, EnumFormatter, EnumTypeRegistry, format, getLookup, GridRowSelectionMixin, GroupInfo, isEmptyOrNull, isValue, ListRequest, ListResponse, notifyWarning, NumberFormatter, postToService, resolveUrl, RetrieveRequest, serviceRequest, text, toId } from "@serenity-is/corelib"
import { DialogBase } from "./DialogBase"
import { ListReportRequest } from "../../ServerTypes/_Ext/ListReportRequest"
import { GridItemPickerEditor } from "../Editors/GridItemPicker/GridItemPickerEditor"
import { GridItemPickerDialog } from "../Editors/GridItemPicker/GridItemPickerDialog"
import * as q from "../_q/_q"
import { usingSlickAutoColumnSize, usingSlickGridEditors } from "../Utils/Using"
import { ExcelExportHelper, ReportHelper } from "@serenity-is/extensions"
import { Column, Group, GroupItemMetadataProvider } from "@serenity-is/sleekgrid"
import { DefaultMainGridOptions, ListExcelServiceMethodName, useSerenityInlineEditors } from "../_q/_q"

@Decorators.filterable()
export class GridBase<TItem, TOptions> extends EntityGrid<TItem, TOptions> {

    protected get_ExtGridOptions(): ExtGridOptions { return deepClone(DefaultMainGridOptions); }
    protected isPickerMode(): boolean { return this.element.hasClass('RowSelectionCheckGrid'); }
    protected getGrouping(): GroupInfo<TItem>[] { return []; }

    isReadOnly: boolean;
    isRequired: boolean;
    isAutosized = false;
    isChildGrid = false;
    nextRowNumber = 1;
    public autoColumnSizePlugin;

    public rowSelection: GridRowSelectionMixin;
    public pickerDialog: GridItemPickerDialog;

    constructor(container: JQuery, options?: TOptions) {
        super(container, options);

        let extOptions = this.get_ExtGridOptions();

        if (extOptions.AutoColumnSize == true) {
            this.slickContainer.fadeTo(0, 0);
        }

        let grouping = this.getGrouping();
        if (grouping.length > 0)
            this.setGrouping(grouping);

    }

    protected createToolbarExtensions() {
        super.createToolbarExtensions();
        this.rowSelection = new GridRowSelectionMixin(this);
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
                title: q.text('Controls.ExportToPDF', 'Export to PDF'),
                icon: 'fa fa-file-pdf-o',
                onClick: () => {
                    let request = this.getReportRequest();
                    if (request)
                        ReportHelper.execute({ reportKey: reportRequest.ReportKey, params: { request: request } });
                }
            });

            buttons.push({
                title: q.text('Controls.ViewAsReport', 'View as Report'),
                icon: 'fa fa-html5',
                onClick: () => {
                    let request = this.getReportRequest();
                    if (request)
                        ReportHelper.execute({ reportKey: reportRequest.ReportKey, params: { request: request }, extension: 'html' });
                }
            });

        } else if (reportRequest.ReportServiceMethodName) {
            buttons.push({
                title: q.text('Controls.ViewAsReport', 'View as Report'),
                icon: 'fa fa-eye',
                onClick: () => {
                    let request = this.getReportRequest();
                    if (request)
                        postToService({ service: resolveUrl(this.getService() + '/' + reportRequest.ReportServiceMethodName), request: request, target: '_blank' });
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

    protected getReportRequest(): ListReportRequest {
        let view = this.getView();

        var request = deepClone(view ? view.params : {}) //as _Ext.ReportRequest;
        request.ReportServiceMethodName = null;     // if some value found in this property then "view as report" button will appear
        request.ReportKey = null;                   // if some value found in this property then "export to pdf" button will appear
        request.ListExcelServiceMethodName = ListExcelServiceMethodName;  // if some value found in this property then "export to xls" button will appear
        request.EqualityFilterWithTextValue = {};
        request.CustomParameters = {};

        if (view) {
            let quickFilters = this.getQuickFilters();

            for (let quickFilter of quickFilters) {
                let filterValue = request.EqualityFilter[quickFilter.field];
                if (filterValue && filterValue.length > 0) {
                    if (quickFilter.options.lookupKey) {
                        let lookup = getLookup(quickFilter.options.lookupKey);
                        request.EqualityFilterWithTextValue[quickFilter.title] = lookup.itemById[filterValue][lookup.textField];
                    }
                    else if (quickFilter.options.enumKey) {
                        let enumKey = quickFilter.options.enumKey;
                        let enumValue = toId(filterValue);
                        request.EqualityFilterWithTextValue[quickFilter.title] = EnumFormatter.format(EnumTypeRegistry.get(enumKey), enumValue);
                    }
                    else if (quickFilter.type == GridItemPickerEditor) {
                        var customFilter = this.findQuickFilter(GridItemPickerEditor, quickFilter.field);
                        request.EqualityFilterWithTextValue[quickFilter.title] = customFilter.text;

                    }
                    else {
                        request.EqualityFilterWithTextValue[quickFilter.title] = filterValue;
                    }
                } else if (quickFilter.type == DateEditor) {
                    let qf = this.findQuickFilter(DateEditor, quickFilter.field);
                    let dateFrom = qf.element.val();
                    let dateTo = qf.element.siblings('input').val()

                    let filterText = '';

                    if (!isEmptyOrNull(dateFrom))
                        filterText = format(q.text('Controls.FromDate', 'From {0}'), dateFrom) + ' ';

                    if (!isEmptyOrNull(dateTo))
                        filterText = filterText + format(q.text('Controls.ToDate', 'To {0}'), dateTo);

                    if (!isEmptyOrNull(filterText)) {
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
                if (!isEmptyOrNull(filterBarDisplayText))
                    request.EqualityFilterWithTextValue[text('Controls.FilterPanel.EditFilter')] = filterBarDisplayText;
            }

        }

        return request;
    }

    protected getColumns(): Column[] {
        let columns = super.getColumns();

        let isEditable = this.getSlickOptions().editable;
        let extOptions = this.get_ExtGridOptions();

        if (isEditable == true) {
            usingSlickGridEditors();
        }

        columns.forEach(column => {
            let columnCssClass = column.cssClass || '';
            let columnWidth = column.minWidth || column.width || 50;

            if (column.sourceItem) {
                let formatterType = column.sourceItem.formatterType;
                //width and cssClass
                if (column.sourceItem.filteringType == "Lookup") {
                    columnCssClass = ' align-left';
                    columnWidth = column.minWidth > 100 ? column.minWidth : 100;
                } else if (formatterType == "Enum") {
                    columnWidth = column.minWidth > 100 ? column.minWidth : 100;
                } else if (formatterType == "Date") {
                    columnCssClass = ' align-center';
                    columnWidth = column.minWidth > 99 ? column.minWidth : 99;
                } else if (formatterType == "DateTime") {
                    columnCssClass = ' align-center';
                    columnWidth = column.minWidth > 140 ? column.minWidth : 140;
                } else if (formatterType == "Number") {
                    columnCssClass = ' align-right';

                } else if (formatterType == "Checkbox") {
                    columnCssClass = ' align-center';
                } else {
                    columnCssClass = ' align-left';
                    columnWidth = column.minWidth > 99 ? column.minWidth : 99;
                }

                //formatter                    
                let emptyText = column.sourceItem.placeholder == 'Controls.All' ? q.text('Controls.All', 'All') : '-';

                if (column.sourceItem.editorType == "Lookup") {
                    if (!column.sourceItem.editorParams.autoComplete) {
                        column.format = ctx => {
                            let lookup = getLookup(column.sourceItem.editorParams.lookupKey);
                            if (ctx.column.sourceItem.editorParams.multiple == true) {
                                if (ctx.value) {
                                    let items = ctx.value.map(m => lookup.itemById[m]);
                                    let texts = items.map(m => m ? m[lookup.textField] : '?');

                                    return texts.length > 0 ? texts.join(', ') : emptyText;
                                }
                            } else {
                                let item = lookup.itemById[ctx.value];
                                if (item) return item[lookup.textField];
                                else return emptyText;
                            }
                        }
                    }
                } else if (column.sourceItem.editorType == "ServiceLookup") {
                    if (!column.sourceItem.editorParams.autoComplete) {
                        column.format = ctx => {
                            let textFieldInThisRow = column.sourceItem.editorParams.textFieldInThisRow || column.sourceItem.editorParams.textField;
                            if (ctx.item) return ctx.item[textFieldInThisRow];
                            else return emptyText;
                        };
                    }
                } else if (column.sourceItem.filteringType == "Lookup") {
                    column.format = ctx => {
                        if (isEmptyOrNull(ctx.value)) return emptyText;
                        else return ctx.value;
                    };

                } else if (formatterType == "Enum") {

                    column.format = ctx => {
                        let enumKey = ctx.column.sourceItem.editorParams.enumKey
                        if (ctx.column.sourceItem.editorParams.multiple == true) {
                            let texts = '';

                            let vals = ctx.value as number[];
                            if (vals && vals.length > 0) {
                                texts = vals.map(m => EnumFormatter.format(EnumTypeRegistry.get(enumKey), toId(m))).join(', ');
                            }
                            if (texts) return texts;
                            else return emptyText;

                        }
                        else {
                            let text = EnumFormatter.format(EnumTypeRegistry.get(enumKey), toId(ctx.value));
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

                    column.format = ctx => NumberFormatter.format(ctx.value, formatSrt);
                }

                //editor
                if (isEditable == true && column.sourceItem.readOnly != true) {
                    if (useSerenityInlineEditors) {
                        column.editor = SerenityInlineEditor as any;
                    } else {
                        let editorType = column.sourceItem.editorType;

                        if (editorType == "Lookup" || editorType == "Enum") {
                            column.editor = Slick['Editors']['Select2'];
                            columnWidth = column.minWidth > 160 ? column.minWidth : 160;
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

            column.cssClass += columnCssClass;
            if (this.get_ExtGridOptions().AutoColumnSize == true) {
                column.width = columnWidth;
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
            format: (ctx: any) => {
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
                inlineActionsColumnContent += `<a class="inline-actions view-details" title="${title}" style="font-size: 1.2em;"><i class="view-details fa fa-pencil-square-o"></i></a>`;
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
            let rowSelectionCol = GridRowSelectionMixin.createSelectColumn(() => this.rowSelection);
            rowSelectionCol.width = rowSelectionCol.minWidth = rowSelectionCol.maxWidth = 27
            columns.unshift(rowSelectionCol);
        }

        if (this.isPickerMode()) { //show checkbox column in picker mode
            let options = (this.options as any) as GridItemPickerEditorOptions;
            if (!options.multiple && !options.gridType) {
                notifyWarning("Could not determine multiple/single. Probably there is no 'options' parameter in grid's constructor.");
            }

            //remove edit link in picker mode
            columns.forEach(column => {
                if (column.sourceItem && column.sourceItem.editLink)
                    column.format = undefined;
            });

            if (options.multiple == true) {
                let rowSelectionCol = GridRowSelectionMixin.createSelectColumn(() => this.rowSelection);
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

        grid.registerPlugin(new GroupItemMetadataProvider());

        return grid;
    }

    public resetColumns(columns: Column[]) {

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

        let allVisibleColumns = this.autoColumnSizePlugin.resizeAllColumns().filter(f => f.visible != false) as Column[];// this.allColumns;


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

        if (this.usePager())
            opt.rowsPerPage = DefaultMainGridOptions.RowsPerPage;

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
                notifyWarning('Read only records could not be deleted!');
            } else {
                confirmDialog(q.text('Db.Administration.Translation.DeleteWarning', 'Delete record?'), () => {
                    let o = this as any;
                    if (o.deleteEntity) { //for in-memory grid
                        o.deleteEntity(recordId);
                    }
                    else {
                        serviceRequest(this.getService() + '/Delete', { EntityId: recordId }, response => {
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
            let request: RetrieveRequest = { EntityId: recordId };

            postToService({ service: resolveUrl(this.getService() + '/' + this.getPrintRowServiceMethod()), request: request, target: '_blank' });
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

            let generateRowNumber = (groups: Group<any>[]) => {

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
    public setGrouping(groupInfo: GroupInfo<TItem>[]): void {
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

    protected onViewProcessData(response: ListResponse<TItem>): ListResponse<TItem> {
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

        var request = this.view.params as ListRequest;

        let options = (this.options as any) as GridItemPickerEditorOptions;

        if (options.filteringCriteria) {
            request.Criteria = Criteria.and(request.Criteria, options.filteringCriteria);
        }

        if (options.filterField && isValue(options.filterValue)) {
            request.EqualityFilter = request.EqualityFilter || {};
            request.EqualityFilter[options.filterField] = options.filterValue;
        }

        let cascadeField = options.cascadeField || options.cascadeFrom;
        if (cascadeField && isValue(options.cascadeValue)) {
            request.EqualityFilter = request.EqualityFilter || {};
            request.EqualityFilter[cascadeField] = options.cascadeValue;
        }

        return true;
    }

}
