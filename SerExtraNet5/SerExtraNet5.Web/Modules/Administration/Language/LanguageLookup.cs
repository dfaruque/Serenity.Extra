using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Web;
using SerExtraNet5.Administration.Entities;

namespace SerExtraNet5.Administration.Lookups
{
    [LookupScript]
    public sealed class LanguageLookup : RowLookupScript<LanguageRow>
    {
        public LanguageLookup(ISqlConnections sqlConnections)
            : base(sqlConnections)
        {
            IdField = LanguageRow.Fields.LanguageId.PropertyName;
            Permission = "*";
        }

        protected override void PrepareQuery(SqlQuery query)
        {
            base.PrepareQuery(query);

            query.Select(LanguageRow.Fields.LanguageId);
        }
    }
}