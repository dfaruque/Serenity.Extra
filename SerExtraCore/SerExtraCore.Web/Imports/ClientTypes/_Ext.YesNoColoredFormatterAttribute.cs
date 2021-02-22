using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class YesNoColoredFormatterAttribute : CustomFormatterAttribute
    {
        public const string Key = "_Ext.YesNoColoredFormatter";

        public YesNoColoredFormatterAttribute()
            : base(Key)
        {
        }
    }
}
