declare namespace Slick {
    class AutoColumnSize {

    }
}

namespace _Ext {
    @Serenity.Decorators.filterable()
    export class GridBase<TItem, TOptions>
        //this comment is for preventing replacement 
        extends Serenity.EntityGrid<TItem, TOptions> {
        isReadOnly: boolean;
        isRequired: boolean;
        isAutosized = false;
        isChildGrid = false;
        public autoColumnSizePlugin;

        constructor(container: JQuery, options?: TOptions) {
            super(container, options);
            this.slickContainer.fadeTo(0, 0);
        }

        protected markupReady(): void {
            super.markupReady();

            setTimeout(() => {
                if (this.isAutosized == false) {
                    this.resizeAllCulumn();
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
            request.ReportServiceMethodName = null;     // if some value found in this property than "view as report" button will appear
            request.ReportKey = null;                   // if some value found in this property than "export to pdf" button will appear
            request.ListExcelServiceMethodName = null;  // if some value found in this property than "export to xls" button will appear
            request.EqualityFilterWithTextValue = {};

            if (view) {
                let quickFilters = this.getQuickFilters();

                for (let quickFilter of quickFilters) {
                    let filterValue = request.EqualityFilter[quickFilter.field];
                    if (filterValue) {
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
                        else if (q.DefaultMainGridOptions.ShowAnyInEqualityFilterWithTextValue == true) {
                            request.EqualityFilterWithTextValue[quickFilter.title] = 'all'
                        }
                    } else if (q.DefaultMainGridOptions.ShowAnyInEqualityFilterWithTextValue == true) {
                        request.EqualityFilterWithTextValue[quickFilter.title] = 'all'
                    }
                }

            }

            return request;
        }

        protected getColumns(): Slick.Column[] {
            let cols = super.getColumns();

            let isEditable = this.getSlickOptions().editable

            cols.forEach(c => {

                c.width = c.minWidth || c.width || 50;
                c.cssClass = c.cssClass || '';
                if (c.sourceItem) {
                    if (c.sourceItem.filteringType == String("Lookup")) {
                        c.cssClass += ' align-left';
                        if (c.sourceItem.editorType == "Lookup") {
                            (c as any).lookup = Q.getLookup(c.sourceItem.editorParams.lookupKey)
                            c.formatter = (row, cell, value, columnDef: any, dataContext) => {
                                let item = columnDef.lookup.itemById[value];
                                if (item) return item[columnDef.lookup.textField];
                                else return '-';
                            };
                        }
                        //c.width = c.minWidth > 160 ? c.minWidth : 160;
                    } else if (c.sourceItem.filteringType == String("Enum")) {
                        //c.cssClass += ' align-center';

                        c.formatter = (row, cell, value, columnDef: any, dataContext) => {
                            let enumKey = columnDef.sourceItem.editorParams.enumKey
                            let text = q.getEnumText(enumKey, Q.toId(value));
                            if (text) return text;
                            else return '-';
                        };
                    } else if (c.sourceItem.formatterType == String("Date")) {
                        c.cssClass += ' align-center';
                        c.width = c.minWidth > 99 ? c.minWidth : 99;
                    } else if (c.sourceItem.formatterType == String("DateTime")) {
                        c.cssClass += ' align-center';
                        c.width = c.minWidth > 140 ? c.minWidth : 140;
                    } else if (c.sourceItem.formatterType == String("Number")) {
                        c.cssClass += ' align-right';
                        if (c.sourceItem.editorType == String("Decimal")) {

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

                    } else if (c.sourceItem.formatterType == String("Checkbox")) {
                        c.cssClass += ' align-center';
                    } else {
                        c.cssClass += ' align-left';
                        c.width = c.minWidth > 99 ? c.minWidth : 99;
                    }


                    //editor
                    if (isEditable == true && c.sourceItem.readOnly != true) {

                        if (c.sourceItem.editorType == "Lookup"  || c.sourceItem.editorType == "Enum") {
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
                } else {
                    c.cssClass += ' align-left';
                    c.width = c.minWidth > 99 ? c.minWidth : 99;
                }

            });

            cols.unshift({
                field: 'inline-actions',
                name: '',
                width: 25,
                minWidth: 25,
                maxWidth: 25,
                format: ctx => '<a class="inline-action view-details" title="view details"><i class="view-details fa fa-pencil-square-o"></i></a>'
                //+ '<a class="inline-action delete-row" title="delete"><i class="fa fa-trash-o text-red"></i></a>'
            },
                {
                    field: 'Serial',
                    name: '#',
                    cssClass: 'align-center',
                    headerCssClass: 'align-center',
                    width: 40,
                    minWidth: 40,
                    maxWidth: 40,
                    //format: ctx => (ctx.row + 1).toString()
                });

            return cols;
        }

        protected createSlickGrid() {
            var grid = super.createSlickGrid();
            this.autoColumnSizePlugin = new Slick.AutoColumnSize();
            grid.registerPlugin(this.autoColumnSizePlugin);

            grid.registerPlugin(new Slick.Data.GroupItemMetadataProvider());

            return grid;
        }

        public resetColumns(columns: Slick.Column[]) {

            this.slickContainer.fadeTo(0, 0);

            this.slickGrid.setColumns(columns);

            setTimeout(() => {
                this.resizeAllCulumn();
                this.slickContainer.fadeTo(100, 1);
            }, 100);

        }

        public resizeAllCulumn() {
            this.isAutosized = true;

            let gridContainerWidth = this.slickContainer.width();

            if (gridContainerWidth == 0) {
                gridContainerWidth = this.element.closest('.s-Dialog').width() - 55;
            }

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

                let stretchableGridAreaWidth = gridContainerWidth - fixedSizeColumnsWidth - 18;

                let resizableColumnsWidth = 0;
                resizableColumns
                    .map(m => m.width)
                    .forEach(e => resizableColumnsWidth += e);

                resizableColumns.forEach(c => {
                    c.width = c.width * (stretchableGridAreaWidth / resizableColumnsWidth);
                });

                this.slickGrid.setColumns(allVisibleColumns);
                this.slickGrid.onColumnsResized.notify();

            }
            this.setItems(this.getItems());
        }

        protected getSlickOptions() {
            let opt = super.getSlickOptions();
            opt.forceFitColumns = true;
            opt.enableTextSelectionOnCells = true;

            opt.enableCellNavigation = true;
            opt.asyncEditorLoading = false;
            opt.autoEdit = true;

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
            if (target.parent().hasClass('inline-action') || target.parent().hasClass('inline-btn'))
                target = target.parent();

            if (target.hasClass('inline-action') || target.hasClass('inline-btn')) {
                //e.preventDefault();

                this.onInlineActionClick(target, recordId, item);

            }
        }

        protected onInlineActionClick(target: JQuery, recordId, item: TItem): void {
            if (target.hasClass('delete-row')) {
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
            else if (target.hasClass('view-details')) {
                this.editItem(recordId);
            }
        }

        protected onViewProcessData(response: Serenity.ListResponse<TItem>): Serenity.ListResponse<TItem> {
            let r = super.onViewProcessData(response);
            let items = r.Entities
            let grouping_levels = this.view.getGrouping();

            if (grouping_levels.length == 0) {
                for (let i = 0; i < items.length; i++) {
                    (items[i] as any).Serial = response.Skip + i + 1;
                }
            } else if (grouping_levels.length = 1) {

                let groups = this.view.getGroups();

                let generateSerialNo = () => {
                    groups = this.view.getGroups();

                    for (let gi = 0; gi < groups.length; gi++) {
                        let rows = groups[gi].rows;
                        for (let i = 0; i < rows.length; i++) {

                            let item = (items as any[]).filter(f => f.Id == (rows[i] as any).Id)[0];
                            if (item)
                                (item as any).Serial = i + 1;
                        }
                    }
                };

                if (groups.length == 0) {
                    setTimeout(generateSerialNo);
                } else {
                    generateSerialNo();
                }
            }
            return r;
        }
    }
}