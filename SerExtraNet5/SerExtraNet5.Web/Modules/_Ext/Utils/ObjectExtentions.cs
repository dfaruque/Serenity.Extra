using Serenity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public static partial class ObjectExtentions
{
    public static bool HasValue(this object input)
    {
        if (input == null) return false;
        else if (string.IsNullOrWhiteSpace(input.ToString())) return false;
        else return true;

    }

    public static bool IsFilterApplied(this Dictionary<string, object> dic, string key)
    {
        if (dic.ContainsKey(key)) return dic[key].HasValue();
        else return false;
    }

    //public static string ToYesNo(this bool inputValue)
    //{
    //    return inputValue == true ? LocalText.TryGet("Dialogs.YesButton") ?? "Yes" : LocalText.TryGet("Dialogs.NoButton") ?? "No";
    //}

    public static string ToYesNo(this bool? inputValue)
    {
        return ToYesNo(inputValue ?? false);
    }

    public static string ToStringTk(this decimal input)
    {
        return "Tk. " + input.ToString("#,##0.00");

    }


    public static string ToStringDollar(this decimal input)
    {
        return input.ToString("$ #,##0.000");

    }

    public static string ToStringTk(this decimal? input)
    {
        if (input == null) return "Tk. 0.00";
        else return "Tk. " + input.Value.ToString("#,##0.00");

    }

    public static string ToNumberFormat(this decimal? input)
    {
        if (input == null) return "0.00";
        else return input.Value.ToString("#,##0.00");

    }

    public static string ToStringDollar(this decimal? input)
    {
        if (input == null) return "$ 0.000";
        else return input.Value.ToString("$ #,##0.000");

    }

    public static string ToRound(this decimal input, int decimalPlace = 2)
    {
        string d = "";
        if (decimalPlace > 0)
        {
            d = ".";
            for (int i = 0; i < decimalPlace; i++)
            {
                d += "0";
            }
        }

        return input.ToString("#,##0" + d);

    }
    public static string ToRound(this decimal? input, int decimalPlace = 2, bool showZeroIfNull = true)
    {
        if (input == null && !showZeroIfNull)
            return string.Empty;
        else
            return (input ?? 0).ToRound(decimalPlace);
    }

    public static string ToNegativeFormat(this decimal input)
    {

        if (input < 0)
        {
            input = Math.Abs(input);
            return String.Concat("(", input.ToString("N", new System.Globalization.CultureInfo("en-US")), ")");
        }
        else
            return input.ToString("N", new System.Globalization.CultureInfo("en-US"));
    }
    public static string ToNegativeFormat(this decimal? input)
    {
        return (input ?? 0).ToNegativeFormat();
    }

    public static string ToUSFormat(this decimal? input)
    {
        return (input ?? 0).ToString("N", new System.Globalization.CultureInfo("en-US"));

    }
    public static string ToUSFormat(this decimal input)
    {
        return input.ToString("N", new System.Globalization.CultureInfo("en-US"));

    }

}
