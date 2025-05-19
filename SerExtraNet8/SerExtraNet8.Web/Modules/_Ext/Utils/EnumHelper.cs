using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Web;
using ColumnAttribute = System.ComponentModel.DataAnnotations.Schema.ColumnAttribute;

public static class EnumUtil
{
    public static IEnumerable<T> GetValues<T>()
    {
        return Enum.GetValues(typeof(T)).Cast<T>();
    }

    public static string GetEnumDescription(this Enum value, ITextLocalizer localizer, string emptyText = "")
    {
        if (value == null)
            return emptyText;

        return localizer.FormatEnum(value.GetType(), value);
    }
    /// <summary>
    /// Gets string version of enum.
    /// </summary>
    /// <returns>Effective DisplayAttribute.Name or DescriptionAttribute.Description of given enum.</returns>
    public static string GetEnumString(this Enum value)
    {
        if(value is null)
            return "";
        try
        {
            var memberInfo = value
            .GetType()
            .GetMember(value.ToString())
            .First();

            var dsa = memberInfo.GetCustomAttribute<DescriptionAttribute>();
            var da = memberInfo.GetCustomAttribute<DisplayAttribute>();
            return da?.GetName() ?? dsa?.Description ?? value.ToString();
        }
        catch (Exception)
        {
            //If enum sequence is not found
            return "";
        }
        
    }
    public static string GetDescription(this Enum value, string emptyText = "")
    {
        if (value == null)
            return emptyText;

        FieldInfo fieldInfo = value.GetType().GetField(value.ToString());

        var attribute = (DescriptionAttribute)fieldInfo.GetCustomAttribute(typeof(DescriptionAttribute));

        return attribute?.Description ?? emptyText;
    }

    public static string GetCssClass(this Enum value, string defaultClass = "")
    {
        if (value == null)
            return defaultClass;

        FieldInfo fieldInfo = value.GetType().GetField(value.ToString());

        var attribute = (CssClassAttribute)fieldInfo.GetCustomAttribute(typeof(CssClassAttribute));

        return attribute?.CssClass ?? defaultClass;
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

        var attribute = fieldInfo?.GetCustomAttribute<T>();

        return attribute;
    }
}
