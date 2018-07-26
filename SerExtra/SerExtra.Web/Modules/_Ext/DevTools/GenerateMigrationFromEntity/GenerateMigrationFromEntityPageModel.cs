using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace _Ext.DevTools.Model
{
    public class GenerateMigrationFromEntityPageModel
    {
        public List<string> Migrations { get; set; } = new List<string>();

        public GenerateMigrationFromEntityPageModel()
        {
            var assembly = Assembly.GetAssembly(typeof(GenerateMigrationFromEntityPageModel));

            var rowClasses = assembly.GetTypes().Where(w => w.GetCustomAttribute<ConnectionKeyAttribute>() != null && w.IsSealed);

            foreach (var rowClass in rowClasses)
            {
                Row row = (Row)Activator.CreateInstance(rowClass);

                string tableName = SchemaHelper.GetTableNameOnly(row.Table);
                string schema = SchemaHelper.GetSchemaName(row.Table);

                var rowFields = row.GetFields();

                StringBuilder sb = new StringBuilder();
                sb.Append($@"Create.Table(""{tableName}"")");

                if (!string.IsNullOrWhiteSpace(schema) && schema != "dbo")
                    sb.Append($@".InSchema(""{schema}"")");

                for (int i = 0; i < row.FieldCount; i++)
                {
                    Field rowfield = rowFields[i];
                    if (EntityFieldExtensions.IsTableField(rowfield))
                    {
                        string strNullable = rowfield.Flags.HasFlag(FieldFlags.NotNull) ? ".NotNullable()" : ".Nullable()";
                        string strSize = rowfield.Type == FieldType.String ? rowfield.Size.ToString() : "";

                        sb.AppendLine();
                        sb.Append("<br />");
                        sb.Append($@".WithColumn(""{rowfield.Name}"")");

                        if (rowfield.Type == FieldType.String)
                            sb.Append($@".AsString({(rowfield.Size > 0 ? rowfield.Size : 100)})");
                        else
                            sb.Append($@".As{rowfield.Type.ToString()}()");

                        sb.Append(strNullable);

                        if (rowfield.Flags.HasFlag(FieldFlags.PrimaryKey))
                            sb.Append(".PrimaryKey()");
                        if (rowfield.Flags.HasFlag(FieldFlags.Identity))
                            sb.Append(".Identity()");
                        if (rowfield.Flags.HasFlag(FieldFlags.Unique))
                            sb.Append(".Unique()");


                        if (!string.IsNullOrWhiteSpace(rowfield.ForeignTable))
                        {
                            string foreignTableName = SchemaHelper.GetTableNameOnly(rowfield.ForeignTable);
                            sb.Append($@".ForeignKey(""{foreignTableName}"", ""{rowfield.ForeignField}"")");

                            string foreignSchema = SchemaHelper.GetSchemaName(rowfield.ForeignTable);
                            if (!string.IsNullOrWhiteSpace(foreignSchema) && foreignSchema != "dbo")
                                sb.Append($@".InSchema(""{schema}"")");
                        }
                    }
                }

                sb.Append(";");
                sb.AppendLine();
                sb.Append("<br />&nbsp;");

                Migrations.Add(sb.ToString());

            }
        }
    }
}