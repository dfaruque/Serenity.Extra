using System;

namespace _Ext
{
    [AttributeUsage(AttributeTargets.Class)]
    public class ExcelImportAttribute : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class ExcelImportableAttribute : Attribute
    {

    }
}
