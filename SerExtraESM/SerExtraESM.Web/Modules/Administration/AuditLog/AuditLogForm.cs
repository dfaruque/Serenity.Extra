
namespace _Ext.Forms
{
    using Serenity.ComponentModel;
    using System;
    using System.ComponentModel;

    [FormScript("_Ext.AuditLog")]
    [BasedOnRow(typeof(Entities.AuditLogRow))]
    public class AuditLogForm
    {
        [ReadOnly(true)]
        public String EntityTableName { get; set; }
        [ReadOnly(true)]
        public AuditActionType ActionType { get; set; }
        [ReadOnly(true)]
        public DateTime ActionDate { get; set; }
        [ReadOnly(true)]
        public Int32 EntityId { get; set; }
        [StaticTextBlock(IsHtml = true)]
        public String Changes { get; set; }
        [ReadOnly(true)]
        public Int64 UserId { get; set; }
        [ReadOnly(true)]
        public String IpAddress { get; set; }
        [ReadOnly(true)]
        public String SessionId { get; set; }
        [ReadOnly(true)]
        public String RequestedURI { get; set; }
    }
}