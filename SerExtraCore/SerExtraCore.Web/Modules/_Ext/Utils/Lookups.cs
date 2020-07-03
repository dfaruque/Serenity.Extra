using Serenity.ComponentModel;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _Ext
{
    [LookupScript("EmptyLookup", Permission = "*")]
    public class EmptyLookup : LookupScript
    {
        public EmptyLookup()
        {
            this.getItems = () => new List<object>();
        }
    }
}