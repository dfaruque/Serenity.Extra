
namespace _Ext {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.maximizable()
    export class AuditLogViewerDialog extends Serenity.TemplatedDialog<any> {

        constructor(public request: AuditLogViewerRequest) {
            super();

            this.dialogTitle = 'Audit Log Viewer'

            this.onDialogOpen = () => {

                AuditLogViewerService.List(this.request, response => {

                    response.EntityVersions.forEach((e,i) => {
                        e.ActionType = AuditActionType[e.ActionType] as any;
                        (e as any).VersionNo = i + 1;
                        (e as any).isShowed = false;
                    });

                    new Vue(new AuditLogViewer('#' + this.idPrefix + 'dialogContent', response.EntityVersions));
                })

            };
        }

        protected getTemplateName(): string {
            usingVuejs();
            return '_Ext.AuditLogViewer'
        }
    }
}
