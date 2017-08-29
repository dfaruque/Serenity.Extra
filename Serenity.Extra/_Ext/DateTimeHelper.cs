using Serenity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public static class DateTimeHelper
{
    public static string ToDateFormat(this DateTime? inputValue)
    {
        return inputValue?.ToString(DateHelper.CurrentDateFormat);
    }
    public static string ToDateFormat(this DateTime inputValue)
    {
        return inputValue.ToString(DateHelper.CurrentDateFormat);
    }
    public static string ToDateTimeFormat(this DateTime? inputValue)
    {
        string format = "dd-MM-yyyy HH:mm";
        string result = inputValue?.ToString(format).Replace('.', ':');
        return result;
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
