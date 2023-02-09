import * as Serenity from "@serenity-is/corelib"
import * as Q from "@serenity-is/corelib/q"

@Serenity.Decorators.registerEditor('_Ext.EmptyLookupEditor')
export class EmptyLookupEditor extends Serenity.LookupEditorBase<Serenity.LookupEditorOptions, any> {

    public setSelect2Items(items: Select2Item[]) {
        this.clearItems();
        items.forEach(item => { this.addItem(item); });
    }

    public setLookupItems(lookup: Q.Lookup<any>) {
        var items = lookup.items.map<Select2Item>(m => {
            return {
                id: m[lookup.idField],
                text: m[lookup.textField],
                source: m
            }
        });
        this.setSelect2Items(items);
    }
}
