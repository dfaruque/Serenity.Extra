/// <reference path="../_q/_q.d.ts" />
namespace _Ext {

    @Serenity.Decorators.filterable()
    export class GridBase<TItem, TOptions>
        //this comment is for preventing replacement 
        extends Serenity.EntityGrid<TItem, TOptions> {

        protected get_ExtGridOptions(): ExtGridOptions { return Q.deepClone(q.DefaultMainGridOptions); }

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
                        ReportHelper.execute({ reportKey: reportRequest.ReportKey, params: { request: this.getReportRequest() }, extension: 'html' });
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
                buttons.push(PdfExportHelper.createToolButton({
                    grid: this,
                    tableOptions: { theme: 'grid' },
                    onViewSubmit: () => this.onViewSubmit()
                }));
            }




            return buttons;
        }

        protected getReportRequest()//: _Ext.ReportRequest
        {
            let view = this.getView();

            var request = Q.deepClone(view ? view.params : {}) //as _Ext.ReportRequest;
            request.ReportServiceMethodName = null;     // if some value found in this property then "view as report" button will appear
            request.ReportKey = null;                   // if some value found in this property then "export to pdf" button will appear
            request.ListExcelServiceMethodName = null;  // if some value found in this property then "export to xls" button will appear
            request.EqualityFilterWithTextValue = {};

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

                        else {
                            request.EqualityFilterWithTextValue[quickFilter.title] = filterValue;
                        }
                    } else if (quickFilter.type == Serenity.DateEditor) {
                        let qf = this.findQuickFilter(Serenity.DateEditor, quickFilter.field);
                        let dateFrom = qf.element.val();
                        let dateTo = qf.element.siblings('input').val()

                        let filterText = '';

                        if (!Q.isEmptyOrNull(dateFrom))
                            filterText = 'From ' + dateFrom

                        if (!Q.isEmptyOrNull(dateTo))
                            filterText = filterText + ' To ' + dateTo

                        if (!Q.isEmptyOrNull(filterText)) {
                            request.EqualityFilterWithTextValue[quickFilter.title] = filterText
                        }
                        else if (this.get_ExtGridOptions().ShowAnyInEqualityFilterWithTextValue == true) {
                            request.EqualityFilterWithTextValue[quickFilter.title] = 'all'
                        }
                    } else if (this.get_ExtGridOptions().ShowAnyInEqualityFilterWithTextValue == true) {
                        request.EqualityFilterWithTextValue[quickFilter.title] = 'all'
                    }
                }

            }

            return request;
        }

        protected getColumns(): Slick.Column[] {
            let columns = super.getColumns();

            let isEditable = this.getSlickOptions().editable
            let extOptions = this.get_ExtGridOptions();

            columns.forEach(c => {
                if (extOptions.AutoColumnSize == true) {
                    c.width = c.minWidth || c.width || 50;
                    c.cssClass = c.cssClass || '';
                    if (c.sourceItem) {
                        if (c.sourceItem.filteringType == "Lookup") {
                            c.cssClass += ' align-left';
                            if (c.sourceItem.editorType == "Lookup" && !c.sourceItem.editorParams.autoComplete) {
                                (c as any).lookup = Q.getLookup(c.sourceItem.editorParams.lookupKey)
                                c.formatter = (row, cell, value, columnDef: any, dataContext) => {
                                    let item = columnDef.lookup.itemById[value];
                                    if (item) return item[columnDef.lookup.textField];
                                    else return '-';
                                };
                            }
                            c.width = c.minWidth > 100 ? c.minWidth : 100;
                        } else if (c.sourceItem.formatterType == "Enum") {
                            //c.cssClass += ' align-center';

                            c.formatter = (row, cell, value, columnDef: any, dataContext) => {
                                let enumKey = columnDef.sourceItem.editorParams.enumKey
                                let text = Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), Q.toId(value));
                                if (text) return text;
                                else return '-';
                            };
                        } else if (c.sourceItem.formatterType == "Date") {
                            c.cssClass += ' align-center';
                            c.width = c.minWidth > 99 ? c.minWidth : 99;
                        } else if (c.sourceItem.formatterType == "DateTime") {
                            c.cssClass += ' align-center';
                            c.width = c.minWidth > 140 ? c.minWidth : 140;
                        } else if (c.sourceItem.formatterType == "Number") {
                            c.cssClass += ' align-right';
                            if (c.sourceItem.editorType == "Decimal") {

                                let formatSrt = '#,##0.00';

                                if (c.sourceItem.editorParams) {
                                    let decimals = c.sourceItem.editorParams['decimals'];
                                    if (decimals) {
                                        formatSrt = '#,##0.'
                                        for (let i = 0; i < decimals; i++) {
                                            formatSrt += '0'
                                        }
                                    }
                                    else if (c.sourceItem.editorParams['minValue']) {
                                        let splitedMinValue = (c.sourceItem.editorParams['minValue'] as string).split('.');
                                        if (splitedMinValue.length > 1) {
                                            formatSrt = '#,##0.' + splitedMinValue[1];
                                        } else {
                                            formatSrt = '#,##0';

                                        }
                                    }
                                }

                                c.format = ctx => Serenity.NumberFormatter.format(ctx.value, formatSrt);
                            }

                        } else if (c.sourceItem.formatterType == "Checkbox") {
                            c.cssClass += ' align-center';
                        } else {
                            c.cssClass += ' align-left';
                            c.width = c.minWidth > 99 ? c.minWidth : 99;
                        }


                    } else {
                        c.cssClass += ' align-left';
                        c.width = c.minWidth > 99 ? c.minWidth : 99;
                    }
                }

                //editor
                if (isEditable == true && c.sourceItem && c.sourceItem.readOnly != true) {
                    usingSlickGridEditors();

                    if (q.useSerenityInlineEditors) {
                        c.editor = SerenityInlineEditor;
                    } else {
                        if (c.sourceItem.editorType == "Lookup" || c.sourceItem.editorType == "Enum") {
                            c.editor = Slick['Editors']['Select2'];
                            c.width = c.minWidth > 160 ? c.minWidth : 160;
                        } else if (c.sourceItem.editorType == "Date") {
                            c.editor = Slick['Editors']['Date'];
                        } else if (c.sourceItem.editorType == "Boolean") {
                            c.editor = Slick['Editors']['Checkbox'];
                        } else if (c.sourceItem.editorType == "Integer") {
                            c.editor = Slick['Editors']['Integer'];
                        } else if (c.sourceItem.editorType == "Decimal") {
                            c.editor = Slick['Editors']['Float'];
                        } else if (c.sourceItem.editorType == "YesNoSelect") {
                            c.editor = Slick['Editors']['YesNoSelect'];
                        } else if (c.sourceItem.editorType == "PercentComplete") {
                            c.editor = Slick['Editors']['PercentComplete'];
                        } else if (c.sourceItem.editorType == "LongText") {
                            c.editor = Slick['Editors']['LongText'];
                        } else {
                            c.editor = Slick['Editors']['Text'];
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
                    inlineActionsColumnWidth += 25;
                    var title = this.isReadOnly ? q.text('Controls.View', 'View Details') : q.text('Controls.Edit', 'Edit');
                    inlineActionsColumnContent += `<a class="inline-actions view-details" title="${title}" style="padding-right: 10px;"><i class="view-details fa fa-pencil-square-o"></i></a>`;
                }

                if (extOptions.ShowDeleteInlineButtun == true) {
                    inlineActionsColumnWidth += 25;
                    inlineActionsColumnContent += `<a class="inline-actions delete-row" title="${q.text('Controls.Delete', 'Delete')}"><i class="delete-row fa fa-trash-o text-red"></i></a>`;
                }
                columns.unshift({
                    field: 'inline-actions',
                    name: '',
                    cssClass: 'inline-actions-column',
                    width: inlineActionsColumnWidth,
                    minWidth: inlineActionsColumnWidth,
                    maxWidth: inlineActionsColumnWidth,
                    format: ctx => inlineActionsColumnContent
                });
            }

            if (extOptions.ShowRowSelectionCheckboxColumn == true) {
                let rowSelectionCol = Serenity.GridRowSelectionMixin.createSelectColumn(() => this.rowSelection);
                rowSelectionCol.width = rowSelectionCol.minWidth = rowSelectionCol.maxWidth = 25
                columns.unshift(rowSelectionCol);
            }

            if (this.element.hasClass('RowSelectionCheckGrid')) { //show checkbox column in picker mode
                let options = (this.options as any) as GridItemPickerEditorOptions;
                if (!options.multiple && !options.gridType) {
                    Q.notifyWarning("Could not determine multiple/single. Probably there is no 'options' parameter in grid's constructor.");
                }

                if (options.multiple == true) {
                    let rowSelectionCol = Serenity.GridRowSelectionMixin.createSelectColumn(() => this.rowSelection);
                    rowSelectionCol.width = rowSelectionCol.minWidth = rowSelectionCol.maxWidth = 25
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

                            if (c.width < 140) c.width = 140
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

            return opt;

        }

        protected getViewOptions() {
            let opt = super.getViewOptions();

            opt.rowsPerPage = q.DefaultMainGridOptions.RowsPerPage;

            return opt;
        }

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
                    Q.confirm('Delete record?', () => {
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

        protected setGrouping(groupInfo: Slick.GroupInfo<TItem>[]): void {
            this.view.setGrouping(groupInfo);
            this.resetRowNumber();
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

            let options = (this.options as any) as GridItemPickerEditorOptions;

            if (options.filteringCriteria) {

                var request = this.view.params as Serenity.ListRequest;

                request.Criteria = Serenity.Criteria.and(request.Criteria, options.filteringCriteria);
            }
            return true;
        }

    }
}
