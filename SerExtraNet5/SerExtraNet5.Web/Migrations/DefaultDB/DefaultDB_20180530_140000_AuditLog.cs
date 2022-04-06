using FluentMigrator;

namespace SerExtraNet5.Migrations.DefaultDB
{
    [Migration(20180530140000)]
    public class DefaultDB_20180530_140000_AuditLog : AutoReversingMigration
    {
        public override void Up()
        {
            this.CreateTableWithId64("AuditLog", "Id", s => s
                .WithColumn("UserId").AsAnsiString().NotNullable()
                .WithColumn("ActionType").AsInt32().NotNullable()
                .WithColumn("ActionDate").AsDateTime().NotNullable()
                .WithColumn("TableName").AsString(100).NotNullable()
                .WithColumn("EntityId").AsAnsiString().NotNullable()
                .WithColumn("Changes").AsString(int.MaxValue).Nullable()
                .WithColumn("IpAddress").AsString(100).Nullable()
                .WithColumn("SessionId").AsString(100).Nullable()
                .WithColumn("RequestedURI").AsString(2000).Nullable()
                );
        }
    }
}