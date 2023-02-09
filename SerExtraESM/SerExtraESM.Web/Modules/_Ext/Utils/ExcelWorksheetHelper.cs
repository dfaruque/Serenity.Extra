using OfficeOpenXml;
using Serenity;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Web;

public static class ExcelWorksheetHelper
{

    public static DateTime? GetValueAsDate(this ExcelWorksheet worksheet, int row, int col, string[] dateFormates)
    {
        var cellValueAsString = worksheet.GetValue<string>(row, col);
        if (DateTime.TryParseExact(cellValueAsString, dateFormates, null, DateTimeStyles.AllowWhiteSpaces, out DateTime date))
        {
            return date;
        }

        return worksheet.GetValue<DateTime?>(row, col);
    }

    public static string GetString(this ExcelWorksheet worksheet, int row, int col)
    {
        var val = worksheet.GetValue<string>(row, col);

        if (val == "OfficeOpenXml.RowInternal")
            return string.Empty;

        return val;
    }

    public static void ValidateByEnumColumn<T>(this ExcelWorksheet worksheet) where T : Enum
    {
        //public enum SampleExcelColumn
        //{
        //    [Description("Column Header 1")] Column1 = 1,
        //    [Description("Column Header 2")] Column2 = 2,
        //}

        foreach (var column in EnumUtil.GetValues<T>())
        {
            var columnIndex = Convert.ToInt32(column);
            var cell = worksheet.Cells[1, columnIndex];
            var columnHeader = Convert.ToString(cell.Value ?? "").Trim();

            if (columnHeader != column.GetDescription())
                throw new Exception("Invalid sheet! The cell: " + cell.Address
                    + " should have the text: " + column.GetDescription());
        }
    }
}
