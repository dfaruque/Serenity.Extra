using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

public static partial class NumberToWords
{

    public static string ToWords(this int number, int decimals = 2)
    {
        var cultureName = CultureInfo.CurrentUICulture.Name.ToLower();

        if (cultureName.StartsWith("bn"))
            return IntToWordsBn(number);
        else
            return IntToWords(number);
    }

    public static string ToWords(this int? number, int decimals = 2)
    {
        var cultureName = CultureInfo.CurrentUICulture.Name.ToLower();

        if (cultureName.StartsWith("bn"))
            return IntToWordsBn(number ?? 0);
        else
            return IntToWords(number ?? 0);
    }

    #region DecimalToWordsTk

    public static string ToWordsTk(this decimal number, int decimals = 2)
    {
        var cultureName = CultureInfo.CurrentUICulture.Name.ToLower();

        if (cultureName.StartsWith("bn"))
            return DecimalToWordsTkBn(number, decimals);
        else
            return DecimalToWordsTk(number, decimals);
    }

    public static string ToWordsTk(this decimal? number, int decimals = 2)
    {
        var cultureName = CultureInfo.CurrentUICulture.Name.ToLower();

        if (cultureName.StartsWith("bn"))
            return DecimalToWordsTkBn(number ?? 0, decimals);
        else
            return DecimalToWordsTk(number ?? 0, decimals);
    }

    #endregion

    #region DecimalToWords

    public static string ToWords(this decimal number, int decimals = 2)
    {
        var cultureName = CultureInfo.CurrentUICulture.Name.ToLower();

        if (cultureName.StartsWith("bn"))
            return DecimalToWordsBn(number, decimals);
        else
            return DecimalToWords(number, decimals);
    }

    public static string ToWords(this decimal? number, int decimals = 2)
    {
        var cultureName = CultureInfo.CurrentUICulture.Name.ToLower();

        if (cultureName.StartsWith("bn"))
            return DecimalToWordsBn(number ?? 0, decimals);
        else
            return DecimalToWords(number ?? 0, decimals);
    }

    #endregion
}
