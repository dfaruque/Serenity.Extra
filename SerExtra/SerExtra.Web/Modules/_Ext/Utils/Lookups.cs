using Serenity.ComponentModel;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _Ext //enums must have namespace otherwise it transforms to wrong typescript code
{
    [LookupScript("EmptyLookup")]
    public class EmptyLookup : LookupScript
    {
        public EmptyLookup()
        {
            this.getItems = () => new List<object>();
        }
    }
}