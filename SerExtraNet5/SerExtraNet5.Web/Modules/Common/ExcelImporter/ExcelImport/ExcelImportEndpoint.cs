using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using Serenity;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using MyRow = SerExtraNet5.Common.ExcelImportRow;

namespace SerExtraNet5.Common.Endpoints
{
    [Route("Services/Common/ExcelImport/[action]")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class ExcelImportController : ServiceEndpoint
    {
        [HttpPost, AuthorizeCreate(typeof(MyRow))]
        public SaveResponse Create(IUnitOfWork uow, SaveRequest<MyRow> request,
            [FromServices] IExcelImportSaveHandler handler)
        {
            return handler.Create(uow, request);
        }

        [HttpPost, AuthorizeUpdate(typeof(MyRow))]
        public SaveResponse Update(IUnitOfWork uow, SaveRequest<MyRow> request,
            [FromServices] IExcelImportSaveHandler handler)
        {
            return handler.Update(uow, request);
        }

        [HttpPost, AuthorizeDelete(typeof(MyRow))]
        public DeleteResponse Delete(IUnitOfWork uow, DeleteRequest request,
            [FromServices] IExcelImportDeleteHandler handler)
        {
            return handler.Delete(uow, request);
        }

        [HttpPost]
        public RetrieveResponse<MyRow> Retrieve(IDbConnection connection, RetrieveRequest request,
            [FromServices] IExcelImportRetrieveHandler handler)
        {
            return handler.Retrieve(connection, request);
        }

        [HttpPost]
        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request,
            [FromServices] IExcelImportListHandler handler)
        {
            return handler.List(connection, request);
        }

        public FileContentResult ListExcel(IDbConnection connection, ListRequest request,
            [FromServices] IExcelImportListHandler handler,
            [FromServices] IExcelExporter exporter)
        {
            var data = List(connection, request, handler).Entities;
            var bytes = exporter.Export(data, typeof(Columns.ExcelImportColumns), request.ExportColumns);
            return ExcelContentResult.Create(bytes, "ExcelImportList_" +
                DateTime.Now.ToString("yyyyMMdd_HHmmss", CultureInfo.InvariantCulture) + ".xlsx");
        }

        [HttpPost]
        public ListResponse<Dictionary<string, object>> GetExcelData(IDbConnection connection, ExcelImportRequest request,
            [FromServices] IExcelImportTemplateRetrieveHandler templateRetriveHandler,
            [FromServices] IUploadStorage uploadStorage)
        {
            ExcelImportRequest.Validate(request, uploadStorage);

            if (request.ExcelImportTemplateId == default)
                throw new ArgumentNullException(nameof(request.ExcelImportTemplateId));

            var excelImportTemplate = templateRetriveHandler.Retrieve(connection, new RetrieveRequest { EntityId = request.ExcelImportTemplateId }).Entity;
            var excelImportTemplateSheet = excelImportTemplate.ExcelMetadata.Sheets.Find(f => f.SheetName == excelImportTemplate.ExcelSheet);

            using var ep = new ExcelPackage();
            using (var fs = uploadStorage.OpenFile(request.FileName))
                ep.Load(fs);

            var worksheet = ep.Workbook.Worksheets[excelImportTemplate.ExcelSheet];

            var inportedExcelColumnHeaders = ExcelHelper.GetColumnHeaders(worksheet);

            //todo: validate excelColumnHeaders with excelImportTemplateSheet

            var excelData = new List<Dictionary<string, object>>();

            for (var rowNumber = 1; rowNumber <= worksheet.Dimension.End.Row; rowNumber++)
            {
                var excelRow = new Dictionary<string, object>();

                for (var column = 1; column <= excelImportTemplateSheet.Columns.Count; column++)
                {
                    var columnName = excelImportTemplateSheet.Columns[column - 1];
                    var cellValue = worksheet.Cells[rowNumber, column].Value;

                    excelRow.Add(columnName, cellValue);
                }

                excelData.Add(excelRow);
            }

            return new ListResponse<Dictionary<string, object>> { Entities = excelData };
        }

    }
}