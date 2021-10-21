﻿namespace _Ext {

    /**
     * A mixin that can be applied to a DataGrid for excel style filtering functionality
     */
    export class HeaderFiltersMixin<TItem> {

        private dataGrid: Serenity.DataGrid<TItem, any>;

        constructor(private options: HeaderFiltersMixinOptions<TItem>) {
            var dg = this.dataGrid = options.grid;

            var currentColumn = null;
            var cachedValues = {};
            usingSlickHeaderFilters();

            var headerFilters = new Slick['Plugins'].HeaderFilters({
                getFilterValues: function (column, setFilterableValues) {
                    if (!dg.view.url || !dg.view["getPagingInfo"]().rowsPerPage || dg.view.getLength() == 0
                        && !Q.any(dg.slickGrid.getColumns(), (x: any) => x.filterValues && x.filterValues.length > 0)) {
                        return null
                    }
                    currentColumn = column;
                    try {
                        if (!(dg as any).onViewSubmit()) {
                            setFilterableValues([]);
                            return
                        }
                    } finally {
                        currentColumn = null
                    }
                    var request = Q.deepClone(dg.view.params) as Serenity.ListRequest;
                    request.DistinctFields = [column.field];
                    request.Skip = 0;
                    request.Take = 0;
                    var cacheKey = $.toJSON(request);
                    var cachedValue = cachedValues[cacheKey];
                    if (cachedValue && cachedValue.expires > (new Date).getTime())
                        setFilterableValues(cachedValue.value);
                    else {
                        Q.serviceCall({
                            request: request,
                            url: dg.view.url,
                            onSuccess: function (response: Serenity.ListResponse<TItem>) {
                                cachedValues[cacheKey] = {
                                    value: response.Values,
                                    expires: (new Date).getTime() + 1e3 * 30
                                };
                                setFilterableValues(response.Values)
                            }
                        })
                    }
                },
            //    isFilterable: function (column) {
            //        return column.sourceItem != null && column.sortable && (column.sourceItem.notFilterable == null || !column.sourceItem.notFilterable)
            //    }
            });
            headerFilters.onFilterApplied.subscribe(function () {
                dg.refresh()
            });
            dg.slickGrid.registerPlugin(headerFilters);

            var oldOnViewSubmit = (dg as any).onViewSubmit;
            (dg as any).onViewSubmit = function () {
                if (!oldOnViewSubmit.call(dg))
                    return false;
                var columns = dg.slickGrid.getColumns();
                var request = dg.view.params as Serenity.ListRequest;
                for (var n = 0; n < columns.length; n++) {
                    var column = columns[n];
                    if (column === currentColumn)
                        continue;
                    var filterValues = (column as any).filterValues;
                    if (filterValues && filterValues.length) {
                        var u = filterValues.filter(f => f!= null);
                        var d = [[column.field], "in", [u]];
                        if (u.length !== filterValues.length) {
                            if (u.length > 0)
                                d = Serenity.Criteria.or(["is null", [column.field]], d);
                            else
                                d = ["is null", [column.field]]
                        }
                        request.Criteria = Serenity.Criteria.and(request.Criteria, d)
                    }
                }
                return true
            };
        }

    }
    export interface HeaderFiltersMixinOptions<TItem> {
        // data grid object
        grid: Serenity.DataGrid<TItem, any>;
    }
}