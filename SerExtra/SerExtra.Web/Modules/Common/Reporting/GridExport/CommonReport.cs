
namespace _Ext.Reports
{
    using _Ext;
    using Serenity.Data;
    using Serenity.Reporting;
    using Serenity.Services;
    using System.Collections.Generic;
    using System.Data;
    using System.Text;

    //[Report("Common.CommonReport")]
    //[ReportDesign(MVC.Views.Reports.Common.CommonReport)]
    //public class CommonReport : _Ext.ListReportBase, IReport
    //{
    //    public object GetData()
    //    {
    //        CommonReportModel data;

    //        using (var connection = SqlConnections.NewFor<PmsVillageIntSavingRow>())
    //        {
    //            data = new CommonReportModel(connection, Request);
    //        }
    //        return data;
    //    }
    //}

    public class CommonReportModel
    {
        public string ReportTitle { get; set; }
        public CommonReportRequest Request { get; set; }

        public string ReportBody { get; set; }

        public List<Row> Rows = new List<Row>();

        public CommonReportModel(IDbConnection connection, CommonReportRequest request)
        {
            request.ColumnSelection = ColumnSelection.Details;
            Request = request;

        }
    }
}