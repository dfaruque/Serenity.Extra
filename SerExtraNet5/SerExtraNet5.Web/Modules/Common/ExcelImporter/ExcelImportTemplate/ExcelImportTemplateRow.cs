﻿using Serenity;
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
    [ConnectionKey("Default"), TableName("ExcelImportTemplates")]
    [DisplayName("Excel Import Template"), InstanceName("Excel Import Template"), TwoLevelCached]
    [NavigationPermission("Common:ExcelImportTemplate:Navigation")]
    [ReadPermission("Common:ExcelImportTemplate:Read")]
    [InsertPermission("Common:ExcelImportTemplate:Insert")]
    [UpdatePermission("Common:ExcelImportTemplate:Update")]
    [DeletePermission("Common:ExcelImportTemplate:Delete")]
    [LookupScript]
    public sealed class ExcelImportTemplateRow : LoggingRow<ExcelImportTemplateRow.RowFields>, IIdRow, INameRow
    {

        [DisplayName("Id"), Identity, IdProperty]
        public Int32? Id { get => Fields.Id[this]; set => Fields.Id[this] = value; }
        public partial class RowFields { public Int32Field Id; }

        [DisplayName("Template Name"), NotNull, QuickSearch, NameProperty]
        public String TemplateName { get => Fields.TemplateName[this]; set => Fields.TemplateName[this] = value; }
        public partial class RowFields { public StringField TemplateName; }

        [DisplayName("Master Table Name"), NotNull]
        [LookupEditor(typeof(ExcelImportableTableLookup)), LookupInclude]
        public String MasterTableName { get => Fields.MasterTableName[this]; set => Fields.MasterTableName[this] = value; }
        public partial class RowFields { public StringField MasterTableName; }

        [DisplayName("Template Excel File"), Required]
        [FileUploadEditor]
        public String TemplateExcelFile { get => Fields.TemplateExcelFile[this]; set => Fields.TemplateExcelFile[this] = value; }
        public partial class RowFields { public StringField TemplateExcelFile; }

        [DisplayName("Excel Metadata"), JsonViewer]
        public ExcelMetadata ExcelMetadata { get => Fields.ExcelMetadata[this]; set => Fields.ExcelMetadata[this] = value; }
        public partial class RowFields { public JsonField<ExcelMetadata> ExcelMetadata; }

        [DisplayName("Excel Sheet"), Required]
        [EmptyLookupEditor]
        public String ExcelSheet { get => Fields.ExcelSheet[this]; set => Fields.ExcelSheet[this] = value; }
        public partial class RowFields { public StringField ExcelSheet; }

        [DisplayName("Field Mappings"), LookupInclude]
        [ExcelImportFieldMappingEditor]
        public List<ExcelImportFieldMappingRow> FieldMappings { get => Fields.FieldMappings[this]; set => Fields.FieldMappings[this] = value; }
        public partial class RowFields { public JsonField<List<ExcelImportFieldMappingRow>> FieldMappings; }

        [DisplayName("Remarks")]
        public String Remarks { get => Fields.Remarks[this]; set => Fields.Remarks[this] = value; }
        public partial class RowFields { public StringField Remarks; }

        #region Foreign Fields

        #endregion Foreign Fields

        public ExcelImportTemplateRow() : base() { }

        public ExcelImportTemplateRow(RowFields fields) : base(fields) { }

        public partial class RowFields : LoggingRowFields { }
    }
}