namespace _Ext {
    export interface ReplaceRowForm {
        DeletedEntityName: Serenity.StringEditor;
        ReplaceWithEntityId: EmptyLookupEditor;
    }

    export class ReplaceRowForm extends Serenity.PrefixedContext {
        static formKey = '_Ext.ReplaceRow';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!ReplaceRowForm.init)  {
                ReplaceRowForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = EmptyLookupEditor;

                Q.initFormType(ReplaceRowForm, [
                    'DeletedEntityName', w0,
                    'ReplaceWithEntityId', w1
                ]);
            }
        }
    }
}

