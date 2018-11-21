
namespace SerExtra.Northwind.Endpoints
{
    using _Ext;
    using _Ext.Reports;
    using Serenity.Data;
    using Serenity.Reporting;
    using Serenity.Services;
    using Serenity.Web;
    using System;
    using System.Data;
    using System.Linq;
    using System.Web.Mvc;
    using MyRepository = Repositories.ProductRepository;
    using MyRow = Entities.ProductRow;

    [RoutePrefix("Services/Northwind/Product"), Route("{action}")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class ProductController : ServiceEndpoint
    {
        [HttpPost, AuthorizeCreate(typeof(MyRow))]
        public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return new MyRepository().Create(uow, request);
        }

        [HttpPost, AuthorizeUpdate(typeof(MyRow))]
        public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request)
        {
            return new MyRepository().Update(uow, request);
        }

        [HttpPost, AuthorizeDelete(typeof(MyRow))]
        public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request)
        {
            return new MyRepository().Delete(uow, request);
        }

        public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request)
        {
            return new MyRepository().Retrieve(connection, request);
        }

        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request)
        {
            return new MyRepository().List(connection, request);
        }

        public FileContentResult ListExcel(IDbConnection connection, ListRequest request)
        {
            var data = List(connection, request).Entities;
            var report = new DynamicDataReport(data, request.IncludeColumns, typeof(Columns.ProductColumns));
            var bytes = new ReportRepository().Render(report);
            return ExcelContentResult.Create(bytes, "ProductList_" +
                DateTime.Now.ToString("yyyyMMdd_HHmmss") + ".xlsx");
        }

        //Not done
        public ActionResult ListReport(IDbConnection connection, CommonReportRequest request)
        {
            var entities = List(connection, request).Entities;

            var report = new DynamicDataReport(entities, request.IncludeColumns, typeof(Columns.ProductColumns));
            var reportTitle = typeof(MyRow).CustomAttributes.Where(q => q.AttributeType.Name == "DisplayNameAttribute").FirstOrDefault().ConstructorArguments[0].Value.ToString();

            //var htmlText = new _Ext.Reports.ReportGenerator().RenderHtml(report, typeof(Columns.PmsMeetingdiffCommitteDetailColumns), typeof(List<PmsMeetingdiffCommitteDetailRow>));
            var htmlText = new _Ext.Reports.ReportGenerator().RenderHtml(report);
            var data = new CommonReportModel(connection, request);
            data.ReportBody = htmlText;
            data.ReportTitle = reportTitle;
            return View(MVC.Views.Common.Reporting.GridExport.CommonReport, data);
        }

    }
}