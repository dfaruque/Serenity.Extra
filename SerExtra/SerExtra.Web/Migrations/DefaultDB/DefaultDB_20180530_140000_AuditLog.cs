using FluentMigrator;

namespace SerExtra.Migrations.DefaultDB
{
    [Migration(20180530140000)]
    public class DefaultDB_20180530_140000_AuditLog : AutoReversingMigration
    {
        public override void Up()
        {
            this.CreateTableWithId64("AuditLog", "Id", s => s
                .WithColumn("VersionNo").AsInt32().NotNullable()
                .WithColumn("UserId").AsInt64().NotNullable()
                .WithColumn("ActionType").AsInt32().NotNullable()
                .WithColumn("ActionDate").AsDateTime().NotNullable()
                .WithColumn("TableName").AsString(100).NotNullable()
                .WithColumn("EntityId").AsInt64().NotNullable()
                .WithColumn("OldEntity").AsString(int.MaxValue).Nullable()
                .WithColumn("NewEntity").AsString(int.MaxValue).Nullable()
                .WithColumn("IpAddress").AsString(100).Nullable()
                .WithColumn("SessionId").AsString(100).Nullable()
                );
        }
    }

    [Migration(20211221140002)]
    public class LogDB_20211221_140000_AuditLog_Changes : Migration
    {
        public override void Up()
        {
            Delete.Column("VersionNo")
                .Column("OldEntity")
                .Column("NewEntity")
                .FromTable("AuditLog");

            Alter.Table("AuditLog")
                .AddColumn("Changes").AsString(int.MaxValue).Nullable();
        }

        public override void Down() { }
    }
}