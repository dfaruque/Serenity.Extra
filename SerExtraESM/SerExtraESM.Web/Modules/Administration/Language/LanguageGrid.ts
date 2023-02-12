import { LanguageDialog } from "./LanguageDialog";
import { LanguageColumns, LanguageRow, LanguageService } from "../";
import { Decorators } from "@serenity-is/corelib"
import { GridBase } from "@/_Ext/Bases/GridBase"

@Decorators.registerClass('SerExtraESM.Administration.LanguageGrid')
export class LanguageGrid extends GridBase<LanguageRow, any> {
    protected useAsync() { return true; }
    protected getColumnsKey() { return LanguageColumns.columnsKey; }
    protected getDialogType() { return LanguageDialog; }
    protected getIdProperty() { return LanguageRow.idProperty; }
    protected getLocalTextPrefix() { return LanguageRow.localTextPrefix; }
    protected getService() { return LanguageService.baseUrl; }

    protected afterInit() {
        super.afterInit();
    }
    protected getDefaultSortBy() {
        return [LanguageRow.Fields.LanguageName];
    }
}