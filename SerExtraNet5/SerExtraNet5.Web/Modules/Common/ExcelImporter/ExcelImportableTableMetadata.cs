using System.Collections.Generic;

namespace SerExtraNet5.Common
{
    public class ExcelImportableTable
    {
        public string TableName { get; set; }
        public string RowType { get; set; }
        public List<ExcelImportableField> ImportableFields { get; set; }
    }

    public class ExcelImportableField
    {
        public string FieldName { get; set; }
        public string FieldType { get; set; }
    }
}