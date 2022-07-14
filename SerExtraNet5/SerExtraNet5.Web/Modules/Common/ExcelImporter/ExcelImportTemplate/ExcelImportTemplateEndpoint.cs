using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using Serenity;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Data;
using System.Globalization;
using MyRow = SerExtraNet5.Common.ExcelImportTemplateRow;

namespace SerExtraNet5.Common.Endpoints
{
    [Route("Services/Common/ExcelImportTemplate/[action]")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class ExcelImportTemplateController : ServiceEndpoint
    {
        [HttpPost, AuthorizeCreate(typeof(MyRow))]
        public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
            [FromServices] IExcelImportTemplateSaveHandler handler)
        {
            return handler.Create(uow, request);
        }

        [HttpPost, AuthorizeUpdate(typeof(MyRow))]
        public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
            [FromServices] IExcelImportTemplateSaveHandler handler)
        {
            return handler.Update(uow, request);
        }

        [HttpPost, AuthorizeDelete(typeof(MyRow))]
        public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
            [FromServices] IExcelImportTemplateDeleteHandler handler)
        {
            return handler.Delete(uow, request);
        }

        [HttpPost]
        public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
            [FromServices] IExcelImportTemplateRetrieveHandler handler)
        {
            return handler.Retrieve(connection, request);
        }

        [HttpPost]
        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
            [FromServices] IExcelImportTemplateListHandler handler)
        {
            return handler.List(connection, request);
        }

        public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
            [FromServices] IExcelImportTemplateListHandler handler,
            [FromServices] IExcelExporter exporter)
        {
            var data = List(connection, request, handler).Entities;
            var bytes = exporter.Export(data, typeof(Columns.ExcelImportTemplateColumns), request.ExportColumns);
            return ExcelContentResult.Create(bytes, "ExcelImportTemplateList_" +
                DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
        }

        [HttpPost]
        public RetrieveResponse<ExcelMetadata> GetExcelMetadata(IDbConnection connection, ExcelImportRequest request,
            [FromServices] IUploadStorage uploadStorage)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            if (string.IsNullOrWhiteSpace(request.FileName))
                throw new ArgumentNullException(nameof(request.FileName));

            if (!uploadStorage.FileExists(request.FileName))
                throw new ArgumentException("File not found in the server!");

            if (!request.FileName.EndsWith(".xlsx", StringComparison.OrdinalIgnoreCase))
                throw new ArgumentException("The file type not supported! Please save as the file type as .xlsx");

            var excelMetadata = new ExcelMetadata();

            using var ep = new ExcelPackage();
            using (var fs = uploadStorage.OpenFile(request.FileName))
                ep.Load(fs);

            foreach (var worksheet in ep.Workbook.Worksheets)
            {
                var excelSheet = new ExcelSheet { SheetName = worksheet.Name };

                for (var column = 1; column <= worksheet.Dimension.End.Column; column++)
                {
                    var columnName = Convert.ToString(worksheet.Cells[1, column].Value);
                    excelSheet.Columns.Add(columnName);
                }
                excelMetadata.Sheets.Add(excelSheet);
            }

            return new RetrieveResponse<ExcelMetadata> { Entity = excelMetadata };
        }

        [HttpPost]
        public ListResponse<ExcelImportableTable> GetExcelImportableTables()
        {
            return new ListResponse<ExcelImportableTable> {  };
        }

    }
}