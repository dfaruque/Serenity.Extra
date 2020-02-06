using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext.DevTools
{
    public partial class DataConnectionEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.DevTools.DataConnectionEditor";

        public DataConnectionEditorAttribute()
            : base(Key)
        {
        }
    }
}

