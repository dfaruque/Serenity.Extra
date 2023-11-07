using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext;

public partial class HtmlTemplateEditorAttribute : CustomEditorAttribute
{
    public const string Key = "_Ext.HtmlTemplateEditor";

    public HtmlTemplateEditorAttribute()
        : base(Key)
    {
    }

    public object Cols
    {
        get { return GetOption<object>("cols"); }
        set { SetOption("cols", value); }
    }

    public object Placeholders
    {
        get { return GetOption<object>("placeholders"); }
        set { SetOption("placeholders", value); }
    }

    public object Rows
    {
        get { return GetOption<object>("rows"); }
        set { SetOption("rows", value); }
    }
}