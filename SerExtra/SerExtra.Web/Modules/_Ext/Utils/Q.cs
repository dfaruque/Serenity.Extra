using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

public static partial class Q
{
    public static Type GetRowTypeByFormKey(string formKey)
    {
        var formType = Assembly.GetExecutingAssembly().GetTypes()
            .First(w => w.GetCustomAttribute<FormScriptAttribute>()?.Key == formKey);

        if (formType == null)
            throw new Exception($"There is no form with FormKey = {formKey}");

        var rowType = formType?.GetCustomAttribute<BasedOnRowAttribute>()?.RowType;

        if (rowType == null)
            throw new Exception($"There is no BasedOnRowAttribute in the form with FormKey = {formKey}");

        return rowType;
    }

    public static string GetTableNameByRowType(Type rowType)
    {
        var tableNameAttr = rowType?.GetCustomAttribute<TableNameAttribute>();

        if (tableNameAttr == null)
            throw new Exception($"There is no TableNameAttribute at {rowType.Name}");

        return tableNameAttr.Name;
    }

    public static string GetConnectionKeyByRowType(Type rowType)
    {
        var ConnectionKeyAttr = rowType?.GetCustomAttribute<ConnectionKeyAttribute>();

        if (ConnectionKeyAttr == null)
            throw new Exception($"There is no ConnectionKeyAttribute at {rowType.Name}");

        return ConnectionKeyAttr.Value;
    }

}
