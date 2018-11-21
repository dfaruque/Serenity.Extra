
namespace _Ext.Reports.Endpoints
{
    using _Ext;
    using Serenity;
    using Serenity.Data;
    using Serenity.Services;
    using System.Data;
    using System.Web.Mvc;

    [RoutePrefix("Services/Reports/CommonReport"), Route("{action}")]
    [ConnectionKey("PMS")]
    public class CommonReportController : ServiceEndpoint
    {
        public ActionResult Report(IDbConnection connection, CommonReportRequest request)
        {
            var data = new CommonReportModel(connection, request);

            return View(MVC.Views.Common.Reporting.GridExport.CommonReport, data);
        }

    }
}
