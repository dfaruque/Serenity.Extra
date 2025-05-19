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
}