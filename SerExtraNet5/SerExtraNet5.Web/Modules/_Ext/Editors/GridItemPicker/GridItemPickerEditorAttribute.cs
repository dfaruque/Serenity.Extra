using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.Runtime.CompilerServices;

namespace _Ext
{
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

            var rowClientType = rowType.FullName.Replace(".Entities", "");
            SetOption("rowType", rowClientType);

            string rowClientTypeWithoutRowSuffix = rowClientType.EndsWith("Row") ? rowClientType.Substring(0, rowClientType.Length - 3) : rowClientType;

            SetOption("gridType", rowClientTypeWithoutRowSuffix + "Grid");
            SetOption("dialogType", rowClientTypeWithoutRowSuffix + "Dialog");
            SetOption("idFieldInGridRow", idField);
            SetOption("nameFieldInGridRow", nameField);

            var propertyNameWithoutIdSuffix = propertyName;
            if (propertyName.EndsWith("Id", StringComparison.OrdinalIgnoreCase))
            {
                propertyNameWithoutIdSuffix = propertyName.Substring(0, propertyName.Length - 2);
            }

            SetOption("nameFieldInThisRow", propertyNameWithoutIdSuffix + nameField);

        }
    }
}

