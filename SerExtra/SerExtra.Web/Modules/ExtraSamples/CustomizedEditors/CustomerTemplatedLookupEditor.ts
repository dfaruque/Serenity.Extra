namespace _Ext {

    @Serenity.Decorators.registerEditor()
    export class CustomerTemplatedLookupEditor extends Serenity.LookupEditorBase<any, any> {

        constructor(container: JQuery) {
            super(container, null);

        }

        protected getLookupKey(): string { return SerExtra.Northwind.CustomerRow.lookupKey }

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