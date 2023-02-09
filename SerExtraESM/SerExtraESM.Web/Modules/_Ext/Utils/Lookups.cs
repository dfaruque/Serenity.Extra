using Serenity.ComponentModel;
using Serenity.Web;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _Ext
{
    [LookupScript("EmptyLookup", Permission = "*")]
    public class EmptyLookup : LookupScript
    {
        protected override IEnumerable GetItems()
        {
            return new List<object>();
        }
    }
}