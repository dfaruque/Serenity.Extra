using System.Collections.Generic;
using System.Data;
using _Ext;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using SerExtraNet5.Northwind.Entities;

namespace SerExtraNet5.ExtraSamples;

[Report("ExtraSamples.OrdersByCustomerReport")]
[ReportDesign(MVC.Views.ExtraSamples.Reports.OrdersByCustomer.OrdersByCustomerReport)]
public class OrdersByCustomerReport : ListReportBase, IReport
{
    public new OrdersByCustomerReportRequest Request { get; set; }

    public OrdersByCustomerReport(IRequestContext requestContext, ISqlConnections sqlConnections) 
        : base(requestContext, sqlConnections)
    { }

    public object GetData()
    {
        using (var connection = SqlConnections.NewFor<OrderRow>())
        {
            return new OrdersByCustomerReportModel(connection, Request);
        }
    }
}

public class OrdersByCustomerReportModel : ListReportModelBase
{
    public new OrdersByCustomerReportRequest Request { get; set; }

    public List<OrderRow> OrderRows { get; set; } = new List<OrderRow>();

    public OrdersByCustomerReportModel(IDbConnection connection, OrdersByCustomerReportRequest request)
    {
        Request = request;
        var fld = OrderRow.Fields;

        OrderRows = connection.List<OrderRow>(q => q
        .SelectTableFields()
        .SelectNonTableFields());
        //.Where(fld.CustomerID == request.CustomerId)

   }

}