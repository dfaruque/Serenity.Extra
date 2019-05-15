using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
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

            Row row = (Row)Activator.CreateInstance(rowType);

            var idField = ((Field)(row as IIdRow).IdField).Name;
            var nameField = ((Field)(row as INameRow).NameField).Name;

            SetOption("rowType", rowType.FullName);

            var gridType = rowType.FullName.Replace(".Entities", "");
            if (gridType.EndsWith("Row"))
            {
                gridType = gridType.Substring(0, gridType.Length - 3);
                gridType += "Grid";
            }

            SetOption("gridType", gridType);
            SetOption("dialogType", gridType.Replace("Grid", "Dialog"));
            SetOption("nameFieldInGridRow", nameField);

            var kk = propertyName;
            if (propertyName.EndsWith("Id", StringComparison.OrdinalIgnoreCase))
            {
                kk = propertyName.Substring(0, propertyName.Length - 2);
            }

            SetOption("nameFieldInThisRow", kk + nameField);


        }

    }
}

