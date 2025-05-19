using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext;

public partial class MonthYearEditorAttribute : CustomEditorAttribute
{
    public const string Key = "_Ext.MonthYearEditor";

    public MonthYearEditorAttribute()
        : base(Key)
    {
    }
}