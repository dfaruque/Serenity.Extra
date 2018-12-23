using FluentMigrator;

namespace SereneXtra.Migrations.DefaultDB
{
    [Migration(20180530140000)]
    public class DefaultDB_20180530_140000_AuditLog : AutoReversingMigration
    {
        public override void Up()
        {
            this.CreateTableWithId64("AuditLog", "Id", s => s
                .WithColumn("VersionNo").AsInt32().NotNullable()
                .WithColumn("UserId").AsInt32().NotNullable()
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
}