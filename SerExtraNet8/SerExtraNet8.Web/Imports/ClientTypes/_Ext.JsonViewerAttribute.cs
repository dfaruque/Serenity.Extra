using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext;

public partial class JsonViewerAttribute : CustomEditorAttribute
{
    public const string Key = "_Ext.JsonViewer";

    public JsonViewerAttribute()
        : base(Key)
    {
    }
}