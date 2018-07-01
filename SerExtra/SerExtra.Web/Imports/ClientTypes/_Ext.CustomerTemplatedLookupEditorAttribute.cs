using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class CustomerTemplatedLookupEditorAttribute : LookupEditorBaseAttribute
    {
        public const string Key = "_Ext.CustomerTemplatedLookupEditor";

        public CustomerTemplatedLookupEditorAttribute()
            : base(Key)
        {
        }
    }
}

