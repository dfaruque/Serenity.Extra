namespace _Ext {

    @Serenity.Decorators.registerEditor()
    export class EmptyLookupEditor extends Serenity.Select2Editor<any, any> {
        public setSelect2Items(items: Serenity.Select2Item[]) {
            this.clearItems();
            items.forEach(item => { this.addItem(item); });
        }

        public setLookupItems(lookup: Q.Lookup<any>) {
            var items = lookup.items.map<Serenity.Select2Item>(m => {
                return {
                    id: m[lookup.idField],
                    text: m[lookup.textField],
                    source: m
                }
            });
            this.setSelect2Items(items);
        }

    }
}