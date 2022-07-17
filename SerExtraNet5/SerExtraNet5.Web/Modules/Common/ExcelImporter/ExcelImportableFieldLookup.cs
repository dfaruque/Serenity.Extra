using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data.Mapping;
using Serenity.Web;

namespace SerExtraNet5.Common
{
    [LookupScript]
    public class ExcelImportableFieldLookup : LookupScript
    {
        public ExcelImportableFieldLookup()
        {
            IdField = TextField = nameof(ExcelImportableField.FieldName);
        }

        protected override IEnumerable GetItems()
        {
            return null;
        }
    }
}