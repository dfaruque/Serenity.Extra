using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.IO;
using SerExtraNet5.Administration.Entities;

namespace SerExtraNet5.Common
{
    [ConnectionKey("Default"), TableName("ExcelImports")]
    [DisplayName("Excel Import"), InstanceName("Excel Import"), TwoLevelCached]
    [NavigationPermission("Common:ExcelImport:Navigation")]
    [ReadPermission("Common:ExcelImport:Read")]
    [InsertPermission("Common:ExcelImport:Insert")]
    [UpdatePermission("Common:ExcelImport:Update")]
    [DeletePermission("Common:ExcelImport:Delete")]
    public sealed class ExcelImportRow : LoggingRow<ExcelImportRow.RowFields>, IIdRow, INameRow
    {

        [DisplayName("Id"), Identity, IdProperty]
        public Int32? Id { get => Fields.Id[this]; set => Fields.Id[this] = value; }
        public partial class RowFields { public Int32Field Id; }

        [DisplayName("Template"), NotNull, ForeignKey("ExcelImportTemplates", "Id"), LeftJoin("jTemplate"), TextualField("TemplateTemplateName")]
        [LookupEditor(typeof(ExcelImportTemplateRow))]
        public Int32? TemplateId { get => Fields.TemplateId[this]; set => Fields.TemplateId[this] = value; }
        public partial class RowFields { public Int32Field TemplateId; }

        [DisplayName("Master Table Name"), QuickSearch, NameProperty]
        [LookupEditor(typeof(ExcelImportableTableLookup))]
        public String MasterTableName { get => Fields.MasterTableName[this]; set => Fields.MasterTableName[this] = value; }
        public partial class RowFields { public StringField MasterTableName; }

        [DisplayName("Field Mappings")]
        [ExcelImportFieldMappingEditor]
        public List<ExcelImportFieldMappingRow> FieldMappings { get => Fields.FieldMappings[this]; set => Fields.FieldMappings[this] = value; }
        public partial class RowFields { public JsonField<List<ExcelImportFieldMappingRow>> FieldMappings; }

        [DisplayName("Imported Excel File"), NotNull]
        [FileUploadEditor]
        public String ImportedExcelFile { get => Fields.ImportedExcelFile[this]; set => Fields.ImportedExcelFile[this] = value; }
        public partial class RowFields { public StringField ImportedExcelFile; }

        [DisplayName("Excel Import Status")]
        public Int32? ExcelImportStatus { get => Fields.ExcelImportStatus[this]; set => Fields.ExcelImportStatus[this] = value; }
        public partial class RowFields { public Int32Field ExcelImportStatus; }

        [DisplayName("Imported Data")]
        public String ImportedData { get => Fields.ImportedData[this]; set => Fields.ImportedData[this] = value; }
        public partial class RowFields { public StringField ImportedData; }

        [DisplayName("Remarks")]
        public String Remarks { get => Fields.Remarks[this]; set => Fields.Remarks[this] = value; }
        public partial class RowFields { public StringField Remarks; }

        #region Foreign Fields


        [DisplayName("Template Name"), Expression("jTemplate.[TemplateName]"), ReadOnly(true), QuickSearch]
        public String TemplateTemplateName { get => Fields.TemplateTemplateName[this]; set => Fields.TemplateTemplateName[this] = value; }
        public partial class RowFields { public StringField TemplateTemplateName; }

        [DisplayName("Template Master Table Name"), Expression("jTemplate.[MasterTableName]"), ReadOnly(true)]
        public String TemplateMasterTableName { get => Fields.TemplateMasterTableName[this]; set => Fields.TemplateMasterTableName[this] = value; }
        public partial class RowFields { public StringField TemplateMasterTableName; }

        [DisplayName("Template Field Mappings"), Expression("jTemplate.[FieldMappings]"), ReadOnly(true)]
        public String TemplateFieldMappings { get => Fields.TemplateFieldMappings[this]; set => Fields.TemplateFieldMappings[this] = value; }
        public partial class RowFields { public StringField TemplateFieldMappings; }


        #endregion Foreign Fields

        public ExcelImportRow() : base() { }

        public ExcelImportRow(RowFields fields) : base(fields) { }

        public partial class RowFields : LoggingRowFields { }
    }
}