using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace SerExtra
{
    public partial class CustomerTemplatedLookupEditorAttribute : LookupEditorBaseAttribute
    {
        public const string Key = "SerExtra.CustomerTemplatedLookupEditor";

        public CustomerTemplatedLookupEditorAttribute()
            : base(Key)
        {
        }
    }
}
