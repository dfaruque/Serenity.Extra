using System;
using System.Collections.Generic;
using OfficeOpenXml;

namespace SerExtraNet5.Common
{
    public static class ExcelHelper
    {
        public static List<string> GetColumnHeaders(ExcelWorksheet worksheet)
        {
            var columns = new List<string>();

            for (var column = 1; column <= worksheet.Dimension.End.Column; column++)
            {
                var columnName = Convert.ToString(worksheet.Cells[1, column].Value);
                columns.Add(columnName);
            }

            return columns;
        }
    }
}