using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class AuditLogActionTypeFormatterAttribute : CustomFormatterAttribute
    {
        public const string Key = "_Ext.AuditLogActionTypeFormatter";

        public AuditLogActionTypeFormatterAttribute()
            : base(Key)
        {
        }
    }
}
