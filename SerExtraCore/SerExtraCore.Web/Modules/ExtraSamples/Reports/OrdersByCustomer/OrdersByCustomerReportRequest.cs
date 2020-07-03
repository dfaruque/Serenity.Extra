
namespace SerExtraCore.ExtraSamples
{
    using _Ext;
    using Serenity.ComponentModel;
    using Serenity.Services;
    using SerExtraCore.Northwind.Entities;
    using System;
    using System.ComponentModel;

    [FormScript("ExtraSamples.OrdersByCustomerReportRequestForm")]
    public class OrdersByCustomerReportRequestForm
    {
        [DisplayName("Customer"), Required]
        [LookupEditor(typeof(CustomerRow))]
        public String CustomerId { get; set; }
    }

    public class OrdersByCustomerReportRequest : ServiceRequest
    {
        public String CustomerId { get; set; }
    }
}