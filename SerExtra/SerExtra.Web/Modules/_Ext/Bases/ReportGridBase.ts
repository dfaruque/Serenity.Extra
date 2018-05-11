namespace _Ext {
    @Serenity.Decorators.filterable()
    export class ReportGridBase<TItem, TOptions>
        //this comment is for preventing replacement 
        extends _Ext.GridBase<TItem, TOptions> {

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
}