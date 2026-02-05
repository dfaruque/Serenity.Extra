using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.Web;
using System.Collections.Generic;
using System.Linq;

namespace Ext;

public class SortedLookupScript<TRow> : RowLookupScript<TRow> where TRow : class, IRow, new()
{
    public SortedLookupScript(ISqlConnections connections) : base(connections) { }

    protected override void PrepareQuery(SqlQuery query)
    {
        base.PrepareQuery(query);

        var row = (IRow)(query as ISqlQueryExtensible).FirstIntoRow;

        if (row is IIsActiveRow isActiveRow)
            query.Where(isActiveRow.IsActiveField == 1);
    }

    protected override void ApplyOrder(SqlQuery query)
    {
        var row = (IRow)(query as ISqlQueryExtensible).FirstIntoRow;

        var sortOrders = row.GetFields().SortOrders;

        if (sortOrders != null)
        {
            foreach (var sortOrder in sortOrders)
            {
                query.OrderBy(sortOrder.Item1.Expression, sortOrder.Item2);
            }
        }

        base.ApplyOrder(query);
    }
}