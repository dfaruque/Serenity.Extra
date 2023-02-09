import * as Serenity from "@serenity-is/corelib"
import { GridBase } from "./GridBase"

@Serenity.Decorators.filterable()
export class ReportGridBase<TItem, TOptions> extends GridBase<TItem, TOptions> {

    protected getButtons() {
        var buttons = super.getButtons();

        buttons.splice(0, 1);

        return buttons;
    }

    protected getColumns() {
        let columns = super.getColumns();

        columns.splice(0, 1);

        return columns;
    }
}
