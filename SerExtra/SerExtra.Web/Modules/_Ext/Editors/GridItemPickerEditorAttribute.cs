using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class GridItemPickerEditorAttribute : CustomEditorAttribute
    {

        public GridItemPickerEditorAttribute(Type rowType)
            : base(Key)
        {
            if (rowType == null)
                throw new ArgumentNullException(nameof(rowType));

            Row row = (Row)Activator.CreateInstance(rowType);

            var idField = ((Field)(row as IIdRow).IdField).Name;
            var nameField = ((Field)(row as INameRow).NameField).Name;

            SetOption("rowType", rowType.FullName);
            SetOption("gridType", rowType.FullName);
            SetOption("nameFieldInGridRow", nameField);


        }

    }
}

