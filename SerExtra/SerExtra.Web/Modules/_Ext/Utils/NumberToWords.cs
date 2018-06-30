using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public static class NumberToWords
{

    public static string IntToWords(int number, bool isMillion = false)
    {
        if (number == 0)
            return "Zero";

        if (number < 0)
            return "Minus " + IntToWords(Math.Abs(number));

        string words = "";

        if (isMillion)
        {
            int oneMillion = 1000000;
            if ((number / oneMillion) > 0)
            {
                words += IntToWords(number / oneMillion) + " Million ";
                number %= oneMillion;
            }
        }
        else
        {
            int oneCrore = 10000000;
            if ((number / oneCrore) > 0)
            {
                words += IntToWords(number / oneCrore) + " Crore ";
                number %= oneCrore;
            }

            int oneLac = 100000;
            if ((number / oneLac) > 0)
            {
                words += IntToWords(number / oneLac) + " Lac ";
                number %= oneLac;
            }

        }

        if ((number / 1000) > 0)
        {
            words += IntToWords(number / 1000) + " Thousand ";
            number %= 1000;
        }

        if ((number / 100) > 0)
        {
            words += IntToWords(number / 100) + " Hundred ";
            number %= 100;
        }

        if (number > 0)
        {
            if (words != "")
                words += "and ";

            var unitsMap = new[] { "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
            var tensMap = new[] { "Zero", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };

            if (number < 20)
                words += unitsMap[number];
            else
            {
                words += tensMap[number / 10];
                if ((number % 10) > 0)
                    words += "-" + unitsMap[number % 10];
            }
        }

        return words;
    }

    public static string ToWords(this int number, int decimals = 2)
    {
        return IntToWords(number);
    }

    public static string ToWords(this int? number, int decimals = 2)
    {
        return IntToWords(number ?? 0);
    }

    #region DecimalToWordsTk
    public static string DecimalToWordsTk(decimal number, int decimals = 2)
    {
        number = Math.Round(number, decimals);

        if (number == 0)
            return "Zero";

        if (number < 0)
            return "Minus " + DecimalToWordsTk(Math.Abs(number));

        string words = "";

        int intPortion = (int)number;
        decimal fraction = (number - intPortion) * 100;
        int decPortion = (int)fraction;

        words = IntToWords(intPortion) + " Taka";
        if (decPortion > 0)
        {
            words += " and " + IntToWords(decPortion) + " Paisa";
        }

        return words + " Only";
    }

    public static string ToWordsTk(this decimal number, int decimals = 2)
    {
        return DecimalToWordsTk(number, decimals);
    }

    public static string ToWordsTk(this decimal? number, int decimals = 2)
    {
        return DecimalToWordsTk(number ?? 0, decimals);
    }
    #endregion

    #region DecimalToWords
    public static string DecimalToWords(decimal number, int decimals = 2)
    {
        number = Math.Round(number, decimals);

        if (number == 0)
            return "Zero";

        if (number < 0)
            return "Minus " + DecimalToWords(Math.Abs(number));

        string words = "";

        int intPortion = (int)number;
        decimal fraction = (number - intPortion) * 100;
        int decPortion = (int)fraction;

        words = IntToWords(intPortion);
        if (decPortion > 0)
        {
            words += " Point " + IntToWords(decPortion);
        }
        return words;
    }

    public static string ToWords(this decimal number, int decimals = 2)
    {
        return DecimalToWords(number, decimals);
    }

    public static string ToWords(this decimal? number, int decimals = 2)
    {
        return DecimalToWords(number ?? 0, decimals);
    }

    #endregion
}
