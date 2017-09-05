using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public static class NumberToWords
{

    public static string IntToWords(int number)
    {
        if (number == 0)
            return "zero";

        if (number < 0)
            return "minus " + IntToWords(Math.Abs(number));

        string words = "";

        if ((number / 1000000) > 0)
        {
            words += IntToWords(number / 1000000) + " million ";
            number %= 1000000;
        }

        if ((number / 1000) > 0)
        {
            words += IntToWords(number / 1000) + " thousand ";
            number %= 1000;
        }

        if ((number / 100) > 0)
        {
            words += IntToWords(number / 100) + " hundred ";
            number %= 100;
        }

        if (number > 0)
        {
            if (words != "")
                words += "and ";

            var unitsMap = new[] { "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen" };
            var tensMap = new[] { "zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety" };

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

    public static string DecimalToWords(decimal number, int decimals = 2)
    {
        number = Math.Round(number, decimals);

        if (number == 0)
            return "zero";

        if (number < 0)
            return "minus " + DecimalToWords(Math.Abs(number));

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

    public static string ToWords(this decimal number, int decimals = 2)
    {
        return DecimalToWords(number, decimals).ToUpper();
    }

    public static string ToWords(this decimal? number, int decimals = 2)
    {
        return DecimalToWords(number ?? 0, decimals).ToUpper();
    }

}
