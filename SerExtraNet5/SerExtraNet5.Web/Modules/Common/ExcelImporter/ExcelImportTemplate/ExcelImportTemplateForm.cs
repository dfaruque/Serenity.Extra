using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.IO;

namespace SerExtraNet5.Common.Forms
{
    [FormScript("Common.ExcelImportTemplate")]
    [BasedOnRow(typeof(ExcelImportTemplateRow), CheckNames = true)]
    public class ExcelImportTemplateForm
    {
        public String TemplateName { get; set; }
        public String MasterTableName { get; set; }
        public String TemplateExcelFile { get; set; }
        public ExcelMetadata ExcelMetadata { get; set; }
        public String ExcelSheet { get; set; }
        public String FieldMappings { get; set; }
        public String Remarks { get; set; }
    }
}