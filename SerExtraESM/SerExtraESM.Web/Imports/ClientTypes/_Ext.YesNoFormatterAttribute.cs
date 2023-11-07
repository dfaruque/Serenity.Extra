using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext;

public partial class YesNoFormatterAttribute : CustomFormatterAttribute
{
    public const string Key = "_Ext.YesNoFormatter";

    public YesNoFormatterAttribute()
        : base(Key)
    {
    }
}