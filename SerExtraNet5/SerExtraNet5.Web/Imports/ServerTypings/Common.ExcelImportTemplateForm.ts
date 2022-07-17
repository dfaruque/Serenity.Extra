namespace SerExtraNet5.Common {
    export interface ExcelImportTemplateForm {
        TemplateName: Serenity.StringEditor;
        MasterTableName: Serenity.LookupEditor;
        TemplateExcelFile: Serenity.ImageUploadEditor;
        ExcelMetadata: _Ext.JsonViewer;
        ExcelSheet: _Ext.EmptyLookupEditor;
        FieldMappings: ExcelImportFieldMappingEditor;
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
                var w1 = s.LookupEditor;
                var w2 = s.ImageUploadEditor;
                var w3 = _Ext.JsonViewer;
                var w4 = _Ext.EmptyLookupEditor;
                var w5 = ExcelImportFieldMappingEditor;

                Q.initFormType(ExcelImportTemplateForm, [
                    'TemplateName', w0,
                    'MasterTableName', w1,
                    'TemplateExcelFile', w2,
                    'ExcelMetadata', w3,
                    'ExcelSheet', w4,
                    'FieldMappings', w5,
                    'Remarks', w0
                ]);
            }
        }
    }
}
