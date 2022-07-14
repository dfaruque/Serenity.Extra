using System.Collections.Generic;

namespace SerExtraNet5.Common
{
    public class ExcelMetadata
    {
        public List<ExcelSheet> Sheets { get; set; }
    }

    public class ExcelSheet
    {
        public string SheetName { get; set; }
        public List<string> Columns { get; set; }
    }
}