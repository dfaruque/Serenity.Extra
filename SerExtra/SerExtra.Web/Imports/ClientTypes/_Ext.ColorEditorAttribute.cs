using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class ColorEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.ColorEditor";

        public ColorEditorAttribute()
            : base(Key)
        {
        }
    }
}

