using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace SerExtraCore
{
    public partial class CustomerTemplatedLookupEditorAttribute : LookupEditorBaseAttribute
    {
        public const string Key = "SerExtraCore.CustomerTemplatedLookupEditor";

        public CustomerTemplatedLookupEditorAttribute()
            : base(Key)
        {
        }
    }
}
