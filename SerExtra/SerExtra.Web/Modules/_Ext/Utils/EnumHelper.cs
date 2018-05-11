using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Web;

public static class EnumUtil
{
    public static IEnumerable<T> GetValues<T>()
    {
        return Enum.GetValues(typeof(T)).Cast<T>();
    }


    public static string GetEnumDescription(this Enum value)
    {
        if (value == null)
            return null;

        FieldInfo fi = value.GetType().GetField(value.ToString());

        DescriptionAttribute[] attributes = (DescriptionAttribute[])fi.GetCustomAttributes(typeof(DescriptionAttribute), false);

        if (attributes != null &&
            attributes.Length > 0)
            return attributes[0].Description;
        else
            return value.ToString();
    }

    public static string GetEnumCssClass(this Enum value)
    {
        if (value == null)
            return "";

        FieldInfo fi = value.GetType().GetField(value.ToString());

        CssClassAttribute[] attributes = (CssClassAttribute[])fi.GetCustomAttributes(typeof(CssClassAttribute), false);

        if (attributes != null &&
            attributes.Length > 0)
            return attributes[0].CssClass;
        else
            return "";
    }
}
