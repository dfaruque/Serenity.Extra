namespace SerExtra.ExtraSamples {
    export interface OrdersByCustomerReportRequestForm {
        CustomerId: Serenity.IntegerEditor;
    }

    export class OrdersByCustomerReportRequestForm extends Serenity.PrefixedContext {
        static formKey = 'ExtraSamples.OrdersByCustomerReportRequestForm';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!OrdersByCustomerReportRequestForm.init)  {
                OrdersByCustomerReportRequestForm.init = true;

                var s = Serenity;
                var w0 = s.IntegerEditor;

                Q.initFormType(OrdersByCustomerReportRequestForm, [
                    'CustomerId', w0
                ]);
            }
        }
    }
}

