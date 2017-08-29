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
        // Use http://dopiaza.org/tools/datauri or similar service to convert an image into image data
        var headerImgData = 'data:image/jpeg;base64,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';
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
                        doc.addImage(headerImgData, 'JPEG', 40, 40, 60, 60);
                        doc.autoTable(['Mongla Port Authority'], [], {
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

                        var headerHeight = 100;
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