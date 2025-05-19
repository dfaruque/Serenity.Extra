using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace _Ext //enums must have namespace otherwise it transforms to wrong typescript code
{

    [EnumKey("Months"), ScriptInclude]
    public enum Months
    {
        [Description("January")]
        January = 0,
        [Description("February")]
        February = 1,
        [Description("March")]
        March = 2,
        [Description("April")]
        April = 3,
        [Description("May")]
        May = 4,
        [Description("June")]
        June = 5,
        [Description("July")]
        July = 6,
        [Description("August")]
        August = 7,
        [Description("September")]
        September = 8,
        [Description("October")]
        October = 9,
        [Description("November")]
        November = 10,
        [Description("December")]
        December = 11
    }

    [EnumKey("TimeUoM"), ScriptInclude]
    public enum TimeUoM
    {

        Hour = 1,
        Day = 2,
        Week = 3,
        Month = 4,
        CalenderMonth = 5,
        Year = 6,
    }
}