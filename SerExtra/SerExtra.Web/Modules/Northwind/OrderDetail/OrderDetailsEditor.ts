
namespace SerExtra.Northwind {

    @Serenity.Decorators.registerClass()
    export class OrderDetailsEditor extends _Ext.GridEditorBase<OrderDetailRow> {
        protected getColumnsKey() { return "Northwind.OrderDetail"; }
        protected getDialogType() { return OrderDetailDialog; }
        protected getLocalTextPrefix() { return OrderDetailRow.localTextPrefix; }

        constructor(container: JQuery) {
            super(container);

            this.slickGrid.onCellChange.subscribe((e, args) => {
                let cell = args.cell;
                let row = args.row;
                let grid = args.grid as Slick.Grid;
                let item = args.item as OrderDetailRow;

                var productID = Q.toId(item.ProductID);
                if (productID != null) {
                    item.UnitPrice = ProductRow.getLookup().itemById[productID].UnitPrice;
                }

                if (this.validateEntity(item, item[this.getIdProperty()])) {
                    grid.updateRow(row);
                    // call the following to update footer summery
                    //this.setItems(this.getItems())
                }
                else {
                    //e.stopPropagation();
                    //e.stopImmediatePropagation();
                }
            });

            //to disable certain cell to editing based on some condition
            this.slickGrid.onBeforeEditCell.subscribe((e, args) => {
                let item = args.item as OrderDetailRow;
                let row = args.row as number;
                let cell = args.cell as number;
                let column = args.column as Slick.Column;

                if (column.field == OrderDetailRow.Fields.UnitPrice) {
                    if (item.ProductDiscontinued == true)
                        return false;
                }
            });

        }

        protected getSlickOptions() {
            let opt = super.getSlickOptions();
            opt.editable = true;
            return opt;
        }

        protected getButtons() {
            let buttons = super.getButtons();

            buttons.push({
                title: "Pick Products",
                cssClass: "add-button",
                onClick: () => {
                    var pickerDialog = new _Ext.GridItemPickerDialog({
                        gridType: ProductGrid, multiple: true,
                        preSelectedKeys: this.value.map(k => k.ProductID)
                    });

                    pickerDialog.onSuccess = (selectedItems: any[]) => {
                        let selectedItems2 = selectedItems.filter(t => { return !Q.any(this.view.getItems(), n => n.ProductID == t.ProductID) });

                        var orderDetails = selectedItems2.map<OrderDetailRow>(r => {
                            return {
                                ProductID: r.ProductID,
                                ProductName: r.ProductName,
                                UnitPrice: r.UnitPrice,
                                Quantity: 1,
                                Discount: 0,
                                LineTotal: r.UnitPrice
                            }
                        });

                        for (let orderDetail of orderDetails) {
                            orderDetail[this.getIdProperty()] = "`" + this.nextId++;
                            this.view.addItem(orderDetail);
                        }

                    }

                    pickerDialog.dialogOpen();
                }
            });

            return buttons;
        }

        validateEntity(row, id) {
            row.ProductID = Q.toId(row.ProductID);

            var sameProduct = Q.tryFirst(this.view.getItems(), x => x.ProductID === row.ProductID);
            if (sameProduct && this.id(sameProduct) !== id) {
                Q.alert('This product is already in order details!');
                return false;
            }

            row.ProductName = ProductRow.getLookup().itemById[row.ProductID].ProductName;
            row.LineTotal = (row.Quantity || 0) * (row.UnitPrice || 0) - (row.Discount || 0);
            return true;
        }
    }
}