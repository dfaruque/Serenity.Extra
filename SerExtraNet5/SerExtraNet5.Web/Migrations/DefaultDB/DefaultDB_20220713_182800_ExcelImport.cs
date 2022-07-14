using FluentMigrator;

namespace SerExtraNet5.Migrations.DefaultDB
{
    [Migration(20220713_182800)]
    public class DefaultDB_20220713_182800_ExcelImports : AutoReversingMigration
    {
        public override void Up()
        {
            this.CreateTableWithId64("ExcelImportTemplates", "Id", s => s
                .WithColumn("TemplateName").AsString(100).NotNullable()
                .WithColumn("MasterTableName").AsString(100).NotNullable()
                .WithColumn("FieldMappings").AsString(int.MaxValue).Nullable()
                .WithColumn("Remarks").AsString(100).Nullable()
                .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("InsertUserId").AsInt32().NotNullable()
                .WithColumn("UpdateDate").AsDateTime().Nullable()
                .WithColumn("UpdateUserId").AsInt32().Nullable()
                );

            this.CreateTableWithId64("ExcelImports", "Id", s => s
                .WithColumn("TemplateId").AsInt64().NotNullable().ForeignKey("ExcelImportTemplates", "Id")
                .WithColumn("MasterTableName").AsString(100).NotNullable()
                .WithColumn("FieldMappings").AsString(int.MaxValue).Nullable()
                .WithColumn("ImportedExcelFile").AsString(100).NotNullable()
                .WithColumn("ExcelImportStatus").AsInt32().Nullable()
                .WithColumn("ImportedData").AsString(int.MaxValue).Nullable()
                .WithColumn("Remarks").AsString(100).Nullable()
                .WithColumn("InsertDate").AsDateTime().NotNullable().WithDefault(SystemMethods.CurrentDateTime)
                .WithColumn("InsertUserId").AsInt32().NotNullable()
                .WithColumn("UpdateDate").AsDateTime().Nullable()
                .WithColumn("UpdateUserId").AsInt32().Nullable()
                );
        }
    }
}