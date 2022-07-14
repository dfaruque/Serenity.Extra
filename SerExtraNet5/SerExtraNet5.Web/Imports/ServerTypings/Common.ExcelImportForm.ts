namespace SerExtraNet5.Common {
    export interface ExcelImportForm {
        TemplateId: Serenity.IntegerEditor;
        MasterTableName: Serenity.StringEditor;
        FieldMappings: Serenity.StringEditor;
        ImportedExcelFile: Serenity.StringEditor;
        ImportedExcelSheet: Serenity.StringEditor;
        ExcelImportStatus: Serenity.IntegerEditor;
        ImportedData: Serenity.StringEditor;
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
                var w0 = s.IntegerEditor;
                var w1 = s.StringEditor;

                Q.initFormType(ExcelImportForm, [
                    'TemplateId', w0,
                    'MasterTableName', w1,
                    'FieldMappings', w1,
                    'ImportedExcelFile', w1,
                    'ImportedExcelSheet', w1,
                    'ExcelImportStatus', w0,
                    'ImportedData', w1,
                    'Remarks', w1
                ]);
            }
        }
    }
}
