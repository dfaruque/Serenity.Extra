using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace SerExtraESM.Administration;

public partial class RoleCheckEditorAttribute : CustomEditorAttribute
{
    public const string Key = "SerExtraESM.Administration.RoleCheckEditor";

    public RoleCheckEditorAttribute()
        : base(Key)
    {
    }
}