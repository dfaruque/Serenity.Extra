namespace SerExtra.ExtraSamples {

    @Serenity.Decorators.registerClass()
    export class OrdersByCustomerReportPanel extends Serenity.PropertyPanel<OrdersByCustomerReportRequest, any> {

        protected getFormKey() { return OrdersByCustomerReportRequestForm.formKey; }

        private form: OrdersByCustomerReportRequestForm = new OrdersByCustomerReportRequestForm(this.idPrefix);

        constructor(container: JQuery) {
            super(container);
            this.byId('PanelTitle').text('Orders By Customer');

            this.byId('SubmitButton').click(e => {
                e.preventDefault();

                if (!this.validateForm()) {
                    return;
                }

                var request = this.getSaveEntity();

                _Ext.ReportHelper.execute({ reportKey: 'ExtraSamples.OrdersByCustomerReport', params: { Request: request }, extension: 'html' });

            });

            this.byId('DownloadPdfButton').click(e => {
                e.preventDefault();

                if (!this.validateForm()) {
                    return;
                }

                var request = this.getSaveEntity();

                _Ext.ReportHelper.execute({ reportKey: 'ExtraSamples.OrdersByCustomerReport', params: { Request: request }, extension: 'pdf' });

            });


        }

        protected getTemplateName() {
            return 'ReportPanel';
        }
    }
}