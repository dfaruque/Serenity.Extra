using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class GridItemPickerEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.GridItemPickerEditor";

        public GridItemPickerEditorAttribute()
            : base(Key)
        {
        }

        public String GridType
        {
            get { return GetOption<String>("gridType"); }
            set { SetOption("gridType", value); }
        }

        public Boolean Multiple
        {
            get { return GetOption<Boolean>("multiple"); }
            set { SetOption("multiple", value); }
        }

        public String NameFieldInGridRow
        {
            get { return GetOption<String>("nameFieldInGridRow"); }
            set { SetOption("nameFieldInGridRow", value); }
        }

        public String NameFieldInThisRow
        {
            get { return GetOption<String>("nameFieldInThisRow"); }
            set { SetOption("nameFieldInThisRow", value); }
        }

        public String RowType
        {
            get { return GetOption<String>("rowType"); }
            set { SetOption("rowType", value); }
        }
    }
}

