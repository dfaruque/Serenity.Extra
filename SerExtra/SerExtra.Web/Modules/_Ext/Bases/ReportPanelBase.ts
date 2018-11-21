namespace _Ext {

    export class ReportPanelBase<TRequest> extends Serenity.PropertyPanel<TRequest, any> {
        protected getTemplateName() { return 'ReportPanel'; }
        protected getReportTitle() { return 'Report Title'; }
        protected getReportKey() { return 'Report.Key'; }

        protected getReportRequest() { return this.getSaveEntity(); }

        constructor(container: JQuery) {
            super(container);
            this.byId('PanelTitle').text(this.getReportTitle());

            this.byId('SubmitButton').click(e => {
                e.preventDefault();

                if (!this.validateForm()) {
                    return;
                }

                _Ext.ReportHelper.execute({ reportKey: this.getReportKey(), params: { Request: this.getReportRequest() }, extension: 'html' });

            });

            this.byId('DownloadPdfButton').click(e => {
                e.preventDefault();

                if (!this.validateForm()) {
                    return;
                }

                _Ext.ReportHelper.execute({ reportKey: this.getReportKey(), params: { Request: this.getReportRequest() }, extension: 'html' });

            });


        }

    }
}