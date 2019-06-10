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

        public Double InputMaxLength
        {
            get { return GetOption<Double>("inputMaxLength"); }
            set { SetOption("inputMaxLength", value); }
        }

        public String PrefixFormatterType
        {
            get { return GetOption<String>("prefixFormatterType"); }
            set { SetOption("prefixFormatterType", value); }
        }

        public Double PrefixLength
        {
            get { return GetOption<Double>("prefixLength"); }
            set { SetOption("prefixLength", value); }
        }
    }
}

