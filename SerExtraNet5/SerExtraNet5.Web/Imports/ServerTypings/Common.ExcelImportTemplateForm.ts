namespace SerExtraNet5.Common {
    export interface ExcelImportTemplateForm {
        TemplateName: Serenity.StringEditor;
        MasterTableName: Serenity.StringEditor;
        TemplateExcelFile: Serenity.StringEditor;
        TemplateExcelSheet: Serenity.StringEditor;
        FieldMappings: Serenity.StringEditor;
        Remarks: Serenity.StringEditor;
    }

    export class ExcelImportTemplateForm extends Serenity.PrefixedContext {
        static formKey = 'Common.ExcelImportTemplate';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!ExcelImportTemplateForm.init)  {
                ExcelImportTemplateForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;

                Q.initFormType(ExcelImportTemplateForm, [
                    'TemplateName', w0,
                    'MasterTableName', w0,
                    'TemplateExcelFile', w0,
                    'TemplateExcelSheet', w0,
                    'FieldMappings', w0,
                    'Remarks', w0
                ]);
            }
        }
    }
}
