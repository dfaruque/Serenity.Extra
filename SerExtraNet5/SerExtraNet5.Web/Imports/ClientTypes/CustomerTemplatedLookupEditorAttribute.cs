using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace SerExtraNet5
{
    public partial class CustomerTemplatedLookupEditorAttribute : LookupEditorBaseAttribute
    {
        public const string Key = "SerExtraNet5.CustomerTemplatedLookupEditor";

        public CustomerTemplatedLookupEditorAttribute()
            : base(Key)
        {
        }
    }
}
