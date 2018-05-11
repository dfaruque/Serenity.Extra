namespace _Ext {

    @Serenity.Decorators.registerEditor()
    export class EmptyLookupEditor extends Serenity.Select2Editor<any, any> {

        constructor(container: JQuery) {
            super(container, null);

        }
    }
}