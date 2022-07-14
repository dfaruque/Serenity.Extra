namespace SerExtraNet5.Common {
    export interface ExcelImportTemplateForm {
        TemplateName: Serenity.StringEditor;
        MasterTableName: Serenity.StringEditor;
        TemplateExcelFile: Serenity.ImageUploadEditor;
        ExcelSheet: _Ext.EmptyLookupEditor;
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
                var w1 = s.ImageUploadEditor;
                var w2 = _Ext.EmptyLookupEditor;

                Q.initFormType(ExcelImportTemplateForm, [
                    'TemplateName', w0,
                    'MasterTableName', w0,
                    'TemplateExcelFile', w1,
                    'ExcelSheet', w2,
                    'FieldMappings', w0,
                    'Remarks', w0
                ]);
            }
        }
    }
}
