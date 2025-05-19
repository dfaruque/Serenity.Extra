using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext;

public partial class YesNoRadioEditorAttribute : CustomEditorAttribute
{
    public const string Key = "_Ext.YesNoRadioEditor";

    public YesNoRadioEditorAttribute()
        : base(Key)
    {
    }
}