import { LanguageForm, LanguageRow, LanguageService } from "../../ServerTypes/Administration";
import { nsAdministration } from "../../ServerTypes/Namespaces";
import { DialogBase } from "../../Common/Ext/Bases/DialogBase";

export class LanguageDialog extends DialogBase<LanguageRow, any> {
    static override[Symbol.typeInfo] = this.registerClass(nsAdministration);

    protected override getFormKey() { return LanguageForm.formKey; }
    protected override getIdProperty() { return LanguageRow.idProperty; }
    protected override getLocalTextPrefix() { return LanguageRow.localTextPrefix; }
    protected override getNameProperty() { return LanguageRow.nameProperty; }
    protected override getService() { return LanguageService.baseUrl; }

    protected override form = new LanguageForm(this.idPrefix);
}