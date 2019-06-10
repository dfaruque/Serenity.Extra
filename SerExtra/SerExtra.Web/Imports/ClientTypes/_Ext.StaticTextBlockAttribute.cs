using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class StaticTextBlockAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.StaticTextBlock";

        public StaticTextBlockAttribute()
            : base(Key)
        {
        }

        public Boolean HideLabel
        {
            get { return GetOption<Boolean>("hideLabel"); }
            set { SetOption("hideLabel", value); }
        }

        public Boolean IsDate
        {
            get { return GetOption<Boolean>("isDate"); }
            set { SetOption("isDate", value); }
        }

        public Boolean IsDateTime
        {
            get { return GetOption<Boolean>("isDateTime"); }
            set { SetOption("isDateTime", value); }
        }

        public Boolean IsHtml
        {
            get { return GetOption<Boolean>("isHtml"); }
            set { SetOption("isHtml", value); }
        }

        public Boolean IsLocalText
        {
            get { return GetOption<Boolean>("isLocalText"); }
            set { SetOption("isLocalText", value); }
        }

        public String Text
        {
            get { return GetOption<String>("text"); }
            set { SetOption("text", value); }
        }
    }
}

