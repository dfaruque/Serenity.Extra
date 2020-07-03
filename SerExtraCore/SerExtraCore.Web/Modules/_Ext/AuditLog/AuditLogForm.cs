
namespace _Ext.Forms
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using System;
    using System.ComponentModel;
    using System.Collections.Generic;
    using System.IO;

    [FormScript("_Ext.AuditLog")]
    [BasedOnRow(typeof(Entities.AuditLogRow))]
    public class AuditLogForm
    {
        [ReadOnly(true)]
        public String EntityTableName { get; set; }
        [ReadOnly(true)]
        public Int32 VersionNo { get; set; }
        [ReadOnly(true)]
        public Int32 UserId { get; set; }
        [ReadOnly(true)]
        public AuditActionType ActionType { get; set; }
        [ReadOnly(true)]
        public DateTime ActionDate { get; set; }
        [ReadOnly(true)]
        public Int32 EntityId { get; set; }
        [ReadOnly(true)]
        public String OldEntity { get; set; }
        [ReadOnly(true)]
        public String NewEntity { get; set; }
        [OneWay, StaticTextBlock(IsHtml = true)]
        public String Differences { get; set; }
        [ReadOnly(true)]
        public String IpAddress { get; set; }
        [ReadOnly(true)]
        public String SessionId { get; set; }
    }
}