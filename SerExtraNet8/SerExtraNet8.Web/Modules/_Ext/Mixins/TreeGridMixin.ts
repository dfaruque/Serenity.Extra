import { coalesce, DataGrid, Format, first, htmlEncode, ListResponse, RemoteView, SlickTreeHelper, toGrouping, Fluent } from "@serenity-is/corelib"
import { FormatterContext } from "@serenity-is/sleekgrid"

///**
// * A mixin that can be applied to a DataGrid for tree functionality
// */
export class TreeGridMixin<TItem> {

    private dataGrid: DataGrid<TItem, any>;
    private getId: (item: TItem) => any;

    constructor(private options: TreeGridMixinOptions<TItem>) {
        var dg = this.dataGrid = options.grid;
        var idProperty = options.idField || (dg as any).getIdProperty();
        var getId = this.getId = (item: TItem) => (item as any)[idProperty];

        dg.element.findFirst('.grid-container').on('click', e => {
            if (Fluent(e.target).hasClass('s-TreeToggle')) {
                var src = dg.slickGrid.getCellFromEvent(e);
                if (src.cell >= 0 &&
                    src.row >= 0) {
                    TreeGridMixin.toggleClick<TItem>(e, src.row, src.row, dg.view, getId);
                }
            }
        });

        var oldViewFilter = (dg as any).onViewFilter;
        (dg as any).onViewFilter = function (item: TItem) {
            if (!oldViewFilter.apply(this, [item]))
                return false;

            return TreeGridMixin.filterById(item, dg.view, idProperty, options.getParentId);
        };

        var oldProcessData = (dg as any).onViewProcessData;
        (dg as any).onViewProcessData = function (response: ListResponse<TItem>) {

            response = oldProcessData.apply(this, [response]);
            response.Entities = TreeGridMixin.applyTreeOrdering(response.Entities, getId, options.getParentId);
            SlickTreeHelper.setIndents(response.Entities, getId, options.getParentId,
                (options.initialCollapse && options.initialCollapse()) || false);
            return response;
        };

        if (options.toggleField) {
            var col = first(dg.getGrid().getColumns(), x => x.field == options.toggleField);
            col.format = TreeGridMixin.treeToggle(() => dg.view, getId,
                col.format || (ctx => htmlEncode(ctx.value)));
            //col.formatter = SlickHelper.convertToFormatter(col.format);
        }
    }

    //    /**
    //     * Expands / collapses all rows in a grid automatically
    //     */
    toggleAll(): void {
        SlickTreeHelper.setCollapsed(this.dataGrid.view.getItems(),
            !this.dataGrid.view.getItems().every(x => (x as any)._collapsed == true));

        this.dataGrid.view.setItems(this.dataGrid.view.getItems(), true);
    }
    expandAll(): void {
        SlickTreeHelper.setCollapsed(this.dataGrid.view.getItems(), false);

        this.dataGrid.view.setItems(this.dataGrid.view.getItems(), true);
    }
    collapsedAll(): void {
        SlickTreeHelper.setCollapsed(this.dataGrid.view.getItems(), true);

        this.dataGrid.view.setItems(this.dataGrid.view.getItems(), true);
    }
    //    /**
    //     * Reorders a set of items so that parents comes before their children.
    //     * This method is required for proper tree ordering, as it is not so easy to perform with SQL.
    //     * @param items list of items to be ordered
    //     * @param getId a delegate to get ID of a record (must return same ID with grid identity field)
    //     * @param getParentId a delegate to get parent ID of a record
    //     */
    static applyTreeOrdering<TItem>(items: TItem[], getId: (item: TItem) => any, getParentId: (item: TItem) => any): TItem[] {
        var result: TItem[] = [];

        var byId = toGrouping(items, getId);
        var byParentId = toGrouping(items, getParentId);
        var visited = {};

        function takeChildren(theParentId: any) {
            if (visited[theParentId])
                return;

            visited[theParentId] = true;
            for (var child of (byParentId[theParentId] || [])) {
                result.push(child);
                takeChildren(getId(child));
            }
        }

        for (var item of items) {
            var parentId = getParentId(item);
            let hasParent = !!parentId;
            let parent = byId[parentId];
            let isRootItem = !hasParent || !(parent || []).length;
            if (isRootItem) {
                result.push(item);
                takeChildren(getId(item));
            }
        }

        return result;
    }

    static filterById<TItem>(item: TItem, view: RemoteView<TItem>, idProperty, getParentId: (x: TItem) => any): boolean {
        return SlickTreeHelper.filterCustom(item, function (x) {
            var parentId = getParentId(x);
            if (parentId == null) {
                return null;
            }
            let items = view.getItems();
            let parentItem = items.filter(f => f[idProperty] == parentId)[0];
            return parentItem;
        });
    }

    static treeToggle<TItem>(getView: () => RemoteView<TItem>, getId: (x: TItem) => any,
        formatter: Format): Format {
        return function (ctx: FormatterContext) {
            var text = formatter(ctx);
            var view = getView();
            if (!view) return;
            var indent = coalesce(ctx.item._indent, 0);
            var spacer = '<span class="s-TreeIndent" style="width:' + 15 * indent + 'px"></span>';
            var id = getId(ctx.item);
            var idx = view.getIdxById(ctx.item.__id || id);
            var next = view.getItemByIdx(idx + 1);
            if (next != null) {
                var nextIndent = coalesce(next._indent, 0);
                if (nextIndent > indent) {
                    if (!!!!ctx.item._collapsed) {
                        return spacer + '<span class="s-TreeToggle s-TreeExpand"></span>' + text;
                    }
                    else {
                        return spacer + '<span class="s-TreeToggle s-TreeCollapse"></span>' + text;
                    }
                }
            }
            return spacer + '<span class="s-TreeToggle"></span>' + text;
        };
    }

    static toggleClick<TItem>(e: any, row: number, cell: number,
        view: RemoteView<TItem>, getId: (x: TItem) => any): void {
        var target = Fluent(e.target);
        if (!target.hasClass('s-TreeToggle')) {
            return;
        }
        if (target.hasClass('s-TreeCollapse') || target.hasClass('s-TreeExpand')) {
            var item = view.getItem(row);
            if (item != null) {
                if (!!!item._collapsed) {
                    item._collapsed = true;
                }
                else {
                    item._collapsed = false;
                }

                var id = getId(item);
                view.updateItem(item.__id || id, item); //to support in-memory grid we check fake item.__id
            }
            if (e.shiftKey) {
                view.beginUpdate();
                try {
                    SlickTreeHelper.setCollapsed(view.getItems(), !!item._collapsed);
                    view.setItems(view.getItems(), true);
                }
                finally {
                    view.endUpdate();
                }
            }
        }
    }
}
export interface TreeGridMixinOptions<TItem> {
    // data grid object
    grid: DataGrid<TItem, any>;
    idField?: string;
    // a function to get parent id
    getParentId: (item: TItem) => any;
    // where should the toggle button be placed
    toggleField: string;
    // a delegate that should return initial collapsing state
    initialCollapse?: () => boolean;
}
