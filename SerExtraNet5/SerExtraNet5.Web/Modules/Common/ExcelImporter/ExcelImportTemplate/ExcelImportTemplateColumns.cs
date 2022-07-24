using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.IO;

namespace _Ext.ExcelImporter.Columns
{
    [ColumnsScript("Common.ExcelImportTemplate")]
    [BasedOnRow(typeof(ExcelImportTemplateRow), CheckNames = true)]
    public class ExcelImportTemplateColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight, Hidden]
        public Int32 Id { get; set; }
        [EditLink]
        public String TemplateName { get; set; }
        public String MasterTableName { get; set; }
        public String Remarks { get; set; }
    }
}