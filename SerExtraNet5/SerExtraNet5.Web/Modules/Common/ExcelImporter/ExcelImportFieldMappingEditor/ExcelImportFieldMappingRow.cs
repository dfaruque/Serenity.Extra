using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.IO;
using _Ext;

namespace _Ext.ExcelImporter
{
    public sealed class ExcelImportFieldMappingRow : Row<ExcelImportFieldMappingRow.RowFields>
    {

        [DisplayName("Id"), Identity]
        public Int64? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }
        public partial class RowFields { public Int64Field Id; }

        [DisplayName("Excel Column Name"), ReadOnly(true)]
        public string ExcelColumnName { get { return Fields.ExcelColumnName[this]; } set { Fields.ExcelColumnName[this] = value; } }
        public partial class RowFields { public StringField ExcelColumnName; }

        [DisplayName("Table Column Name")]
        [LookupEditor(typeof(ExcelImportableFieldLookup))]
        public string TableColumnName { get { return Fields.TableColumnName[this]; } set { Fields.TableColumnName[this] = value; } }
        public partial class RowFields { public StringField TableColumnName; }

        [DisplayName("Remarks")]
        public string Remarks { get { return Fields.Remarks[this]; } set { Fields.Remarks[this] = value; } }
        public partial class RowFields { public StringField Remarks; }

        //public static readonly RowFields Fields = new RowFields().Init();

        public ExcelImportFieldMappingRow() : base(Fields) { }

        public partial class RowFields : RowFieldsBase { }
    }

}