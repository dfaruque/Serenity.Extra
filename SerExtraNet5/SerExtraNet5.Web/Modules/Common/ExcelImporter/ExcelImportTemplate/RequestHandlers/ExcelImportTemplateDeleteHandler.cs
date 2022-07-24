using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = _Ext.ExcelImporter.ExcelImportTemplateRow;

namespace _Ext.ExcelImporter
{
    public interface IExcelImportTemplateDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

    public class ExcelImportTemplateDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IExcelImportTemplateDeleteHandler
    {
        public ExcelImportTemplateDeleteHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}