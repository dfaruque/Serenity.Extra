using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public static partial class NumberToWords
{
    public static string IntToWordsBn(int number, bool isMillion = false)
    {
        if (number == 0)
            return "শূন্য";

        if (number < 0)
            return "ঋণাত্বক " + IntToWordsBn(Math.Abs(number));

        string words = "";

        if (isMillion)
        {
            int oneMillion = 1000000;
            if ((number / oneMillion) > 0)
            {
                words += IntToWordsBn(number / oneMillion) + " মিলিয়ন ";
                number %= oneMillion;
            }
        }
        else
        {
            int oneCrore = 10000000;
            if ((number / oneCrore) > 0)
            {
                words += IntToWordsBn(number / oneCrore) + " কোটি ";
                number %= oneCrore;
            }

            int oneLac = 100000;
            if ((number / oneLac) > 0)
            {
                words += IntToWordsBn(number / oneLac) + " লক্ষ ";
                number %= oneLac;
            }

        }

        if ((number / 1000) > 0)
        {
            words += IntToWordsBn(number / 1000) + " হাজার ";
            number %= 1000;
        }

        if ((number / 100) > 0)
        {
            words += IntToWordsBn(number / 100) + " শত ";
            number %= 100;
        }

        if (number > 0)
        {
            if (words != "")
                words += " ";

            var unitsMap = new[] { "শূন্য", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়", "দশ", "এগারো", "বার", "তেড়", "চৌদ্দ", "পনের", "ষোল", "সতের", "আঠার", "উনিশ", "বিশ", "একুশ", "বাইশ", "তেইশ", "চব্বিশ", "পঁচিশ", "ছাব্বিশ", "সাতাশ", "আঠাশ", "ঊনত্রিশ", "ত্রিশ", "একত্রিশ", "বত্রিশ", "তেত্রিশ", "চৌত্রিশ", "পঁয়ত্রিশ", "ছত্রিশ", "সাঁইত্রিশ", "আটত্রিশ", "ঊনচল্লিশ", "চল্লিশ", "একচল্লিশ", "বিয়াল্লিশ", "তেতাল্লিশ", "চুয়াল্লিশ", "পঁয়তাল্লিশ", "ছেচল্লিশ", "সাতচল্লিশ", "আটচল্লিশ", "ঊনপঞ্চাশ", "পঞ্চাশ", "একান্ন", "বায়ান্ন", "তিপ্পান্ন", "চুয়ান্ন", "পঞ্চান্ন", "ছাপ্পান্ন", "সাতান্ন", "আটান্ন", "ঊনষাট", "ষাট", "একষট্টি", "বাষট্টি", "তেষট্টি", "চৌষট্টি", "পঁয়ষট্টি", "ছেষট্টি", "সাতষট্টি", "আটষট্টি", "ঊনসত্তর", "সত্তর", "একাত্তর", "বাহাত্তর", "তিয়াত্তর", "চুয়াত্তর", "পঁচাত্তর", "ছিয়াত্তর", "সাতাত্তর", "আটাত্তর", "ঊনআশি", "আশি", "একাশি", "বিরাশি", "তিরাশি", "চুরাশি", "পঁচাশি", "ছিয়াশি", "সাতাশি", "আটাশি", "ঊননব্বই", "নব্বই", "একানব্বই", "বিরানব্বই", "তিরানব্বই", "চুরানব্বই", "পঁচানব্বই", "ছিয়ানব্বই", "সাতানব্বই", "আটানব্বই", "নিরানব্বই" };

            words += unitsMap[number];
        }

        return words;
    }

    public static string DecimalToWordsBn(decimal number, int decimals = 2)
    {
        number = Q.Round(number, decimals);

        if (number == 0)
            return "শূন্য";

        if (number < 0)
            return "ঋণাত্বক " + DecimalToWordsBn(Math.Abs(number));

        string words = "";

        int intPortion = (int)number;
        decimal fraction = (number - intPortion) * 100;
        int decPortion = (int)fraction;

        words = IntToWordsBn(intPortion);
        if (decPortion > 0)
        {
            words += " দশমিক " + IntToWordsBn(decPortion);
        }
        return words;
    }

    public static string DecimalToWordsTkBn(decimal number, int decimals = 2)
    {
        number = Q.Round(number, decimals);

        if (number == 0)
            return "শূন্য";

        if (number < 0)
            return "ঋণাত্বক " + DecimalToWordsTkBn(Math.Abs(number));

        string words = "";

        int intPortion = (int)number;
        decimal fraction = (number - intPortion) * 100;
        int decPortion = (int)fraction;

        words = IntToWordsBn(intPortion) + " টাকা";
        if (decPortion > 0)
        {
            words += " " + IntToWordsBn(decPortion) + " পয়সা";
        }

        return words + " মাত্র";
    }

}
