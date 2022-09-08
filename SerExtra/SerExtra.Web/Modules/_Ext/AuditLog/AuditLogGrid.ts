/// <reference path="../Bases/GridBase.ts" />

namespace _Ext {
    import fld = AuditLogRow.Fields;

    @Serenity.Decorators.registerClass()
    export class AuditLogGrid extends GridBase<AuditLogRow, any> {
        protected getColumnsKey() { return '_Ext.AuditLog'; }
        protected getDialogType() { return AuditLogDialog; }
        protected getRowType() { return AuditLogRow; }
        protected getService() { return AuditLogService.baseUrl; }

        constructor(container: JQuery) {
            super(container);
        }

        protected getButtons() {
            var buttons = super.getButtons();
            buttons.splice(0, 1);

            buttons.push({
                title: 'View as Report',
                icon: 'fa fa-html5',
                onClick: () => {
                    let entityIdQuickFilter = this.findQuickFilter(Serenity.IntegerEditor, fld.EntityId);
                    if (entityIdQuickFilter.value) {
                        this.showReport();
                    } else {
                        Q.confirm('You do not filter by a Table Name and Entity Id.\n'
                            + 'The report might be too large.\n'
                            + 'Do you want to generate report anyway?', () => {
                                this.showReport();
                            });
                    }
                }
            });

            return buttons;
        }

        private showReport() {
            let request = this.getReportRequest();
            if (request)
                ReportHelper.execute({ reportKey: "_Ext.AuditLogList", params: { request: request }, extension: 'html' });
        }

        protected createQuickFilters(): void {
            super.createQuickFilters();

            let actionDateQuickFilter = this.findQuickFilter(Serenity.DateTimeEditor, fld.ActionDate);

            actionDateQuickFilter.valueAsDate = Q.today();
        }
    }
}