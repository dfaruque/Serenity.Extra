using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class YesNoEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.YesNoEditor";

        public YesNoEditorAttribute()
            : base(Key)
        {
        }
    }
}
