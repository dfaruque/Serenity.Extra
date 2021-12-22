//DFA
namespace _Ext.Entities
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;
    using System;
    using System.ComponentModel;
    using System.IO;

    [ConnectionKey("Log"), TableName("[AuditLog]")]
    [DisplayName("Audit Log"), InstanceName("Audit Log"), TwoLevelCached]
    [ReadPermission("Administration:AuditLog")]
    [ModifyPermission("Administration:AuditLog")]
    public sealed class AuditLogRow : Row, IIdRow, INameRow
    {
        [DisplayName("Id"), Identity, NotNull]
        public Int64? Id { get { return Fields.Id[this]; } set { Fields.Id[this] = value; } }

        [DisplayName("User"), NotNull, QuickFilter]
        [LookupEditor("Administration.User")]
        public Int64? UserId { get { return Fields.UserId[this]; } set { Fields.UserId[this] = value; } }

        [DisplayName("Action Type"), NotNull, QuickFilter]
        [AuditLogActionTypeFormatter]
        public AuditActionType? ActionType { get { return (AuditActionType?)Fields.ActionType[this]; } set { Fields.ActionType[this] = (int?)value; } }

        [DisplayName("Action Date"), NotNull, QuickFilter]
        [DateTimeEditor, DateTimeFiltering, DateTimeFormatter]
        public DateTime? ActionDate { get { return Fields.ActionDate[this]; } set { Fields.ActionDate[this] = value; } }

        [DisplayName("Table Name"), Size(100), Column("TableName"), NotNull, QuickFilter, QuickSearch]
        public String EntityTableName { get { return Fields.EntityTableName[this]; } set { Fields.EntityTableName[this] = value; } }

        [DisplayName("Entity Id"), NotNull]
        public Int64? EntityId { get { return Fields.EntityId[this]; } set { Fields.EntityId[this] = value; } }
        
        [DisplayName("Changes")]
        public String Changes { get { return Fields.Changes[this]; } set { Fields.Changes[this] = value; } }

        [DisplayName("IP Address"), Size(100)]
        public String IpAddress { get { return Fields.IpAddress[this]; } set { Fields.IpAddress[this] = value; } }

        [DisplayName("Session Id"), Size(100)]
        public String SessionId { get { return Fields.SessionId[this]; } set { Fields.SessionId[this] = value; } }
        
        #region Foreign Fields
        #endregion Foreign Fields


        public class RowFields : RowFieldsBase
        {
            public Int64Field Id;
            public Int64Field UserId;
            public Int32Field ActionType;
            public DateTimeField ActionDate;
            public StringField EntityTableName;
            public Int64Field EntityId;
            public StringField Changes;
            public StringField IpAddress;
            public StringField SessionId;

            public RowFields() : base()
            {
                LocalTextPrefix = "_Ext.AuditLog";
            }
        }
        IIdField IIdRow.IdField { get { return Fields.Id; } }

        StringField INameRow.NameField { get { return Fields.EntityTableName; } }

        public static readonly RowFields Fields = new RowFields().Init();

        public AuditLogRow() : base(Fields) { }

    }
}