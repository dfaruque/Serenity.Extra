/// <reference path="../Bases/GridBase.ts" />

namespace _Ext {

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
    }
}