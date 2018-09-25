namespace SerExtra.ExtraSamples {

    import fld = Northwind.ProductRow.Fields;

    @Serenity.Decorators.registerClass()
    export class MainGridInlineEditingGrid extends _Ext.GridBase<Northwind.ProductRow, any> {
        protected getColumnsKey() { return "ExtraSamples.MainGridInlineEditing"; }
        protected getDialogType() { return <any>Northwind.ProductDialog; }
        protected getIdProperty() { return Northwind.ProductRow.idProperty; }
        protected getLocalTextPrefix() { return Northwind.ProductRow.localTextPrefix; }
        protected getService() { return Northwind.ProductService.baseUrl; }

        private isEditedFlag = 'isEdited'

        constructor(container: JQuery) {
            super(container);

            this.slickGrid.onCellChange.subscribe((e, args) => {
                let item = args.item as Northwind.ProductRow;
                item[this.isEditedFlag] = true;
                this.view.updateItem(item[this.getIdProperty()], item);
            });

            this.slickGrid.onBeforeEditCell.subscribe((e, args) => {
                let item = args.item as Northwind.ProductRow;
                let column = args.column as Slick.Column;

                if (column.field == fld.CategoryID) {
                    //let editorParams = column.sourceItem.editorParams;
                    //editorParams.cascadeField = Northwind.SupplierRow.Fields.City;
                    //editorParams.cascadeValue = item.SupplierCity;
                }
            });

        }

        protected getItemCssClass(item: Northwind.ProductRow, index: number): string {
            let klass: string = "";
            let IsEdited = item[this.isEditedFlag] as boolean;
            if (!IsEdited) {
                IsEdited = false;
            }

            if (IsEdited == true) {
                klass += " text-danger text-bold";
            }
            return Q.trimToNull(klass);
        }


        protected getSlickOptions() {
            let opt = super.getSlickOptions();
            opt.editable = true;
            opt.autoEdit = true;
            return opt;
        }

        protected getButtons() {
            var buttons = super.getButtons();
            buttons.push({
                title: 'Save',
                cssClass: 'apply-changes-button',
                onClick: e => {
                    (this.slickGrid as any).getEditController().commitCurrentEdit();

                    var items = this.view.getItems().filter(q => q[this.isEditedFlag] == true);
                    items.forEach(item => {
                        if (item['RowNum'])
                            delete item['RowNum'];
                        if (item[this.isEditedFlag])
                            delete item[this.isEditedFlag];

                        Northwind.ProductService.Update({ EntityId: item.ProductID, Entity: item },
                            response => {
                                Q.notifySuccess("Success !");
                            }
                        );
                    })
                },
                separator: true
            });
            return buttons;
        }
    }
}