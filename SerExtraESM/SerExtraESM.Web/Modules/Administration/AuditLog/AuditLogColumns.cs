
namespace _Ext.Columns
{
    using Serenity.ComponentModel;
    using System;
    using System.ComponentModel;

    [ColumnsScript("_Ext.AuditLog")]
    [BasedOnRow(typeof(Entities.AuditLogRow))]
    public class AuditLogColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight, Hidden]
        public Int64 Id { get; set; }
        public String EntityTableName { get; set; }
        public AuditActionType ActionType { get; set; }
        public DateTime ActionDate { get; set; }
        public Int64 EntityId { get; set; }
        [Hidden]
        public String Changes { get; set; }
        [Width(200, Min = 150)]
        public Int64 UserId { get; set; }
        public String IpAddress { get; set; }
        [Hidden]
        public String SessionId { get; set; }
        [Hidden]
        public String RequestedURI { get; set; }
    }
}