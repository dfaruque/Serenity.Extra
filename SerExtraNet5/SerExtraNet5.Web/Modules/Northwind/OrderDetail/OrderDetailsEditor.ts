/// <reference path="../../Common/Helpers/GridEditorBase.ts" />

namespace SerExtraNet5.Northwind {

    @Serenity.Decorators.registerClass()
    export class OrderDetailsEditor extends _Ext.GridEditorBase<OrderDetailRow> {
        protected getColumnsKey() { return "Northwind.OrderDetail"; }
        protected getDialogType() { return OrderDetailDialog; }
        protected getLocalTextPrefix() { return OrderDetailRow.localTextPrefix; }

        constructor(container: JQuery) {
            super(container);

            let $barcodeInput = $('<input type="text" />');

            $barcodeInput.appendTo(this.toolbar.element)
                .keypress(event => {
                    if (event.keyCode == 13) {
                        let productId = $barcodeInput.val();

                        if (productId) {
                            let eqFilter = {};
                            eqFilter[ProductRow.Fields.ProductID] = productId

                            ProductService.List({ EqualityFilter: eqFilter, Take: 1 }, response => {
                                if (response.Entities.length > 0) {
                                    let pickedProduct = response.Entities[0];

                                    let orderDetails = this.value;
                                    orderDetails.push({
                                        ProductID: pickedProduct.ProductID,
                                        ProductName: pickedProduct.ProductName,
                                        UnitPrice: pickedProduct.UnitPrice,
                                        Quantity: 1,
                                        LineTotal: 1 * (pickedProduct.UnitPrice || 0)
                                    });

                                    this.value = orderDetails;
                                } else {
                                    Q.alert('Product not found!')
                                }
                            });
                        }
                    }
                });

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