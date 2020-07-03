using OfficeOpenXml;
using Serenity;
using System;
using System.Collections.Generic;
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

}
