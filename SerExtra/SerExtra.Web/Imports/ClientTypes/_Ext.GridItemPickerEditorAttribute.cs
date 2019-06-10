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

        public String CascadeField
        {
            get { return GetOption<String>("cascadeField"); }
            set { SetOption("cascadeField", value); }
        }

        public String CascadeFrom
        {
            get { return GetOption<String>("cascadeFrom"); }
            set { SetOption("cascadeFrom", value); }
        }

        public object CascadeValue
        {
            get { return GetOption<object>("cascadeValue"); }
            set { SetOption("cascadeValue", value); }
        }

        public object DialogType
        {
            get { return GetOption<object>("dialogType"); }
            set { SetOption("dialogType", value); }
        }

        public String FilterField
        {
            get { return GetOption<String>("filterField"); }
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

        public String IdFieldInGridRow
        {
            get { return GetOption<String>("idFieldInGridRow"); }
            set { SetOption("idFieldInGridRow", value); }
        }

        public Boolean InplaceView
        {
            get { return GetOption<Boolean>("inplaceView"); }
            set { SetOption("inplaceView", value); }
        }

        public Boolean Multiple
        {
            get { return GetOption<Boolean>("multiple"); }
            set { SetOption("multiple", value); }
        }

        public String NameFieldInGridRow
        {
            get { return GetOption<String>("nameFieldInGridRow"); }
            set { SetOption("nameFieldInGridRow", value); }
        }

        public String NameFieldInThisRow
        {
            get { return GetOption<String>("nameFieldInThisRow"); }
            set { SetOption("nameFieldInThisRow", value); }
        }

        public object PreSelectedKeys
        {
            get { return GetOption<object>("preSelectedKeys"); }
            set { SetOption("preSelectedKeys", value); }
        }

        public String RowType
        {
            get { return GetOption<String>("rowType"); }
            set { SetOption("rowType", value); }
        }

        public String ServiceUrl
        {
            get { return GetOption<String>("serviceUrl"); }
            set { SetOption("serviceUrl", value); }
        }
    }
}

