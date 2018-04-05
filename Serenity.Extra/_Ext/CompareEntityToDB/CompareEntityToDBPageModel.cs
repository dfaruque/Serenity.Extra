using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace _Ext.Model
{
    public class CompareEntityToDBPageModel
    {
        public List<string> Issues { get; set; } = new List<string>();

        public CompareEntityToDBPageModel()
        {
            var assembly = Assembly.GetAssembly(typeof(CompareEntityToDBPageModel));

            #region Entity
            var rowClasses = assembly.GetTypes().Where(w => w.GetCustomAttribute<ConnectionKeyAttribute>() != null && w.IsSealed);

            foreach (var rowClass in rowClasses)
            {
                Row row = (Row)Activator.CreateInstance(rowClass);

                var connectionKey = rowClass.GetCustomAttribute<ConnectionKeyAttribute>().Value;

                using (var connection = SqlConnections.NewByKey(connectionKey))
                {
                    var schemaProvider = SchemaHelper.GetSchemaProvider(connection.GetDialect().ServerType);

                    var tableName = row.Table;
                    string schema = null;
                    if (tableName.IndexOf('.') > 0)
                    {
                        schema = tableName.Substring(0, tableName.IndexOf('.')).Trim('[', ']');
                        tableName = tableName.Substring(tableName.IndexOf('.') + 1).Trim('[', ']');
                    }

                    var rowFields = row.GetFields();
                    var dbFields = schemaProvider.GetFieldInfos(connection, schema ?? "dbo", tableName);
                    if (dbFields == null || dbFields.Count() == 0)
                    {
                        Issues.Add($"{Issues.Count + 1}. {row.Table} at Table:  {row.Table}; connection key: {connectionKey} <span class=\"label label-danger\">unable to retrive Table info.</span>");

                    }
                    else
                    {
                        for (int i = 0; i < row.FieldCount; i++)
                        {
                            Field rowfield = rowFields[i];
                            if (EntityFieldExtensions.IsTableField(rowfield))
                            {
                                var dbField = dbFields.FirstOrDefault(f => f.FieldName == rowfield.Name);
                                string strNull = rowfield.Flags.HasFlag(FieldFlags.NotNull) ? "[NotNull]" : "";

                                if (dbField == null)
                                    Issues.Add($"{Issues.Count + 1}. {strNull} {rowfield.Type} {rowfield.Name} at Table:  {row.Table} <span class=\"label label-danger\">no corresponding field in database</span>");
                                else
                                {
                                    string strTypeMismatch = rowfield.Type.ToString() == SchemaHelper.SqlTypeNameToFieldType(dbField.DataType, dbField.Size) ?
                                        "" : "DataType Mismatch";

                                    string strNullableMismatch = dbField.IsNullable == false && rowfield.Flags.HasFlag(FieldFlags.NotNull) == false ?
                                        "Nullable Mismatch" : "";

                                    if (!strNullableMismatch.IsEmptyOrNull() || !strTypeMismatch.IsEmptyOrNull())
                                        Issues.Add($"{Issues.Count + 1}. {strNull} {rowfield.Type} {rowfield.Name} "
                                        + $"at Table: {row.Table} <span class=\"label label-danger\">{strTypeMismatch} {strNullableMismatch}</span>");
                                }
                            }
                        }
                    }

                }


            }
            #endregion

            #region Form
            Issues.Add("---------------------------");
            Issues.Add("---------------------------");
            var formClasses = assembly.GetTypes().Where(w => w.GetCustomAttribute<FormScriptAttribute>() != null && w.GetCustomAttribute<BasedOnRowAttribute>() != null);

            foreach (var formClass in formClasses)
            {
                var basedOnRowType = formClass.GetCustomAttribute<BasedOnRowAttribute>().RowType;
                Row basedOnRow = (Row)Activator.CreateInstance(basedOnRowType);
                var rowFields = basedOnRow.GetFields();

                for (int i = 0; i < basedOnRow.FieldCount; i++)
                {
                    Field rowfield = rowFields[i];

                    if (rowfield.Flags.HasFlag(FieldFlags.NotNull) && !rowfield.Flags.HasFlag(FieldFlags.Identity))
                    {
                        var propInfo = formClass.GetProperty(rowfield.PropertyName);

                        if (propInfo == null)
                        {
                            Issues.Add($"{Issues.Count + 1}. {rowfield.Type} {rowfield.PropertyName} is [NotNull] in {basedOnRowType.Name} but not in {formClass.Name}");
                        }
                    }
                }

            }
            #endregion
        }
    }
}