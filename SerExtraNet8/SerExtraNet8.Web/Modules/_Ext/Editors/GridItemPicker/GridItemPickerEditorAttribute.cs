using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.Runtime.CompilerServices;

namespace _Ext;

public partial class GridItemPickerEditorAttribute : CustomEditorAttribute
{
    public GridItemPickerEditorAttribute(Type rowType, [CallerMemberName] string propertyName = null)
        : base(Key)
    {
        if (rowType == null)
            throw new ArgumentNullException(nameof(rowType));

        IRow row = (IRow)Activator.CreateInstance(rowType);

        var idField = row.IdField.ColumnAlias;
        var nameField = row.NameField.ColumnAlias;
        SetOption("idFieldInGridRow", idField);
        SetOption("nameFieldInGridRow", nameField);

        var rowClientType = rowType.FullName.Replace(".Entities", "");
        SetOption("rowType", rowClientType);

        var rowClientTypeParts = rowClientType.Split('.');
        var rootNamespace = rowClientTypeParts[0];
        var moduleName = rowClientTypeParts[1];
        var entityName = rowClientTypeParts[2];

        if (entityName.EndsWith("Row"))
            entityName = entityName[..(entityName.Length - 3)];

        SetOption("gridType", $"{rootNamespace}.{moduleName}.{entityName}Grid");
        SetOption("dialogType", $"{rootNamespace}.{moduleName}.{entityName}Dialog");

        SetOption("pageImportPath", $"~/esm/Modules/{moduleName}/{entityName}/{entityName}Page.js");

        var propertyNameWithoutIdSuffix = propertyName;
        if (propertyName.EndsWith("Id", StringComparison.OrdinalIgnoreCase))
        {
            propertyNameWithoutIdSuffix = propertyName[..^2];
        }

        SetOption("nameFieldInThisRow", propertyNameWithoutIdSuffix + nameField);

    }
}

