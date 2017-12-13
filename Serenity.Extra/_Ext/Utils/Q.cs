using Serenity;
using Serenity.ComponentModel;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

public static partial class Q
{
    public static string GetTableNameByFormKey(string formKey)
    {
        var formType = Assembly.GetExecutingAssembly().GetTypes()
            .First(w => w.GetCustomAttribute<FormScriptAttribute>()?.Key == formKey);

        var rowType = formType?.GetCustomAttribute<BasedOnRowAttribute>()?.RowType;
        var tableName = rowType?.GetCustomAttribute<TableNameAttribute>()?.Name;
        return tableName;
    }


}
