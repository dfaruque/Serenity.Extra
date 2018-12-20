/// <reference path="../../../Northwind/Order/OrderGrid.ts" />

namespace SereneXtra.BasicSamples {

    /**
     * Subclass of OrderGrid to override dialog type to OtherFormInTabOneBarDialog
     */
    @Serenity.Decorators.registerClass()
    export class OtherFormInTabOneBarGrid extends Northwind.OrderGrid {

        protected getDialogType() { return OtherFormOneBarDialog; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}