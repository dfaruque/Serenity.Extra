using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace SerExtraNet5.Common
{
    public partial class ExcelImportFieldMappingEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "SerExtraNet5.Common.ExcelImportFieldMappingEditor";

        public ExcelImportFieldMappingEditorAttribute()
            : base(Key)
        {
        }
    }
}
