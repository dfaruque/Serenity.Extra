//DFA
namespace _Ext.Entities
{
    using System;
    using System.ComponentModel;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Data.Mapping;

    [ConnectionKey("Default"), TableName("[AuditLog]")]
    [DisplayName("Audit Log"), InstanceName("Audit Log"), TwoLevelCached]
    [ReadPermission("Administration:AuditLog")]
    [ModifyPermission("Administration:AuditLog")]
    public sealed class AuditLogRow : Row<AuditLogRow.RowFields>, IIdRow, INameRow
    {
        [DisplayName("Id"), Identity, NotNull, IdProperty]
        public Int64? Id { get => Fields.Id[this]; set => Fields.Id[this] = value; }

        [DisplayName("User"), NotNull, QuickFilter]
        [LookupEditor("Administration.User")]
        public String UserId { get => Fields.UserId[this]; set => Fields.UserId[this] = value; }

        [DisplayName("Action Type"), NotNull, QuickFilter]
        [AuditLogActionTypeFormatter]
        public AuditActionType? ActionType { get => Fields.ActionType[this]; set => Fields.ActionType[this] = value; }

        [DisplayName("Action Date"), NotNull, QuickFilter]
        [DateTimeEditor, DateTimeFiltering, DateTimeFormatter]
        public DateTime? ActionDate { get => Fields.ActionDate[this]; set => Fields.ActionDate[this] = value; }

        [DisplayName("Table Name"), Size(100), Column("TableName"), NotNull, QuickFilter, QuickSearch, NameProperty]
        public String EntityTableName { get => Fields.EntityTableName[this]; set => Fields.EntityTableName[this] = value; }

        [DisplayName("Entity Id"), NotNull, QuickFilter]
        public String EntityId { get => Fields.EntityId[this]; set => Fields.EntityId[this] = value; }

        [DisplayName("Changes")]
        public String Changes { get => Fields.Changes[this]; set => Fields.Changes[this] = value; }

        [DisplayName("IP Address"), Size(100)]
        public String IpAddress { get { return Fields.IpAddress[this]; } set { Fields.IpAddress[this] = value; } }

        [DisplayName("Session Id"), Size(100)]
        public String SessionId { get => Fields.SessionId[this]; set => Fields.SessionId[this] = value; }

        [DisplayName("Requested URI"), Size(100)]
        public String RequestedURI { get => Fields.RequestedURI[this]; set => Fields.RequestedURI[this] = value; }
        

        public class RowFields : RowFieldsBase
        {
            public Int64Field Id;
            public StringField UserId;
            public EnumField<AuditActionType> ActionType;
            public DateTimeField ActionDate;
            public StringField EntityTableName;
            public StringField EntityId;
            public StringField Changes;
            public StringField IpAddress;
            public StringField SessionId;
            public StringField RequestedURI;
        }

        public AuditLogRow() : base(Fields) { }
    }
}