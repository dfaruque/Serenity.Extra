using Serenity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public static class DateTimeHelper
{
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
    /// Gets date time string of default date time format for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToDateTimeFormat(this DateTime? inputValue)
    {
        string format = "dd-MM-yyyy HH:mm";
        string result = inputValue?.ToString(format).Replace('.', ':');
        return result;
    }

    /// <summary>
    /// Gets date string of default date format for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToLongDateFormat(this DateTime? inputValue)
    {
        return inputValue?.ToString("dd MMMM, yyyy");
    }

    /// <summary>
    /// Gets date string of default date format for current culture.
    /// </summary>
    /// <param name="inputValue"></param>
    /// <returns></returns>
    public static string ToLongDateFormat(this DateTime inputValue)
    {
        return inputValue.ToString("dd MMMM, yyyy");
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
}
