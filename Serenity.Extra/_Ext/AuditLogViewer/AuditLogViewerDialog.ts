
namespace _Ext {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.maximizable()
    export class AuditLogViewerDialog extends Serenity.TemplatedDialog<any> {

        constructor(public request: AuditLogViewerRequest) {
            super();

            this.dialogTitle = 'Audit Log Viewer'

            this.onDialogOpen = () => {

                AuditLogViewerService.List(this.request, response => {
                    response.EntityVersions.forEach(e => {
                        delete (e.Id)
                        delete (e.ChangeViaUrl)


                        e.OldEntity = JSON.parse(e.OldEntity) as any;
                        e.Entity = JSON.parse(e.Entity)

                        delete ((e.OldEntity as any).Id);
                        delete ((e.OldEntity as any).IDate);
                        delete ((e.OldEntity as any).IUser);

                        e.AuditActionType = AuditActionType[e.AuditActionType] as any;
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
