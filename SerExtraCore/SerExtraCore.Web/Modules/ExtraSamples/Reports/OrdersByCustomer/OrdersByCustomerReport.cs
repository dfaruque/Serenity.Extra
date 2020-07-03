namespace SerExtraCore.ExtraSamples
{
    using _Ext;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.Reporting;
    using Serenity.Services;
    using SerExtraCore.Northwind.Entities;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;

    [Report("ExtraSamples.OrdersByCustomerReport")]
    [ReportDesign(MVC.Views.ExtraSamples.Reports.OrdersByCustomer.OrdersByCustomerReport)]
    public class OrdersByCustomerReport : ListReportBase, IReport
    {
        public new OrdersByCustomerReportRequest Request { get; set; }

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

}