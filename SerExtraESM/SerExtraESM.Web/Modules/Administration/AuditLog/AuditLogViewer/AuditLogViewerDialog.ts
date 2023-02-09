import { AuditLogViewerRequest, AuditLogViewerService, AuditActionType } from "../../"
import { Decorators, TemplatedDialog } from "@serenity-is/corelib"
import { AuditLogViewer } from "./AuditLogViewer"
import { usingVuejs } from "@/_Ext/Utils/Using"

@Decorators.registerClass('_Ext.AuditLogViewerDialog')
export class AuditLogViewerDialog extends TemplatedDialog<any> {

    constructor(public request: AuditLogViewerRequest) {
        super();

        this.dialogTitle = 'Audit Log Viewer'

        this.onDialogOpen = () => {

            AuditLogViewerService.List(this.request, response => {

                response.EntityVersions.forEach((e, i) => {
                    e.ActionType = AuditActionType[e.ActionType] as any;
                    (e as any).VersionNo = i + 1;
                    (e as any).isShowed = false;
                });

                new window['Vue'](new AuditLogViewer('#' + this.idPrefix + 'dialogContent', response.EntityVersions));
            })

        };
    }

    protected getTemplateName(): string {
        usingVuejs();
        return '_Ext.AuditLogViewer'
    }
}
