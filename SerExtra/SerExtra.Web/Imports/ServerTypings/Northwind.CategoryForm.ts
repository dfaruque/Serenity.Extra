namespace SerExtra.Northwind {
    export interface CategoryForm {
        CategoryName: Serenity.StringEditor;
    }

    export class CategoryForm extends Serenity.PrefixedContext {
        static formKey = 'Northwind.Category';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!CategoryForm.init)  {
                CategoryForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;

                Q.initFormType(CategoryForm, [
                    'CategoryName', w0
                ]);
            }
        }
    }
}

