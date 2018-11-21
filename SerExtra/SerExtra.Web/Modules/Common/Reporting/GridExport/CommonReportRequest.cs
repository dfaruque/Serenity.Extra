
namespace _Ext.Reports
{
    using Serenity.ComponentModel;
    using Serenity.Data.Mapping;
    using Serenity.Services;
    using System;
    using System.ComponentModel;


    public class CommonReportRequest : _Ext.ListReportRequest
    {
        public String ColumnKey { get; set; }
    }
}