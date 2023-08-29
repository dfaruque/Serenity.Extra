using Serenity;
using Serenity.ComponentModel;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace _Ext
{
    public partial class GridItemPickerEditorAttribute : CustomEditorAttribute
    {
        public const string Key = "_Ext.GridItemPickerEditor";

        public GridItemPickerEditorAttribute()
            : base(Key)
        {
        }

        public string CascadeField
        {
            get { return GetOption<string>("cascadeField"); }
            set { SetOption("cascadeField", value); }
        }

        public string CascadeFrom
        {
            get { return GetOption<string>("cascadeFrom"); }
            set { SetOption("cascadeFrom", value); }
        }

        public object CascadeValue
        {
            get { return GetOption<object>("cascadeValue"); }
            set { SetOption("cascadeValue", value); }
        }

        public object CustomPrams
        {
            get { return GetOption<object>("customPrams"); }
            set { SetOption("customPrams", value); }
        }

        public object DialogType
        {
            get { return GetOption<object>("dialogType"); }
            set { SetOption("dialogType", value); }
        }

        public string FilterField
        {
            get { return GetOption<string>("filterField"); }
            set { SetOption("filterField", value); }
        }

        public object FilteringCriteria
        {
            get { return GetOption<object>("filteringCriteria"); }
            set { SetOption("filteringCriteria", value); }
        }

        public object FilterValue
        {
            get { return GetOption<object>("filterValue"); }
            set { SetOption("filterValue", value); }
        }

        public object GridType
        {
            get { return GetOption<object>("gridType"); }
            set { SetOption("gridType", value); }
        }

        public string IdFieldInGridRow
        {
            get { return GetOption<string>("idFieldInGridRow"); }
            set { SetOption("idFieldInGridRow", value); }
        }

        public bool InplaceView
        {
            get { return GetOption<bool>("inplaceView"); }
            set { SetOption("inplaceView", value); }
        }

        public bool Multiple
        {
            get { return GetOption<bool>("multiple"); }
            set { SetOption("multiple", value); }
        }

        public string NameFieldInGridRow
        {
            get { return GetOption<string>("nameFieldInGridRow"); }
            set { SetOption("nameFieldInGridRow", value); }
        }

        public string NameFieldInThisRow
        {
            get { return GetOption<string>("nameFieldInThisRow"); }
            set { SetOption("nameFieldInThisRow", value); }
        }

        public string PageImportPath
        {
            get { return GetOption<string>("pageImportPath"); }
            set { SetOption("pageImportPath", value); }
        }

        public object PreSelectedKeys
        {
            get { return GetOption<object>("preSelectedKeys"); }
            set { SetOption("preSelectedKeys", value); }
        }

        public string RowType
        {
            get { return GetOption<string>("rowType"); }
            set { SetOption("rowType", value); }
        }

        public string ServiceUrl
        {
            get { return GetOption<string>("serviceUrl"); }
            set { SetOption("serviceUrl", value); }
        }
    }
}
