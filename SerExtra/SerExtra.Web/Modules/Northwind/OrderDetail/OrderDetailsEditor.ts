
namespace SerExtra.Northwind {

    @Serenity.Decorators.registerClass()
    export class OrderDetailsEditor extends _Ext.GridEditorBase<OrderDetailRow> {
        protected getColumnsKey() { return "Northwind.OrderDetail"; }
        protected getDialogType() { return OrderDetailDialog; }
        protected getLocalTextPrefix() { return OrderDetailRow.localTextPrefix; }

        constructor(container: JQuery) {
            super(container);

            this.slickGrid.onCellChange.subscribe((p1, p2) => {
                let cell = p2.cell;
                let row = p2.row;
                let grid = p2.grid as Slick.Grid;
                let item = p2.item as OrderDetailRow;

                var productID = Q.toId(item.ProductID);
                if (productID != null) {
                    item.UnitPrice = ProductRow.getLookup().itemById[productID].UnitPrice;
                }

                if (this.validateEntity(item, item[this.getIdProperty()])) {
                    grid.updateRow(row);
                }
                else {
                    //p1.stopPropagation();
                    //p1.stopImmediatePropagation();
                }
                //console.log(p1);
                //console.log(p2);
            });
        }

        protected getSlickOptions() {
            let opt = super.getSlickOptions();
            opt.editable = true;
            return opt;
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