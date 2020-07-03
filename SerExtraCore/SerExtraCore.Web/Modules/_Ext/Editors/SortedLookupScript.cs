using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Web;
using System.ComponentModel;
using System.Linq;

namespace ICBS_BREB
{
    public class SortedLookupScript<TRow> : RowLookupScript<TRow>
        where TRow : Row, new()
    {
        protected override void ApplyOrder(SqlQuery query)
        {
            base.ApplyOrder(query);

            var r = new TRow();
            var firstSortOrder = r.GetFields().SortOrders.FirstOrDefault();

            if (firstSortOrder != null)
            {
                query.OrderByFirst(firstSortOrder.Item1.Expression, firstSortOrder.Item2);
            }
        }
    }
}