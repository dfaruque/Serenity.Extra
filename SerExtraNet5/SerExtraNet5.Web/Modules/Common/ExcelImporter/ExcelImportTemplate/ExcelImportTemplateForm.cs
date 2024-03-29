﻿using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.IO;

namespace _Ext.ExcelImporter.Forms
{
    [FormScript("Common.ExcelImportTemplate")]
    [BasedOnRow(typeof(ExcelImportTemplateRow), CheckNames = true)]
    public class ExcelImportTemplateForm
    {
        public String TemplateName { get; set; }
        public String TemplateExcelFile { get; set; }
        [Hidden]
        public ExcelMetadata ExcelMetadata { get; set; }
        [HalfWidth]
        public String ExcelSheet { get; set; }
        [HalfWidth]
        public String MasterTableName { get; set; }
        public String FieldMappings { get; set; }
        public String Remarks { get; set; }
    }
}