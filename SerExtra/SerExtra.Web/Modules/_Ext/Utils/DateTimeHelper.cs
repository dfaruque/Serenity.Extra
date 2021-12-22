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
    public static string ToDateFormat(this DateTime? inputValue, string format = null)
    {
        return inputValue?.ToString(format ?? DateHelper.CurrentDateFormat);
    }

    /// <summary>
    /// Gets date string of default date format for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToDateFormat(this DateTime inputValue, string format = null)
    {
        return inputValue.ToString(format ?? DateHelper.CurrentDateFormat);
    }

    /// <summary>
    /// Gets date time string of default date time format for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToDateTimeFormat(this DateTime? inputValue)
    {
        string format = DateHelper.CurrentDateTimeFormat;
        string result = inputValue?.ToString(format);
        return result;
    }
    public static string ToDateTimeFormat(this DateTime inputValue)
    {
        string format = DateHelper.CurrentDateTimeFormat;
        string result = inputValue.ToString(format);
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

    public static DateTime GetFinancialYearStartDate(this DateTime inputValue)
    {
        var year = inputValue.Month > 6 ? inputValue.Year : inputValue.Year - 1;
        return new DateTime(year, 7, 1);
    }

}
