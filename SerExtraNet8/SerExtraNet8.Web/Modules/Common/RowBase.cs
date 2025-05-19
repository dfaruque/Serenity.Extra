using System;
using System.ComponentModel;
using _Ext;
using Serenity.Data;
using Serenity.Data.Mapping;

namespace SerExtraNet8;

public abstract class RowBase<TFields>
    : Row<TFields>, IInsertLogRow, IUpdateLogRow/*, IAuditLog*/
    where TFields : RowBase<TFields>.RowBaseFields
{
    [DisplayName("Serial"), NotMapped]
    public int? RowNum { get => fields.RowNum[this]; set => fields.RowNum[this] = value; }

    [DisplayName("Insert Date")]
    public DateTime? IDate { get => fields.IDate[this]; set => fields.IDate[this] = value; }

    [DisplayName("Insert User Id"), ForeignKey("[Users]", "Id"), LeftJoin("jIUser")]
    public string IUser { get => fields.IUser[this]; set { fields.IUser[this] = value; } }

    [DisplayName("Update Date")]
    public DateTime? EDate { get => fields.EDate[this]; set { fields.EDate[this] = value; } }

    [DisplayName("Update User Id")]
    public string EUser { get => fields.EUser[this]; set { fields.EUser[this] = value; } }

    public Field InsertUserIdField => fields.IUser;

    public DateTimeField InsertDateField => fields.IDate;

    public Field UpdateUserIdField => fields.EUser;

    public DateTimeField UpdateDateField => fields.EDate;

    public abstract class RowBaseFields : RowFieldsBase
    {
        public Int32Field RowNum;
        public StringField IUser;
        public StringField EUser;
        public DateTimeField IDate;
        public DateTimeField EDate;
    }
}