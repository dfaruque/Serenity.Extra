namespace _Ext {

    export class ReportPanelBase<TRequest> extends Serenity.PropertyPanel<TRequest, any> {
        //protected getTemplateName() { return 'ReportPanel'; }
        protected getReportTitle() { return 'Report Title'; }
        protected getReportKey() { return 'Report.Key'; }

        protected getReportRequest() { return this.getSaveEntity(); }

        constructor(container: JQuery, opt?) {
            super(container, opt);

            this.byId('PanelTitle').text(this.getReportTitle());
            this.element.addClass('s-DataGrid');

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

                _Ext.ReportHelper.execute({ reportKey: this.getReportKey(), params: { Request: this.getReportRequest() }, extension: 'pdf' });

            });


        }

        protected getTemplate() {
            return `
    <div class="page-title grid-title" id="~_PanelTitle">Report Title</div>

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
`;
        }
    }
}