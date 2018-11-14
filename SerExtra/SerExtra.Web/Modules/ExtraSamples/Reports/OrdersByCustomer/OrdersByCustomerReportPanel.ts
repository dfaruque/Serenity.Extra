namespace SerExtra.ExtraSamples {

    @Serenity.Decorators.registerClass()
    export class OrdersByCustomerReportPanel extends Serenity.PropertyPanel<OrdersByCustomerReportRequest, any> {

        protected getFormKey() { return OrdersByCustomerReportRequestForm.formKey; }

        private form: OrdersByCustomerReportRequestForm = new OrdersByCustomerReportRequestForm(this.idPrefix);

        constructor(container: JQuery) {
            super(container);

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

        protected getTemplate() {
            return `<div class="page-content s-DataGrid">
                <div class="page-title grid-title">Orders By Customer</div>

                <div class="s-Form flex-layout">
                    <form id="~_Form" action="">
                        <div class="fieldset ui-widget ui-widget-content ui-corner-all">
                            <div id="~_PropertyGrid"></div>
                            <div class="clear"></div>
                        </div>
                    </form>
                    <br />
                    <div class="buttons align-center">
                        <button id="~_SubmitButton" class="btn btn-primary"><i class="fa fa-search margin-r-5"></i> Show</button>
                        <button id="~_DownloadPdfButton" class="btn btn-default"><i class="fa fa-file-pdf-o margin-r-5"></i> Download PDF</button>
                    </div>
                </div>
            </div>`;
        }

    }
}