using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class PrefixedStringEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.PrefixedStringEditor";

        public PrefixedStringEditorAttribute()
            : base(Key)
        {
        }

        public double InputMaxLength
        {
            get { return GetOption<double>("inputMaxLength"); }
            set { SetOption("inputMaxLength", value); }
        }

        public string PrefixFormatterType
        {
            get { return GetOption<string>("prefixFormatterType"); }
            set { SetOption("prefixFormatterType", value); }
        }

        public double PrefixLength
        {
            get { return GetOption<double>("prefixLength"); }
            set { SetOption("prefixLength", value); }
        }
    }
}
