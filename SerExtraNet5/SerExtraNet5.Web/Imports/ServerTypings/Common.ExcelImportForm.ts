namespace SerExtraNet5.Common {
    export interface ExcelImportForm {
        TemplateId: Serenity.LookupEditor;
        ImportedExcelFile: Serenity.ImageUploadEditor;
        ImportedData: ExcelImportDataEditor;
        ExcelImportStatus: Serenity.EnumEditor;
        Remarks: Serenity.StringEditor;
    }

    export class ExcelImportForm extends Serenity.PrefixedContext {
        static formKey = 'Common.ExcelImport';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!ExcelImportForm.init)  {
                ExcelImportForm.init = true;

                var s = Serenity;
                var w0 = s.LookupEditor;
                var w1 = s.ImageUploadEditor;
                var w2 = ExcelImportDataEditor;
                var w3 = s.EnumEditor;
                var w4 = s.StringEditor;

                Q.initFormType(ExcelImportForm, [
                    'TemplateId', w0,
                    'ImportedExcelFile', w1,
                    'ImportedData', w2,
                    'ExcelImportStatus', w3,
                    'Remarks', w4
                ]);
            }
        }
    }
}
