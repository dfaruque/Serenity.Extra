using Microsoft.AspNetCore.Mvc;
//</if:Northwind>
using Serenity;
using Serenity.Abstractions;
using Serenity.Data;
using Serenity.Web;
using SerExtraNet5.Northwind;
using SerExtraNet5.Northwind.Entities;
using System;

namespace SerExtraNet5.Common.Pages
{
    [Route("Dashboard/[action]")]
    public class DashboardController : Controller
    {
        [PageAuthorize, HttpGet, Route("~/")]
        public ActionResult Index(
            [FromServices] ITwoLevelCache cache,
            [FromServices] ISqlConnections sqlConnections
            )
        {
            if (cache is null)
                throw new ArgumentNullException(nameof(cache));

            if (sqlConnections is null)
                throw new ArgumentNullException(nameof(sqlConnections));

            var cachedModel = cache.GetLocalStoreOnly("DashboardPageModel", TimeSpan.FromMinutes(5),
                OrderRow.Fields.GenerationKey, () =>
                {
                    var model = new DashboardPageModel();
                    var o = OrderRow.Fields;
                    using (var connection = sqlConnections.NewFor<OrderRow>())
                    {
                        model.OpenOrders = connection.Count<OrderRow>(o.ShippingState == (int)OrderShippingState.NotShipped);
                        var closedOrders = connection.Count<OrderRow>(o.ShippingState == (int)OrderShippingState.Shipped);
                        var totalOrders = model.OpenOrders + closedOrders;
                        model.ClosedOrderPercent = (int)Math.Round(totalOrders == 0 ? 100 :
                            ((double)closedOrders / (double)totalOrders * 100));
                        model.CustomerCount = connection.Count<CustomerRow>();
                        model.ProductCount = connection.Count<ProductRow>();
                    }
                    return model;
                });
            return View(MVC.Views.Common.Dashboard.DashboardIndex, cachedModel);
        }
    }
}
