import { Decorators, deepClone, GridUtils, IGetEditValue, indexOf, IReadOnly, ISetEditValue, SaveRequest, ServiceOptions, ServiceResponse, ToolButton, trimToNull } from "@serenity-is/corelib"
import { Grid } from "@serenity-is/sleekgrid"
import { GridBase } from "../Bases/GridBase"
import { DialogBase } from "../Bases/DialogBase"
import { EditorDialogBase } from "./EditorDialogBase"
import * as q from "../_q/_q"

@Decorators.registerClass([IGetEditValue, ISetEditValue, IReadOnly])
@Decorators.editor()
@Decorators.element("<div/>")
export class GridEditorBaseWithOption<TEntity, TOptions> extends GridBase<TEntity, TOptions>
    implements IGetEditValue, ISetEditValue, IReadOnly {

    protected get_ExtGridOptions(): ExtGridOptions { return deepClone(q.DefaultEditorGridOptions); }

    protected getIdProperty() { return "__id"; }

    isChildGrid = true;

    protected nextId = 1;

    constructor(container: JQuery, options?) {
        super(container, options);

        this.slickGrid.onSort.subscribe((e, args) => {
            this.sortGridFunction((args.grid as Grid), args.sortCols[0], args.sortCols[0].sortCol.field);

            //(args.grid as Grid).init();
            (args.grid as Grid).invalidateAllRows();
            (args.grid as Grid).invalidate();
            (args.grid as Grid).render();
            (args.grid as Grid).resizeCanvas();
        });

    }

    private sortGridFunction(grid: Grid, column: any, field: any) {
        grid.getData().sort(function (a, b) {
            var result = a[field] > b[field] ? 1 :
                a[field] < b[field] ? -1 :
                    0;
            return column.sortAsc ? result : -result;
        });
    }

    protected getQuickFilters() {
        return [];
    }

    protected id(entity: TEntity) {
        return (entity as any)[this.getIdProperty()];
    }

    protected save(opt: ServiceOptions<any>, callback: (r: ServiceResponse) => void) {
        var request = opt.request as SaveRequest<TEntity>;
        var row = deepClone(request.Entity);

        var id = this.id(row);
        if (id == null) {
            row[this.getIdProperty()] = "`" + this.nextId++;
        }

        if (!this.validateEntity(row, id)) {
            return;
        }

        var items = this.view.getItems().slice();
        if (id == null) {
            items.push(row);
        }
        else {
            var index = indexOf(items, x => this.id(x) === id);
            items[index] = deepClone({} as TEntity, items[index], row);
        }

        this.value = items;
        callback({});
    }

    protected deleteEntity(id: number) {
        this.view.deleteItem(id);
        setTimeout(() => {
            this.onItemsChanged();
            this.element.trigger('change');
            this.resetRowNumber();
        });
        return true;
    }

    protected validateEntity(row: TEntity, id: number) {
        return true;
    }

    protected getNewEntity(): TEntity {
        return {} as TEntity;
    }

    protected getButtons(): ToolButton[] {
        return [{
            title: this.getItemName(),
            cssClass: 'add-button',
            onClick: () => { this.addButtonClick() }
        }];
    }

    protected addButtonClick(): void {
        this.createEntityDialog(this.getItemType(), dlg => {
            var dialog = dlg as EditorDialogBase<TEntity>;
            dialog.parentEditor = this;
            dialog.onSave = (opt, callback) => this.save(opt, callback);
            dialog.loadEntityAndOpenDialog(this.getNewEntity());
        });
    }

    protected editItem(entityOrId: any): void {

        var id = entityOrId;
        var item = this.view.getItemById(id);
        this.createEntityDialog(this.getItemType(), dlg => {
            var dialog = dlg as EditorDialogBase<TEntity>;
            dialog.onDelete = (opt, callback) => {
                if (!this.deleteEntity(id)) {
                    return;
                }
                callback({});
            };
            dialog.parentEditor = this;
            dialog.onSave = (opt, callback) => this.save(opt, callback);
            dialog.loadEntityAndOpenDialog(item);
        });;
    }

    public getEditValue(property, target) {
        target[property.name] = this.value;
    }

    public setEditValue(source, property) {
        this.value = source[property.name];
    }

    public get value(): TEntity[] {
        var p = this.getIdProperty();

        (this.slickGrid as any).getEditController().commitCurrentEdit();

        let items = this.view.getItems();

        this.onBeforeGetValue(items);

        return items.map(x => {
            var y = deepClone(x);
            var id = y[p];
            if (id && id.toString().charAt(0) == '`')
                delete y[p];

            if (y['RowNum'])
                delete y['RowNum'];
            return y;
        });
    }

    public set value(value: TEntity[]) {
        var id = this.getIdProperty();

        let val = value || [];

        let items = val.map(x => {
            var y = deepClone(x);
            if ((y as any)[id] == null) {
                (y as any)[id] = "`" + this.nextId++;
            }
            return y;
        });

        let r = this.onViewProcessData({ Entities: items })
        this.view.setItems(r.Entities, true);
        setTimeout(() => {
            this.onItemsChanged();
            this.element.trigger('change');
        });
        this.resetRowNumber(); // to generate serial no.
    }

    protected getGridCanLoad() {
        return false;
    }

    protected usePager() {
        return false;
    }

    protected getInitialTitle() {
        return null;
    }

    private searchText: string;

    protected createToolbarExtensions(): void {
        //super.createToolbarExtensions();
        if (this.get_ExtGridOptions().EnableQuickSearch) {
            GridUtils.addQuickSearchInputCustom(this.toolbar.element, (field, text) => {
                this.searchText = Select2.util.stripDiacritics(trimToNull(text) || '').toLowerCase();
                this.view.setItems(this.view.getItems(), true);
            });
        }
    }

    protected onViewFilter(row): boolean {
        if (!super.onViewFilter(row)) {
            return false;
        }

        if (this.searchText) {
            return this.matchContains(row);
        }

        return true;
    }

    private matchContains(item): boolean {
        let result = false;

        for (let prop in item) {
            result = Select2.util.stripDiacritics(String(item[prop] || '')).toLowerCase().indexOf(this.searchText) >= 0;

            if (result == true) {
                return result;
            }
        }

        return result;
    }

    getFilteredItems() {
        return this.getItems().filter(item => this.matchContains(item));
    }

    protected enableFiltering(): boolean { return false; }

    protected onViewSubmit() { return false; }

    get_readOnly(): boolean {
        return this.isReadOnly;
    }
    set_readOnly(value: boolean): void {
        this.isReadOnly = value;
        if (value == true) {
            this.element.find('.add-button').addClass('disabled');
            let opt = this.slickGrid.getOptions();
            opt.editable = false;

            this.slickGrid.setOptions(opt);
        } else {
            this.element.find('.add-button').removeClass('disabled');
        }

    }

    protected getSlickOptions() {
        let opt = super.getSlickOptions();
        opt.forceFitColumns = false;
        //opt.autoHeight = true; // If you need to show footer, you have to do opt.autoHeight = false
        return opt;
    }

    parentDialog: DialogBase<any, any>;

    //custom events
    onItemsChanged() {

    }
    onBeforeGetValue(items: TEntity[]) {

    }
}

export class GridEditorBase<TEntity> extends GridEditorBaseWithOption<TEntity, any>{

}

export class GridEditorBaseForJsonField<TEntity> extends GridEditorBaseWithOption<TEntity, any>{
    protected getRowIdField() { return 'Id' }

    public getEditValue(property, target) {
        let val = this.value;

        let idField = this.getRowIdField();
        let idList = val.filter(f => f[idField]).map(m => m[idField]);
        let maxId = Math.max(...idList);
        if (maxId < 0) maxId = 0;

        val.filter(f => !f[idField]).forEach(i => {
            i[idField] = ++maxId;
        });

        target[property.name] = val;
    }

}
