/// <reference path="../../../Northwind/Order/OrderGrid.ts" />

namespace SerExtra.BasicSamples {

    /**
     * Subclass of OrderGrid to override dialog type to OtherFormInTabDialog
     */
    @Serenity.Decorators.registerClass()
    export class OtherFormInTabGrid extends Northwind.OrderGrid {

        protected getDialogType() { return OtherFormInTabDialog; }

        constructor(container: JQuery) {
            super(container);
        }
    }
}