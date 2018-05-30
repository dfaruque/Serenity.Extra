declare var jsPDF;
namespace _Ext {
    export interface PdfExportOptions {
        grid: Serenity.DataGrid<any, any>;
        onViewSubmit: () => boolean;
        title?: string;
        hint?: string;
        separator?: boolean;
        reportTitle?: string;
        titleTop?: number;
        titleFontSize?: number;
        fileName?: string;
        pageNumbers?: boolean;
        columnTitles?: { [key: string]: string };
        tableOptions?: jsPDF.AutoTableOptions;
        output?: string;
        autoPrint?: boolean;
    }

    export namespace PdfExportHelper {
        function toAutoTableColumns(srcColumns: Slick.Column[], columnStyles: { [dataKey: string]: jsPDF.AutoTableStyles; },
            columnTitles: { [key: string]: string }) {
            return srcColumns.map(src => {
                let col: jsPDF.AutoTableColumn = {
                    dataKey: src.id || src.field,
                    title: src.name || ''
                };

                if (columnTitles && columnTitles[col.dataKey] != null)
                    col.title = columnTitles[col.dataKey];

                let style: jsPDF.AutoTableStyles = {};
                if ((src.cssClass || '').indexOf("align-right") >= 0)
                    style.halign = 'right';
                else if ((src.cssClass || '').indexOf("align-center") >= 0)
                    style.halign = 'center';

                columnStyles[col.dataKey] = style;

                return col;
            });
        }

        function toAutoTableData(entities: any[], keys: string[], srcColumns: Slick.Column[]) {
            let el = document.createElement('span');
            let row = 0;
            return entities.map(item => {
                let dst = {};
                for (let cell = 0; cell < srcColumns.length; cell++) {
                    let src = srcColumns[cell];
                    let fld = src.field || '';
                    let key = keys[cell];
                    let txt;
                    let html: string;
                    if (src.formatter) {
                        html = src.formatter(row, cell, item[fld], src, item);
                    }
                    else if (src.format) {
                        html = src.format({ row: row, cell: cell, item: item, value: item[fld] });
                    }
                    else {
                        dst[key] = item[fld];
                        continue;
                    }

                    if (!html || (html.indexOf('<') < 0 && html.indexOf('&') < 0))
                        dst[key] = html;
                    else {
                        el.innerHTML = html;
                        if (el.children.length == 1 &&
                            $(el.children[0]).is(":input")) {
                            dst[key] = $(el.children[0]).val();
                        }
                        else if (el.children.length == 1 &&
                            $(el.children).is('.check-box')) {
                            dst[key] = $(el.children).hasClass("checked") ? "Yes" : "No"
                        }
                        else
                            dst[key] = el.textContent || '';
                    }
                }
                row++;
                return dst;
            });
        }

        export function exportToPdf(options: PdfExportOptions): void {

            var g = options.grid;

            if (!options.onViewSubmit())
                return;

            includeAutoTable();

            var request = Q.deepClone(g.view.params) as Serenity.ListRequest;
            request.Take = 0;
            request.Skip = 0;

            var sortBy = g.view.sortBy;
            if (sortBy != null)
                request.Sort = sortBy;

            var gridColumns = g.slickGrid.getColumns();
            gridColumns = gridColumns.filter(x => x.id !== "__select__" && x.name.length > 0);

            request.IncludeColumns = [];
            for (var column of gridColumns)
                request.IncludeColumns.push(column.id || column.field);

            Q.serviceCall({
                url: g.view.url,
                request: request,
                onSuccess: response => {
                    var doc = new jsPDF('l', 'pt');
                    var groupings = g.view.getGrouping(); //group fields
                    var groupingColumns = gridColumns.filter(f => groupings.some(s => s.getter == f.field) == true);
                    var srcColumns = gridColumns.filter(f => groupings.some(s => s.getter == f.field) == false);
                    var columnStyles: { [dataKey: string]: jsPDF.AutoTableStyles; } = {};
                    var columns = toAutoTableColumns(srcColumns, columnStyles, options.columnTitles);
                    var keys = columns.filter(f => groupings.some(s => s.getter == f) == false).map(x => x.dataKey);

                    var totalPagesExp = "{{T}}";

                    var pageNumbers = options.pageNumbers == null || options.pageNumbers;

                    var autoOptions = $.extend({
                        margin: { top: 40, left: 40, right: 40, bottom: pageNumbers ? 110 : 100 },
                        startY: 90,
                        styles: {
                            fontSize: 8,
                            overflow: 'linebreak',
                            cellPadding: 5,
                            valign: 'middle',
                            lineColor: 0
                        },
                        headerStyles: { fillColor: 255, textColor: 0, lineWidth: 1, fillStyle: 'S', halign: 'center', valign: 'middle'  },
                        columnStyles: columnStyles
                    }, options.tableOptions) as jsPDF.AutoTableOptions;

                    ///region Title
                    {
                        if (q.jsPDFHeaderImageData) {
                            doc.addImage(q.jsPDFHeaderImageData, 'PNG', 40, 40, 60, 60);
                        }
                        doc.autoTable([q.jsPDFHeaderTitle], [], {
                            margin: { bottom: 10 , left: 110},
                            startY: options.titleTop || 45,
                            headerStyles: { fillColor: 255, textColor: 0 },
                            styles: { halign: 'left', fontSize: 18 }
                        });

                        let reportTitle = '';
                        if (groupingColumns[0])
                            reportTitle = groupingColumns.map(m => m.name).join(', ') + ' wise '

                        reportTitle += options.reportTitle || g.getTitle();
                        reportTitle += " Report";

                        doc.autoTable([reportTitle], [], {
                            margin: { top: 10, bottom: 10, left: 110},
                            startY: doc.autoTableEndPosY(),
                            headerStyles: { fillColor: 255, textColor: 0 },
                            styles: { halign: 'left', fontSize: 14 }
                        });

                    }
                    ///region Header
                    {
                        var header = function (data) {

                        };
                        autoOptions.beforePageContent = header;
                    }

                    ///region Footer
                    {
                        if (pageNumbers) {
                            var footer = function (data) {
                                var str = data.pageCount;
                                // Total page number plugin only available in jspdf v1.0+
                                if (typeof doc.putTotalPages === 'function') {
                                    str = str + " / " + totalPagesExp;
                                }
                                doc.autoTableText(str, doc.internal.pageSize.width / 2,
                                    doc.internal.pageSize.height - autoOptions.margin.bottom, {
                                        halign: 'center'
                                    });
                            };
                            autoOptions.afterPageContent = footer;
                        }
                    }

                    ///region Content
                    {
                        //extra space after title
                        doc.autoTable([''], [], {
                            startY: doc.autoTableEndPosY() + 20,
                            headerStyles: { fillColor: 255, textColor: 0 }
                        });

                        var headerHeight = 125;
                        var headerFontSizeBase = 11;

                        var entities = (<Serenity.ListResponse<any>>response).Entities || [];

                        g.setItems(entities);

                        var groups = g.view.getGroups(); //grouped data
                        if (groups.length > 0) {
                            var ggg = function (grps: Slick.Group<any>[], parentGroupIndex) {
                                var endPosY = doc.autoTableEndPosY();
                                for (let i = 0; i < grps.length; i++) {
                                    var group = grps[i];
                                    var level = group.level + 1;

                                    doc.autoTable([group.title], [], {
                                        margin: { left: 30 + level * 10, top: 2 },
                                        startY: doc.autoTableEndPosY(),
                                        headerStyles: { fillColor: 255, textColor: 0, fontSize: 10 - group.level, cellPadding: 0 }
                                    });

                                    if (group.groups) {

                                        ggg(group.groups, i);

                                    } else {

                                        let data = toAutoTableData(group.rows, keys, srcColumns);
                                        autoOptions.startY = doc.autoTableEndPosY();
                                        autoOptions.margin.left = 30 + level * 10;
                                        autoOptions.margin.bottom = 10;
                                        doc.autoTable(columns, data, autoOptions);
                                        //for extra space
                                        doc.autoTable([''], [], {
                                            margin: { left: 30 + level * 10, top: 2 },
                                            startY: doc.autoTableEndPosY() + 10,
                                            headerStyles: { fillColor: 255, textColor: 0 }
                                        });
                                    }
                                }
                            }

                            ggg(groups, -1);

                        } else {
                            let data = toAutoTableData(g.getItems(), keys, srcColumns);
                            autoOptions.startY = headerHeight;
                            doc.autoTable(columns, data, autoOptions);
                        }
                    }

                    if (typeof doc.putTotalPages === 'function') {
                        doc.putTotalPages(totalPagesExp);
                    }


                    if (!options.output || options.output == "file") {
                        var fileName = options.reportTitle || "{0}_{1}.pdf";
                        fileName = Q.format(fileName, g.getTitle() || "report",
                            Q.formatDate(new Date(), "yyyyMMdd_HHmm"));
                        doc.save(fileName);
                        return;
                    }

                    if (options.autoPrint)
                        doc.autoPrint();

                    var output = options.output;
                    if (output == 'newwindow' || '_blank')
                        output = 'dataurlnewwindow';
                    else if (output == 'window')
                        output = 'datauri';

                    doc.output(output);
                }
            });
        }

        export function createToolButton(options: PdfExportOptions) {

            return <Serenity.ToolButton>{
                title: options.title || '',
                hint: options.hint || 'PDF',
                cssClass: 'export-pdf-button',
                onClick: () => exportToPdf(options),
                separator: options.separator
            };
        }

        function includeJsPDF() {
            if (typeof jsPDF !== "undefined")
                return;

            var script = $("jsPDFScript");
            if (script.length > 0)
                return;

            $("<script/>")
                .attr("type", "text/javascript")
                .attr("id", "jsPDFScript")
                .attr("src", Q.resolveUrl("~/Scripts/jspdf.min.js"))
                .appendTo(document.head);
        }

        function includeAutoTable() {
            includeJsPDF();

            if (typeof jsPDF === "undefined" ||
                typeof (jsPDF as any).API == "undefined" ||
                typeof (jsPDF as any).API.autoTable !== "undefined")
                return;

            var script = $("jsPDFAutoTableScript");
            if (script.length > 0)
                return;

            $("<script/>")
                .attr("type", "text/javascript")
                .attr("id", "jsPDFAutoTableScript")
                .attr("src", Q.resolveUrl("~/Scripts/jspdf.plugin.autotable.min.js"))
                .appendTo(document.head);
        }
    }
}

declare namespace Slick {
    interface RemoteView<TEntity> {
        getGroups(): Slick.Group<TEntity>[];
        getGrouping(): Slick.GroupInfo<TEntity>[];
    }
}