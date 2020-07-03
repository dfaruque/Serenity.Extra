namespace SerExtraCore.ExtraSamples {
    export interface OrdersByCustomerReportRequestForm {
        CustomerId: Serenity.LookupEditor;
    }

    export class OrdersByCustomerReportRequestForm extends Serenity.PrefixedContext {
        static formKey = 'ExtraSamples.OrdersByCustomerReportRequestForm';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!OrdersByCustomerReportRequestForm.init)  {
                OrdersByCustomerReportRequestForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;

                Q.initFormType(OrdersByCustomerReportRequestForm, [
                    'CustomerId', w0
                ]);
            }
        }
    }
}
