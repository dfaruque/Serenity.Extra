import { AuditLogDialog } from "./AuditLogDialog";
import { AuditLogColumns, AuditLogRow, AuditLogService } from "@/ServerTypes/_Ext";
import { Decorators, DateTimeEditor } from "@serenity-is/corelib"
import * as Q from "@serenity-is/corelib/q"
import { GridBase } from "@/_Ext/Bases/GridBase"

@Decorators.registerClass('_Ext.AuditLogGrid')
export class AuditLogGrid extends GridBase<AuditLogRow, any> {
    protected getColumnsKey() { return AuditLogColumns.columnsKey; }
    protected getDialogType() { return AuditLogDialog; }
    protected getRowDefinition() { return AuditLogRow; }
    protected getIdProperty() { return AuditLogRow.idProperty; }
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

        let fld = AuditLogRow.Fields;

        let actionDateQuickFilter = this.findQuickFilter(DateTimeEditor, fld.ActionDate);

        actionDateQuickFilter.valueAsDate = Q.today();
    }
}
