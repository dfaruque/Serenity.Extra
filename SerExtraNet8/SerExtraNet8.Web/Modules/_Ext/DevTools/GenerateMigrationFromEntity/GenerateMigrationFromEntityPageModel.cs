using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace _Ext.DevTools.Model
{
    public class GenerateMigrationFromEntityPageModel
    {
        public List<MigrationModel> Migrations { get; set; } = new List<MigrationModel>();

        public GenerateMigrationFromEntityPageModel()
        {
            var assembly = Assembly.GetAssembly(typeof(GenerateMigrationFromEntityPageModel));

            var rowClasses = assembly.GetTypes().Where(w => w.GetCustomAttribute<ConnectionKeyAttribute>() != null && w.IsSealed);

            var migrationNumber = 0;
            foreach (var rowClass in rowClasses)
            {
                IRow row = (IRow)Activator.CreateInstance(rowClass);


                string tableName = SchemaHelper.GetTableNameOnly(row.Table);
                string schema = SchemaHelper.GetSchemaName(row.Table);
                migrationNumber += 10;

                var migrationModel = new MigrationModel
                {
                    RowType = rowClass,
                    SchemaName = schema,
                    TableName = tableName,
                    MigrationNumber = migrationNumber
                };

                var rowFields = row.GetFields();

                StringBuilder sb = new StringBuilder();
                sb.Append($@"Create.Table(""{tableName}"")");

                if (!string.IsNullOrWhiteSpace(schema) && schema != "dbo")
                    sb.Append($@".InSchema(""{schema}"")");

                for (int i = 0; i < row.Fields.Count; i++)
                {
                    Field rowfield = rowFields[i];
                    if (EntityFieldExtensions.IsTableField(rowfield))
                    {
                        string strNullable = rowfield.Flags.HasFlag(FieldFlags.NotNull) ? ".NotNullable()" : ".Nullable()";
                        string strSize = rowfield.Type == FieldType.String ? rowfield.Size.ToString() : "";

                        sb.AppendLine();
                        //sb.Append("<br />");
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
                            string foreignSchema = SchemaHelper.GetSchemaName(rowfield.ForeignTable);

                            migrationModel.ParentTables.Add(foreignTableName);

                            sb.Append($@".ForeignKey(""{foreignTableName}"", ""{rowfield.ForeignField}"")");

                            if (!string.IsNullOrWhiteSpace(foreignSchema) && foreignSchema != "dbo")
                                sb.Append($@".InSchema(""{schema}"")");
                        }
                    }
                }

                sb.Append(";");
                sb.AppendLine();
                sb.AppendLine();

                migrationModel.Migration = sb.ToString();
                if (Migrations.Exists(e => e.TableName == migrationModel.TableName))
                {
                    migrationModel.Remarks += $"//Warning: Duplicate migration found." + Environment.NewLine
                        + $"//TableName: {migrationModel.TableName}." + Environment.NewLine
                        + $"//RowClass: {migrationModel.RowType.FullName}" + Environment.NewLine;

                }

                Migrations.Add(migrationModel);
            }


            //gather parent migrations
            foreach (var migration in Migrations)
            {
                for (int i = 0; i < migration.ParentTables.Count - 1; i++)
                {
                    var parentTable = migration.ParentTables[i];

                    var parentMigration = Migrations.Find(f => f.TableName == parentTable);
                    if (parentMigration != null)
                    {
                        migration.ParentTablesMigrations.Add(parentMigration);
                    }
                    else
                    {
                        migration.Remarks += $"//Warning: {parentTable} has been used as Foreign Table but the corresponding Entity/Row is not found." + Environment.NewLine;
                    }

                    if (migration.MigrationNumber <= migration.MaxParentMigrationNumber)
                        migration.MigrationNumber = migration.MaxParentMigrationNumber + 1;
                }

            }

            //ordering migrations accroding to dependancies
            int arrangementCount = 0; //safety counter
            bool needArrangement = true;
            while (needArrangement && arrangementCount < 10000)
            {
                arrangementCount++;

                var notArrangedMigrations = Migrations.Where(w => w.IsArranged == false);
                foreach (var migration in notArrangedMigrations)
                {
                    var maxNumber = migration.MaxParentMigrationNumber;

                    //while (true)
                    //{
                    //    var parentMigrations = migration.ParentTablesMigrations;
                    //    if (parentMigrations.Count == 0) break;
                    //    foreach (var parentMigration in parentMigrations)
                    //    {
                    //        if (maxNumber < parentMigration.MaxParentMigrationNumber)
                    //            maxNumber = parentMigration.MaxParentMigrationNumber;

                    //    }

                    //}

                    if (migration.MigrationNumber < maxNumber)
                        migration.MigrationNumber = maxNumber + 2;
                }

                needArrangement = Migrations.Exists(w => w.IsArranged == false);
            }


            Migrations = Migrations.OrderBy(o => o.MigrationNumber).ToList();

        }
    }

    public class MigrationModel
    {

        public long MigrationNumber { get; set; } = 1;
        public string PaddedMigrationNumber => "1" + MigrationNumber.ToString().PadLeft(6, '0');
        public Type RowType { get; set; }
        public string SchemaName { get; set; }
        public string TableName { get; set; }
        public List<string> ParentTables { get; set; } = new List<string>();
        public List<MigrationModel> ParentTablesMigrations { get; set; } = new List<MigrationModel>();
        public List<MigrationModel> ChildTablesMigrations { get; set; } = new List<MigrationModel>();
        public string Migration { get; set; }
        public string Remarks { get; set; } = string.Empty;

        public bool IsArranged => MigrationNumber >= MaxParentMigrationNumber;

        public long MaxParentMigrationNumber => ParentTablesMigrations.Count > 0 ? ParentTablesMigrations.Max(m => m.MigrationNumber) : 0;
    }
}