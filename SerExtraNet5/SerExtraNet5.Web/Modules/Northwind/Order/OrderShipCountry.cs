using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Web;
using SerExtraNet5.Northwind.Entities;

namespace SerExtraNet5.Northwind.Lookups
{
    [LookupScript]
    public class OrderShipCountryLookup : RowLookupScript<Entities.OrderRow>
    {
        public OrderShipCountryLookup(ISqlConnections sqlConnections)
            : base(sqlConnections)
        {
            IdField = TextField = OrderRow.Fields.ShipCountry.PropertyName;
        }

        protected override void PrepareQuery(SqlQuery query)
        {
            var fld = OrderRow.Fields;
            query.Distinct(true)
                .Select(fld.ShipCountry)
                .Where(
                    new Criteria(fld.ShipCountry) != "" &
                    new Criteria(fld.ShipCountry).IsNotNull());
        }

        protected override void ApplyOrder(SqlQuery query)
        {
        }
    }
}