using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class AutoCompleteEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.AutoCompleteEditor";

        public AutoCompleteEditorAttribute()
            : base(Key)
        {
        }

        public string LookupKey
        {
            get { return GetOption<string>("lookupKey"); }
            set { SetOption("lookupKey", value); }
        }

        public double MinSearchLength
        {
            get { return GetOption<double>("minSearchLength"); }
            set { SetOption("minSearchLength", value); }
        }

        public object SourceArray
        {
            get { return GetOption<object>("sourceArray"); }
            set { SetOption("sourceArray", value); }
        }

        public string SourceCSV
        {
            get { return GetOption<string>("sourceCSV"); }
            set { SetOption("sourceCSV", value); }
        }
    }
}
