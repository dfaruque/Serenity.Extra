/// <reference path="../Product/Picker/ProductPickerDialog.ts" />

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
                }
                else {
                    //e.stopPropagation();
                    //e.stopImmediatePropagation();
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
                    var pickerDialog = new ProductPickerDialog();

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
                            orderDetail[this.getIdProperty()] = this.nextId++;
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