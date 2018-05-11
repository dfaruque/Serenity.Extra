using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class DateTimePickerEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.DateTimePickerEditor";

        public DateTimePickerEditorAttribute()
            : base(Key)
        {
        }
    }
}

