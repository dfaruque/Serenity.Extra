import { localText, PropertyPanel } from "@serenity-is/corelib"
import { ReportHelper } from "@serenity-is/extensions"

export class ReportPanelBase<TRequest> extends PropertyPanel<TRequest, any> {
    //protected getTemplateName() { return 'ReportPanel'; }
    protected getReportTitle() { return 'Report Title'; }
    protected getReportKey() { return 'Report.Key'; }

    protected getReportRequest() { return this.getSaveEntity(); }

    constructor(props: any) {
        super(props);

        this.byId('PanelTitle').text(this.getReportTitle());
        this.element.addClass('s-DataGrid');

        this.byId('SubmitButton').click(e => {
            e.preventDefault();

            if (!this.validateForm()) {
                return;
            }

            ReportHelper.execute({ reportKey: this.getReportKey(), params: { Request: this.getReportRequest() }, extension: 'html' });

        });

        this.byId('DownloadPdfButton').click(e => {
            e.preventDefault();

            if (!this.validateForm()) {
                return;
            }

            ReportHelper.execute({ reportKey: this.getReportKey(), params: { Request: this.getReportRequest() }, extension: 'pdf' });

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
            <button id="~_SubmitButton" class="btn btn-primary"><i class="fa fa-search margin-r-5"></i> ${localText('Controls.View')}</button>
            <button id="~_DownloadPdfButton" class="btn btn-default"><i class="fa fa-file-pdf-o margin-r-5"></i> ${localText('Controls.DownloadPDF')}</button>
        </div>
    </div>
`;
    }
}
