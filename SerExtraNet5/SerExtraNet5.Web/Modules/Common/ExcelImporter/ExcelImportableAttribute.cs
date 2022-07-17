using System;

namespace SerExtraNet5
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
