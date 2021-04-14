using OfficeOpenXml;
using Serenity;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

public static class DateTimeHelper
{
    public static string ToISODateFormat(this DateTime inputValue)
    {
        return inputValue.ToString("yyyy-MM-dd");
    }
    public static string ToISODateFormat(this DateTime? inputValue)
    {
        return inputValue?.ToString("yyyy-MM-dd");
    }
    public static string ToISODateTimeFormat(this DateTime inputValue)
    {
        return inputValue.ToString(DateHelper.ISODateTimeFormatLocal);
    }
    public static string ToISODateTimeFormat(this DateTime? inputValue)
    {
        return inputValue?.ToString(DateHelper.ISODateTimeFormatLocal);
    }

    /// <summary>
    /// Gets date string of default date format for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToDateFormat(this DateTime? inputValue)
    {
        return inputValue?.ToString(DateHelper.CurrentDateFormat);
    }

    /// <summary>
    /// Gets date string of default date format for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToDateFormat(this DateTime inputValue)
    {
        return inputValue.ToString(DateHelper.CurrentDateFormat);
    }

    /// <summary>
    /// Gets date time string of "dd-MM-yyyy HH:mm" format for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToDateTimeFormat(this DateTime? inputValue)
    {
        string format = "dd-MM-yyyy HH:mm";
        string result = inputValue?.ToString(format).Replace('.', ':');
        return result;
    }
    public static string ToDateTimeFormat(this DateTime inputValue)
    {
        string format = "dd-MM-yyyy HH:mm";
        string result = inputValue.ToString(format).Replace('.', ':');
        return result;
    }

    /// <summary>
    /// Gets date string of "dd MMMM yyyy" for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToLongDateFormat(this DateTime? inputValue)
    {
        return inputValue?.ToString("dd MMMM yyyy");
    }

    /// <summary>
    /// Gets date string of "dd MMMM yyyy" for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToLongDateFormat(this DateTime inputValue)
    {
        return inputValue.ToString("dd MMMM yyyy");
    }

    public static string ToMonthYear(this DateTime inputValue)
    {
        return inputValue.ToString("MMM-yyyy");
    }
    public static string ToMonthYear(this DateTime? inputValue)
    {
        return inputValue?.ToString("MMM-yyyy");
    }
    public static string ToMonthYearNumeric(this DateTime? inputValue)
    {
        if (inputValue is null) return string.Empty;
        return inputValue.Value.Month.ToString().PadLeft(2, '0') + "/" + inputValue.Value.Year.ToString().Substring(2);
    }

    public static int GetMonths(DateTime fromDate, DateTime toDate)
    {
        int months;
        months = (toDate.Year - fromDate.Year) * 12;
        months -= fromDate.Month;
        months += toDate.Month;
        return months <= 0 ? 0 : months;
    }

    public static int GetMonthsCeil(DateTime fromDate, DateTime toDate)
    {
        int months = GetMonths(fromDate, toDate);
        return months <= 0 ? 1 : months;
    }


    public static string GetFinancialYear(this DateTime? inputValue)
    {
        return inputValue?.GetFinancialYear() ?? "";
    }

    public static string GetFinancialYear(this DateTime inputValue)
    {
        if (inputValue.Month > 6)
        {
            return inputValue.Year.ToString() + "-" + (inputValue.Year + 1).ToString();
        }
        else
        {
            return (inputValue.Year - 1).ToString() + "-" + inputValue.Year.ToString();

        }
    }

}
