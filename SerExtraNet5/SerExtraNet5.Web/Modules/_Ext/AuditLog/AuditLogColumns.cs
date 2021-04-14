
namespace _Ext.Columns
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [ColumnsScript("_Ext.AuditLog")]
    [BasedOnRow(typeof(Entities.AuditLogRow))]
    public class AuditLogColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight, Hidden]
        public Int64 Id { get; set; }
        public String EntityTableName { get; set; }
        [EditLink]
        public Int32 VersionNo { get; set; }
        [Width(200, Min = 150)]
        public Int32 UserId { get; set; }
        public AuditActionType ActionType { get; set; }
        public DateTime ActionDate { get; set; }
        public Int32 EntityId { get; set; }
        public String IpAddress { get; set; }
    }
}