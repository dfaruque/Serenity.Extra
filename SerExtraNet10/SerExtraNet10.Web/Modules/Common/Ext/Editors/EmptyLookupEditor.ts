import { Decorators, Lookup, LookupEditorBase, LookupEditorOptions, Select2Item } from "@serenity-is/corelib";

@Decorators.registerEditor('Ext.EmptyLookupEditor')
export class EmptyLookupEditor extends LookupEditorBase<LookupEditorOptions, any> {

    public setSelect2Items(items: Select2Item[]) {
        this.clearItems();
        items.forEach(item => { this.addItem(item); });
    }

    public setLookupItems(lookup: Lookup<any>) {
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
