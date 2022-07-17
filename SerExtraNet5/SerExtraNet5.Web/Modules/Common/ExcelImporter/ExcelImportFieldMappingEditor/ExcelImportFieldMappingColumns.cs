using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.IO;

namespace SerExtraNet5.Common.Columns
{
    [ColumnsScript("Common.ExcelImportFieldMapping")]
    [BasedOnRow(typeof(ExcelImportFieldMappingRow), CheckNames = true)]
    public class ExcelImportFieldMappingColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight, Hidden]
        public Int32 Id { get; set; }
        public String ExcelColumnName { get; set; }
        public String TableColumnName { get; set; }
        public String Remarks { get; set; }
    }
}