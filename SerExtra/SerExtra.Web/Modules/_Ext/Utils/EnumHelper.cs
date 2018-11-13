using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
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

    public static string GetCssClass(this Enum value)
    {
        if (value == null)
            return "";

        FieldInfo fieldInfo = value.GetType().GetField(value.ToString());

        var attribute = (CssClassAttribute)fieldInfo.GetCustomAttribute(typeof(CssClassAttribute));

        return attribute?.CssClass ?? "";
    }

    public static string GetColumnName(this Enum value)
    {
        if (value == null)
            return "";

        FieldInfo fieldInfo = value.GetType().GetField(value.ToString());

        var attribute = (ColumnAttribute)fieldInfo.GetCustomAttribute(typeof(ColumnAttribute));

        return attribute?.Name ?? "";
    }

    public static T GetAttr<T>(this Enum value)
        where T : Attribute
    {
        if (value == null)
            return null;

        FieldInfo fieldInfo = value.GetType().GetField(value.ToString());

        var attribute = fieldInfo.GetCustomAttribute<T>();

        return attribute;
    }
}
