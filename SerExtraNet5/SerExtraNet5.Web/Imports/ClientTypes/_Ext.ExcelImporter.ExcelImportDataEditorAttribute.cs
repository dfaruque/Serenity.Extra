using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext.ExcelImporter
{
    public partial class ExcelImportDataEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.ExcelImporter.ExcelImportDataEditor";

        public ExcelImportDataEditorAttribute()
            : base(Key)
        {
        }
    }
}
