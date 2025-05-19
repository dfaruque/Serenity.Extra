import { Decorators } from "@serenity-is/corelib"
import { LanguageRow, LanguageForm, LanguageService } from "../../ServerTypes/Administration";
import { DialogBase } from "../../_Ext/Bases/DialogBase";

@Decorators.registerClass('SerExtraNet8.Administration.LanguageDialog')
export class LanguageDialog extends DialogBase<LanguageRow, any> {
    protected getFormKey() { return LanguageForm.formKey; }
    protected getIdProperty() { return LanguageRow.idProperty; }
    protected getLocalTextPrefix() { return LanguageRow.localTextPrefix; }
    protected getNameProperty() { return LanguageRow.nameProperty; }
    protected getService() { return LanguageService.baseUrl; }

    protected form = new LanguageForm(this.idPrefix);
}