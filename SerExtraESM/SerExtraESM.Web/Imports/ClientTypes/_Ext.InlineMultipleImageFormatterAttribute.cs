using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class InlineMultipleImageFormatterAttribute : CustomFormatterAttribute
    {
        public const string Key = "_Ext.InlineMultipleImageFormatter";

        public InlineMultipleImageFormatterAttribute()
            : base(Key)
        {
        }

        public string DefaultImage
        {
            get { return GetOption<string>("defaultImage"); }
            set { SetOption("defaultImage", value); }
        }

        public string FileProperty
        {
            get { return GetOption<string>("fileProperty"); }
            set { SetOption("fileProperty", value); }
        }

        public bool InlineUpload
        {
            get { return GetOption<bool>("inlineUpload"); }
            set { SetOption("inlineUpload", value); }
        }

        public string MaxHeight
        {
            get { return GetOption<string>("maxHeight"); }
            set { SetOption("maxHeight", value); }
        }

        public string MaxWidth
        {
            get { return GetOption<string>("maxWidth"); }
            set { SetOption("maxWidth", value); }
        }

        public bool Thumb
        {
            get { return GetOption<bool>("thumb"); }
            set { SetOption("thumb", value); }
        }
    }
}
