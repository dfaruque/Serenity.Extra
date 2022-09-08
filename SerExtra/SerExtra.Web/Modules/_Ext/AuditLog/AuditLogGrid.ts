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

            return buttons;
        }

        protected createQuickFilters(): void {
            super.createQuickFilters();

            let actionDateQuickFilter = this.findQuickFilter(Serenity.DateTimeEditor, fld.ActionDate);

            actionDateQuickFilter.valueAsDate = Q.today();
        }

        protected getReportRequest() {
            let request = super.getReportRequest();

            request.ReportKey = "_Ext.AuditLogList";

            return request;
        }

    }
}