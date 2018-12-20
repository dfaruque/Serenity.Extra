/// <reference path="../../../Northwind/Order/OrderGrid.ts" />

namespace SereneXtra.BasicSamples {

    /**
     * Subclass of OrderGrid to override dialog type to MultiColumnResponsiveDialog
     */
    @Serenity.Decorators.registerClass()
    export class MultiColumnResponsiveGrid extends Northwind.OrderGrid {

        protected getDialogType() { return MultiColumnResponsiveDialog; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}