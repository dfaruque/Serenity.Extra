﻿using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext;

public partial class HardCodedLookupEditorAttribute : CustomEditorAttribute
{
    public const string Key = "_Ext.HardCodedLookupEditor";

    public HardCodedLookupEditorAttribute()
        : base(Key)
    {
    }

    public bool AllowOtherValue
    {
        get { return GetOption<bool>("allowOtherValue"); }
        set { SetOption("allowOtherValue", value); }
    }

    public object SourceArray
    {
        get { return GetOption<object>("sourceArray"); }
        set { SetOption("sourceArray", value); }
    }

    public string SourceCSV
    {
        get { return GetOption<string>("sourceCSV"); }
        set { SetOption("sourceCSV", value); }
    }
}