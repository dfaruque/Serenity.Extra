using EMIS;
using EMIS.Navigation;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;

public static partial class Q
{
    public static string SqlRound(string fieldExp, int? precision = 2)
    {
        return $"ROUND({fieldExp}, {precision})";
    }
}
