/// <reference path="../q/q.d.ts" />
import { confirmDialog, Criteria, DateEditor, Decorators, deepClone, EntityGrid, EnumFormatter, EnumTypeRegistry, Fluent, getLookup, GridRowSelectionMixin, GroupInfo, isEmptyOrNull, ListRequest, ListResponse, localText, notifyWarning, NumberFormatter, postToService, resolveUrl, RetrieveRequest, serviceRequest, stringFormat, toId } from "@serenity-is/corelib"
import { ExcelExportHelper, ReportHelper } from "@serenity-is/extensions"
import { Column, Group, GroupItemMetadataProvider } from "@serenity-is/sleekgrid"
import { ListReportRequest } from "../../../ServerTypes/Ext/ListReportRequest"
import { DefaultMainGridOptions, ListExcelServiceMethodName, useSerenityInlineEditors } from "../q/q"
import { GridItemPickerDialog } from "../Editors/GridItemPicker/GridItemPickerDialog"
import { GridItemPickerEditor } from "../Editors/GridItemPicker/GridItemPickerEditor"
import { CellEditByWidget } from "../Editors/SerenityInlineEditor"
import { DialogBase } from "./DialogBase"

@Decorators.advancedFiltering()
export class GridBase<TItem, TOptions> extends EntityGrid<TItem, TOptions> {

    protected getExtGridOptions(): ExtGridOptions { return deepClone(DefaultMainGridOptions); }
    protected isPickerMode(): boolean { return this.element.hasClass('RowSelectionCheckGrid'); }
    protected getGrouping(): GroupInfo<TItem>[] { return []; }

    isReadOnly: boolean;
    isRequired: boolean;
    isAutosized = false;
    isChildGrid = false;
    nextRowNumber = 1;

    public rowSelection: GridRowSelectionMixin;
    public pickerDialog: GridItemPickerDialog<TItem>;

    constructor(props: TOptions) {
        super(props);

        let grouping = this.getGrouping();
        if (grouping.length > 0)
            this.setGrouping(grouping);
    }

    protected override createToolbarExtensions() {
        super.createToolbarExtensions();
        this.rowSelection = new GridRowSelectionMixin(this);
    }

    protected override markupReady(): void {
        super.markupReady();

        if (this.isAutosized == false) {
            if (this.getExtGridOptions().AutoColumnSize == true) {
                this.resizeAllCulumn(this.allColumns);
            }
        }
    }

    protected override getButtons() {
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
                title: localText('Controls.ExportToPDF', 'Export to PDF'),
                icon: 'fa fa-file-pdf-o',
                onClick: () => {
                    let request = this.getReportRequest();
                    if (request)
                        ReportHelper.execute({ reportKey: reportRequest.ReportKey, params: { request: request } });
                }
            });

            buttons.push({
                title: localText('Controls.ViewAsReport', 'View as Report'),
                icon: 'fa fa-html5',
                onClick: () => {
                    let request = this.getReportRequest();
                    if (request)
                        ReportHelper.execute({ reportKey: reportRequest.ReportKey, params: { request: request }, extension: 'html' });
                }
            });

        } else if (reportRequest.ReportServiceMethodName) {
            buttons.push({
                title: localText('Controls.ViewAsReport', 'View as Report'),
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

        var request = deepClone(view ? view.params : {}) //as Ext.ReportRequest;
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
                    else if (quickFilter.type == GridItemPickerEditor as any) {
                        var customFilter = this.findQuickFilter(GridItemPickerEditor, quickFilter.field);
                        request.EqualityFilterWithTextValue[quickFilter.title] = customFilter.text;

                    }
                    else {
                        request.EqualityFilterWithTextValue[quickFilter.title] = filterValue;
                    }
                } else if (quickFilter.type == DateEditor) {
                    let qf = this.findQuickFilter(DateEditor, quickFilter.field);
                    let dateFrom = qf.element.val();
                    let dateTo = qf.element.nextSibling('input').val()

                    let filterText = '';

                    if (!isEmptyOrNull(dateFrom))
                        filterText = stringFormat(localText('Controls.FromDate', 'From {0}'), dateFrom) + ' ';

                    if (!isEmptyOrNull(dateTo))
                        filterText = filterText + stringFormat(localText('Controls.ToDate', 'To {0}'), dateTo);

                    if (!isEmptyOrNull(filterText)) {
                        request.EqualityFilterWithTextValue[quickFilter.title] = filterText
                    }
                    else if (this.getExtGridOptions().ShowAnyInEqualityFilterWithTextValue == true) {
                        request.EqualityFilterWithTextValue[quickFilter.title] = localText('Controls.All', 'all')
                    }
                } else if (this.getExtGridOptions().ShowAnyInEqualityFilterWithTextValue == true) {
                    request.EqualityFilterWithTextValue[quickFilter.title] = localText('Controls.All', 'all')
                }
            }

            if (this.filterBar) {
                let filterBarDisplayText = this.filterBar.get_store().get_displayText();
                if (!isEmptyOrNull(filterBarDisplayText))
                    request.EqualityFilterWithTextValue[localText('Controls.FilterPanel.EditFilter')] = filterBarDisplayText;
            }

        }

        return request;
    }

    protected override getColumns(): Column[] {
        let columns = super.getColumns();

        let isEditable = this.getSlickOptions().editable;
        let extOptions = this.getExtGridOptions();

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
                let emptyText = column.sourceItem.placeholder == 'Controls.All' ? localText('Controls.All', 'All') : '-';

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
                            if (ctx.item) return ctx.item[textFieldInThisRow] ?? ctx.value;
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
                } else if (column.sourceItem.placeholder == 'Controls.All') {
                    column.format = ctx => ctx.value ?? emptyText;
                }

                //editor
                if (isEditable == true && column.sourceItem.readOnly != true) {
                    if (useSerenityInlineEditors) {
                        column.editor = CellEditByWidget;
                    }
                }
            }

            column.cssClass += columnCssClass;
            if (this.getExtGridOptions().AutoColumnSize == true) {
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
                var title = this.isReadOnly ? localText('Controls.View', 'View Details') : localText('Controls.Edit', 'Edit');
                inlineActionsColumnContent += `<a class="inline-actions view-details" title="${title}" style="font-size: 1.2em;"><i class="view-details fa fa-pencil-square-o"></i></a>`;
            }

            if (extOptions.ShowDeleteInlineButtun == true) {
                inlineActionsColumnWidth += 22;
                inlineActionsColumnContent += `<a class="inline-actions delete-row" title="${localText('Controls.Delete', 'Delete')}" style="padding-left: 5px;"><i class="delete-row fa fa-trash-o text-red"></i></a>`;
            }

            if (extOptions.ShowPrintInlineButtun == true) {
                inlineActionsColumnWidth += 25;
                inlineActionsColumnContent += `<a class="inline-actions print-row" title="${localText('Controls.Print', 'Print')}" style="padding-left: 5px;"><i class="print-row fa fa-print"></i></a>`;
            }

            columns.unshift({
                field: 'inline-actions',
                name: '',
                cssClass: 'inline-actions-column',
                width: inlineActionsColumnWidth,
                minWidth: inlineActionsColumnWidth,
                maxWidth: inlineActionsColumnWidth,
                visible: true,
                formatter: (row, cell, value, columnDef, dataContext) => {
                    return inlineActionsColumnContent;
                }
            });
        }

        if (extOptions.ShowRowSelectionCheckboxColumn == true) {
            let rowSelectionCol = GridRowSelectionMixin.createSelectColumn(() => this.rowSelection);
            rowSelectionCol.width = rowSelectionCol.minWidth = rowSelectionCol.maxWidth = 27;
            rowSelectionCol.visible = true;
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
                rowSelectionCol.width = rowSelectionCol.minWidth = rowSelectionCol.maxWidth = 27;
                rowSelectionCol.visible = true;
                columns.unshift(rowSelectionCol);
            } else {
                columns.unshift({
                    field: 'row-selection',
                    name: '',
                    cssClass: 'inline-actions-column',
                    width: 66,
                    minWidth: 66,
                    maxWidth: 66,
                    visible: true,
                    format: ctx => '<a class="inline-actions select-row"><i class="select-row fa fa-check"></i> Select</a>'
                });
            }
        }

        return columns;
    }

    protected override createSlickGrid() {
        var grid = super.createSlickGrid();

        grid.registerPlugin(new GroupItemMetadataProvider());

        return grid;
    }

    public resetColumns(columns: Column[]) {

        this.slickGrid.setColumns(columns);

        if (this.getExtGridOptions().AutoColumnSize == true) {
            this.resizeAllCulumn(columns);
        }
    }

    public resizeAllCulumn(columns: Column[]) {
        this.isAutosized = true;

        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        let headerStyle = window.getComputedStyle(this.element.findFirst('.slick-header').getNode(), null);
        context.font = headerStyle.fontSize + ' Arial';

        let gridContainerWidth = this.slickContainer.getNode().clientWidth;

        if (gridContainerWidth > 0) { } else { gridContainerWidth = this.element.closest('.s-Dialog')?.getNode()?.clientWidth - 55; }
        if (gridContainerWidth > 0) { } else { gridContainerWidth = this.element.closest('.s-Panel')?.getNode()?.clientWidth - 55; }
        if (gridContainerWidth > 0) { } else { gridContainerWidth = Fluent.findFirst('section.content')?.getNode()?.clientWidth - 75; }

        this.slickGrid.setOptions({ forceFitColumns: false });

        let allVisibleColumns = columns.filter(f => f.visible);

        let allVisibleColumnWidth = 0;
        allVisibleColumns.map(m => m.width).forEach(e => allVisibleColumnWidth += e);

        if (allVisibleColumnWidth > gridContainerWidth) {
            //this.autoColumnSizePlugin.resizeAllColumns()

        } else if (allVisibleColumnWidth < gridContainerWidth) {
            //this.autoColumnSizePlugin.resizeAllColumns()
            let fixedSizeColumns = [];
            let resizableColumns = [];

            allVisibleColumns.forEach(c => {
                if (c.name?.length > 1)
                    c.width = Math.max(c.minWidth, context.measureText(c.name).width * 1.5);

                if (c.minWidth == c.maxWidth) {
                    fixedSizeColumns.push(c);
                    c.width = c.maxWidth;
                } else if (c.cssClass && c.cssClass.indexOf("no-auto-size") >= 0) {
                    fixedSizeColumns.push(c);
                } else if (c.sourceItem) {
                    if (c.sourceItem.formatterType == String("Number")) {
                        fixedSizeColumns.push(c);
                        if (c.width < 50) c.width = 50
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
    }

    protected override getSlickOptions() {
        let opt = super.getSlickOptions();

        if (this.getExtGridOptions().AutoColumnSize == true) {
            opt.forceFitColumns = true;
        }

        opt.enableTextSelectionOnCells = true;

        //opt.enableCellNavigation = true;
        //opt.asyncEditorLoading = false;
        //opt.autoEdit = true;

        return opt;
    }

    protected override getViewOptions() {
        let opt = super.getViewOptions();

        if (this.usePager())
            opt.rowsPerPage = DefaultMainGridOptions.RowsPerPage;

        return opt;
    }

    protected getPrintRowServiceMethod() { return 'Print' }

    protected override onClick(e: Event, row: number, cell: number) {
        super.onClick(e, row, cell);

        if (e.defaultPrevented)
            return;

        var item = this.itemAt(row) as TItem;
        let recordId = item[this.getIdProperty()];
        var target = Fluent(e.target);

        // if user clicks "i" element, e.g. icon
        if (target.parent().hasClass('inline-action') || target.parent().hasClass('inline-actions') || target.parent().hasClass('inline-btn'))
            target = target.parent();

        if (target.hasClass('inline-action') || target.hasClass('inline-actions') || target.hasClass('inline-btn')) {
            //e.preventDefault();

            this.onInlineActionClick(target, recordId, item);
        }
    }

    protected onInlineActionClick(target: Fluent, recordId, item: TItem): void {
        if (target.hasClass('delete-row')) {
            if (this.isReadOnly == true) {
                notifyWarning('Read only records could not be deleted!');
            } else {
                confirmDialog(localText('Db.Administration.Translation.DeleteWarning', 'Delete record?'), () => {
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
    protected setGrouping(groupInfo: GroupInfo<TItem>[]): void {
        this.view.setGrouping(groupInfo);
        this.resetRowNumber();
    }

    protected override getIncludeColumns(include: { [key: string]: boolean; }) {
        super.getIncludeColumns(include);
        let grouping = this.getGrouping();

        if (grouping.length > 0)
            grouping.forEach(f => include[f.getter as string] = true);
    }

    protected override getDefaultSortBy() {
        let sortBy = super.getDefaultSortBy();
        let grouping = this.getGrouping();

        if (grouping.length > 0)
            grouping.forEach(f => sortBy.unshift(f.getter));

        return sortBy;
    }

    protected override onViewProcessData(response: ListResponse<TItem>): ListResponse<TItem> {
        let r = super.onViewProcessData(response);

        if (this.getExtGridOptions().ShowRowNumberColumn == true) {
            setTimeout(() => { this.resetRowNumber() });
        }
        return r;
    }

    public override initDialog(dialog: DialogBase<TItem, any>): void {
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

    protected override onViewSubmit() {
        if (!super.onViewSubmit()) {
            return false;
        }

        var request = this.view.params as ListRequest;

        let options = (this.options as any) as GridItemPickerEditorOptions;

        if (options.filteringCriteria) {
            request.Criteria = Criteria.and(request.Criteria, options.filteringCriteria);
        }

        if (options.filterField && options.filterValue != null) {
            request.EqualityFilter = request.EqualityFilter || {};
            request.EqualityFilter[options.filterField] = options.filterValue;
        }

        let cascadeField = options.cascadeField || options.cascadeFrom;
        if (cascadeField && options.cascadeValue != null) {
            request.EqualityFilter = request.EqualityFilter || {};
            request.EqualityFilter[cascadeField] = options.cascadeValue;
        }

        return true;
    }
}