using _Ext;
using Serenity.ComponentModel;
using Serenity.Services;
using SerExtraNet5.Northwind.Entities;
using System;
using System.ComponentModel;

namespace SerExtraNet5.ExtraSamples;

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