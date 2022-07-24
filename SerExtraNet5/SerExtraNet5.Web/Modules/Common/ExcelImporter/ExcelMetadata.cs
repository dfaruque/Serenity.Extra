using System.Collections.Generic;

namespace _Ext.ExcelImporter
{
    public class ExcelMetadata
    {
        public List<ExcelSheet> Sheets { get; set; } = new();
    }

    public class ExcelSheet
    {
        public string SheetName { get; set; }
        public List<string> Columns { get; set; } = new();
    }
}