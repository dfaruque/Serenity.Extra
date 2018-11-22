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
    }
}

