using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Common;
using System.Linq;
using System.Reflection;

namespace _Ext.DevTools.Model
{
    public class CompareEntityToDBPageModel
    {
        public List<TableComparisonInfo> TableComparisonInfos { get; set; } = new List<TableComparisonInfo>();

        public CompareEntityToDBPageModel(ISqlConnections sqlConnections)
        {
            var assembly = Assembly.GetAssembly(typeof(CompareEntityToDBPageModel));

            #region Entity
            var rowClasses = assembly.GetTypes().Where(w => w.GetCustomAttribute<ConnectionKeyAttribute>() != null
                                && w.GetCustomAttribute<TableNameAttribute>() != null
                                && w.IsSealed);

            foreach (var rowClass in rowClasses)
            {
                IRow row = (IRow)Activator.CreateInstance(rowClass);
                var rowFields = row.GetFields();

                var connectionKey = rowClass.GetCustomAttribute<ConnectionKeyAttribute>().Value;

                var TableComparisonInfo = new TableComparisonInfo
                {
                    ConnectionKey = connectionKey,
                    RowClassName = rowClass.Name,
                    TableName = row.Table
                };
                TableComparisonInfos.Add(TableComparisonInfo);

                using (var connection = sqlConnections.NewByKey(connectionKey))
                {
                    var dialect = connection.GetDialect();
                    var schemaProvider = SchemaHelper.GetSchemaProvider(dialect.ServerType);

                    var tableName = SchemaHelper.GetTableNameOnly(connection, row.Table);
                    string schema = SchemaHelper.GetSchemaName(connection, row.Table);

                    var dbFields = schemaProvider.GetFieldInfos(connection, schema, tableName);
                    if (dbFields == null || dbFields.Count() == 0)
                    {
                        TableComparisonInfo.Issues += $"Unable to retrive Table info from Database. ";
                    }
                    else
                    {
                        for (int i = 0; i < row.Fields.Count; i++)
                        {
                            Field rowfield = rowFields[i];

                            if (EntityFieldExtensions.IsTableField(rowfield) && rowfield.Flags != FieldFlags.Reflective)
                            {
                                var dbField = dbFields.FirstOrDefault(f => f.FieldName.Equals(rowfield.Name, StringComparison.OrdinalIgnoreCase));

                                var FieldComparisonInfo = new FieldComparisonInfo { RowField = rowfield, DBField = dbField };
                                TableComparisonInfo.FieldComparisonInfos.Add(FieldComparisonInfo);


                            }
                        }
                        //query test
                        try
                        {
                            var query = new SqlQuery().Dialect(dialect)
                                .From(rowFields)
                                .SelectTableFields(row)
                                .SelectForeignFields(row)
                                .Take(1);

                            connection.Query(query);
                        }
                        catch (Exception ex) { TableComparisonInfo.Issues += " Error while executing query: " + ex.Message; }
                    }


                }


            }
            #endregion

            #region Form
            //Issues.Add("---------------------------");
            //Issues.Add("---------------------------");
            //var formClasses = assembly.GetTypes().Where(w => w.GetCustomAttribute<FormScriptAttribute>() != null && w.GetCustomAttribute<BasedOnRowAttribute>() != null);

            //foreach (var formClass in formClasses)
            //{
            //    var basedOnRowType = formClass.GetCustomAttribute<BasedOnRowAttribute>().RowType;
            //    Row basedOnRow = (Row)Activator.CreateInstance(basedOnRowType);
            //    var rowFields = basedOnRow.GetFields();

            //    for (int i = 0; i < basedOnRow.FieldCount; i++)
            //    {
            //        Field rowfield = rowFields[i];

            //        if (rowfield.Flags.HasFlag(FieldFlags.NotNull) && !rowfield.Flags.HasFlag(FieldFlags.Identity))
            //        {
            //            var propInfo = formClass.GetProperty(rowfield.PropertyName);

            //            if (propInfo == null)
            //            {
            //                Issues.Add($"{Issues.Count + 1}. {rowfield.Type} {rowfield.PropertyName} is [NotNull] in {basedOnRowType.Name} but not in {formClass.Name}");
            //            }
            //        }
            //    }

            //}
            #endregion
        }
    }


    public class TableComparisonInfo
    {
        public string ConnectionKey { get; set; }
        public string RowClassName { get; set; }
        public string TableName { get; set; }

        public IRow Row { get; set; }

        public bool HasIssue
        {
            get
            {
                if (Issues.Length > 0) return true;
                else if (FieldComparisonInfos.Any(f => f.HasIssue)) return true;
                else return false;
            }
        }
        public string Issues { get; set; } = String.Empty;

        public List<FieldComparisonInfo> FieldComparisonInfos { get; set; } = new List<FieldComparisonInfo>();

        public string CssClass
        {
            get
            {
                if (Issues.Length > 0) return "danger";
                else if (FieldComparisonInfos.Any(f => f.Issues.Exists(i => i.GetCssClass() == "danger"))) return "danger";
                else if (FieldComparisonInfos.Any(f => f.Issues.Exists(i => i.GetCssClass() == "warning"))) return "warning";
                else return "default";
            }
        }

        public int SortOrder
        {
            get
            {
                if (Issues.Length > 0) return 1;
                else if (FieldComparisonInfos.Any(f => f.Issues.Exists(i => i.GetCssClass() == "danger"))) return 2;
                else if (FieldComparisonInfos.Any(f => f.Issues.Exists(i => i.GetCssClass() == "warning"))) return 3;
                else return 4;
            }
        }


    }

    public class FieldComparisonInfo
    {
        public string Name => RowField.Name;
        public Field RowField { get; set; }
        public Serenity.Data.Schema.FieldInfo DBField { get; set; }

        public bool HasIssue { get { return Issues.Count > 0; } }

        private List<FieldComparisonIssue> _Issues;
        public List<FieldComparisonIssue> Issues
        {
            get
            {
                if (_Issues == null)
                {
                    _Issues = new List<FieldComparisonIssue>();

                    if (DBField == null)
                        _Issues.Add(FieldComparisonIssue.NotFoundInDB);
                    else
                    {
                        var rowfieldTypeName = RowField.Type.ToString();

                        if (rowfieldTypeName == "Object") rowfieldTypeName = "String";

                        if (rowfieldTypeName != SchemaHelper.SqlTypeNameToFieldType(DBField.DataType, DBField.Size, DBField.Scale))
                            _Issues.Add(FieldComparisonIssue.DataTypeMismatch);

                        if (DBField.IsNullable == false
                            && RowField.Flags.HasFlag(FieldFlags.NotNull) == false
                            && !RowField.DefaultValue.HasValue())
                            _Issues.Add(FieldComparisonIssue.NullableMismatch);

                        if (DBField.IsNullable
                            && RowField.Flags.HasFlag(FieldFlags.NotNull))
                            _Issues.Add(FieldComparisonIssue.NullableMismatch);

                        if (DBField.IsNullable && RowField.Type == FieldType.Boolean)
                            _Issues.Add(FieldComparisonIssue.ShouldBeNotNullInDB);
                    }
                }

                return _Issues;
            }
        }

    }

    public enum FieldComparisonIssue
    {
        [Description("DataType"), CssClass("danger")]
        DataTypeMismatch = 1,
        [Description("Nullable"), CssClass("warning")]
        NullableMismatch = 2,
        [Description("Size"), CssClass("danger")]
        SizeMismatch = 3,
        [Description("Should be [NotNull, DefaultValue(1 OR 0)] in DB"), CssClass("default")]
        ShouldBeNotNullInDB = 4,
        [Description("Not Found In DB"), CssClass("danger")]
        NotFoundInDB = 5
    }
}