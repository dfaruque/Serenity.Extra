using System.Collections.Generic;

namespace SerExtraNet5.Common
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