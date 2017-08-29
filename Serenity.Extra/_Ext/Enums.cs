using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _Ext //enums must have namespace otherwise it transforms to wrong typescript code
{

    [EnumKey("Months"), ScriptInclude]
    public enum Months
    {
        January = 0,
        February = 1,
        March = 2,
        April = 3,
        May = 4,
        June = 5,
        July = 6,
        August = 7,
        September = 8,
        October = 9,
        November = 10,
        December = 11,
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