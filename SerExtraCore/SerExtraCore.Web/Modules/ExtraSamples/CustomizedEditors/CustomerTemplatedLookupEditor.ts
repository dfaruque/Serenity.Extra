namespace SerExtraCore {

    @Serenity.Decorators.registerEditor()
    export class CustomerTemplatedLookupEditor extends Serenity.LookupEditorBase<any, any> {
        protected getLookupKey(): string { return Northwind.CustomerRow.lookupKey }

        constructor(container: JQuery) {
            super(container, null);

        }


        private select2Formatter(item: Serenity.Select2Item) {
            if (item)
                return `<div style="color:red">${item.text}</div>`;
        }

        getSelect2Options() {
            let opt = super.getSelect2Options();

            opt.escapeMarkup = (m) => {
                return m;
            }

            (opt as any).formatResult = this.select2Formatter;
            (opt as any).formatSelection = this.select2Formatter;

            return opt;
        }

    }
}