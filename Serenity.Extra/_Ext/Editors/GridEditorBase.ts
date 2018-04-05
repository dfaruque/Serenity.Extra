/// <reference path="../Bases/GridBase.ts" />
namespace _Ext {

    @Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element("<div/>")
    export class GridEditorBase<TEntity> extends _Ext.GridBase<TEntity, any>
        implements Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly {

        protected getIdProperty() { return "__id"; }

        protected nextId = 1;

        constructor(container: JQuery) {
            super(container);
            //this.autoColumnSizePlugin.resizeAllColumns();

        }
        protected getQuickFilters() {
            return [];
        }

        protected id(entity: TEntity) {
            return (entity as any)[this.getIdProperty()];
        }

        protected save(opt: Serenity.ServiceOptions<any>, callback: (r: Serenity.ServiceResponse) => void) {
            var request = opt.request as Serenity.SaveRequest<TEntity>;
            var row = Q.deepClone(request.Entity);

            var id = this.id(row);
            if (id == null) {
                (row as any)[this.getIdProperty()] = "`" + this.nextId++;
            }

            if (!this.validateEntity(row, id)) {
                return;
            }

            var items = this.view.getItems().slice();
            if (id == null) {
                items.push(row);
            }
            else {
                var index = Q.indexOf(items, x => this.id(x) === id);
                items[index] = Q.deepClone({} as TEntity, items[index], row);
            }

            this.setEntities(items);
            callback({});
        }

        protected deleteEntity(id: number) {
            this.view.deleteItem(id);
            this.onItemsChanged();
            return true;
        }

        protected validateEntity(row: TEntity, id: number) {
            row['Serial'] = this.nextId;
            return true;
        }

        protected setEntities(items: TEntity[]) {
            this.view.setItems(items, true);
            this.onItemsChanged();
            this.refresh();

        }

        protected getNewEntity(): TEntity {
            return {} as TEntity;
        }

        protected getButtons(): Serenity.ToolButton[] {
            return [{
                title: this.getAddButtonCaption(),
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

            return this.view.getItems().map(x => {
                var y = Q.deepClone(x);
                var id = y[p];
                if (id && id.toString().charAt(0) == '`')
                    delete y[p];

                if (y['Serial'])
                    delete y['Serial'];
                return y;
            });
        }

        public set value(value: TEntity[]) {
            var p = this.getIdProperty();

            let val = this.onViewProcessData({ Entities: value || [], Skip: 0 }).Entities; // to generate serial no.

            this.setEntities(val.map(x => {
                var y = Q.deepClone(x);
                if ((y as any)[p] == null)
                    (y as any)[p] = "`" + this.nextId++;
                return y;
            }));
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
            Serenity.GridUtils.addQuickSearchInputCustom(this.toolbar.element, (field, text) => {
                this.searchText = Select2.util.stripDiacritics(Q.trimToNull(text) || '').toLowerCase();
                this.view.setItems(this.view.getItems(), true);
            });
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

        protected enableFiltering(): boolean { return false; }

        protected onViewSubmit() { return false; }

        get_readOnly(): boolean {
            return this.isReadOnly;
        }
        set_readOnly(value: boolean): void {
            this.isReadOnly = value;
            if (value == true) {
                this.element.find('.add-button').addClass('disabled');
            } else {
                this.element.find('.add-button').removeClass('disabled');
            }
        }


        parentDialog: DialogBase<any, any>;

        //custom events
        onItemsChanged() {

        }
    }
}