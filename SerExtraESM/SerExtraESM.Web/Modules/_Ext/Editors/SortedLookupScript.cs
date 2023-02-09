using Serenity.Data;
using Serenity.Web;
using System.Linq;

namespace _Ext
{
    public class SortedLookupScript<TRow> : RowLookupScript<TRow> where TRow : class, IRow, new()
    {
        public SortedLookupScript(ISqlConnections connections) : base(connections) { }

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