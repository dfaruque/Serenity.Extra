import { AuditLogRow, AuditLogForm, AuditLogService } from "@/ServerTypes/_Ext";
import { Decorators } from "@serenity-is/corelib"
import { DialogBase } from "@/_Ext/Bases/DialogBase"

@Decorators.registerClass('_Ext.AuditLogDialog')
export class AuditLogDialog extends DialogBase<AuditLogRow, any> {
    protected getFormKey() { return AuditLogForm.formKey; }
    protected getRowType() { return AuditLogRow; }
    protected getService() { return AuditLogService.baseUrl; }

    protected form = new AuditLogForm(this.idPrefix);

    protected afterLoadEntity() {
        super.afterLoadEntity();

        this.form.Changes.value = AuditLogDialog.getChangesInHtml(this.entity.Changes);
    }

    static getChangesInHtml(changesInJson: string) {
        if (!changesInJson) return '';

        let changes = JSON.parse(changesInJson);

        let changesHtml = '';
        for (let field in changes) {
            let fieldValues = changes[field];
            changesHtml += `
<tr>
    <td>${field}</td>
    <td>${fieldValues[0]}</td>
    <td>${fieldValues[1]}</td>
</tr>
`;
        }

        return `
<table class="table table-bordered table-condensed table-striped">
    <tr>
        <th>Field</th>
        <th>Old Value</th>
        <th>New Value</th>
    </tr>
    ${changesHtml}
</table>
`;;
    }
}
