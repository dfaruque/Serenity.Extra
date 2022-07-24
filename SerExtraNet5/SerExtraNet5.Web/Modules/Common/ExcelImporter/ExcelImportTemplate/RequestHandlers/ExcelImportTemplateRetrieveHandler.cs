using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<_Ext.ExcelImporter.ExcelImportTemplateRow>;
using MyRow = _Ext.ExcelImporter.ExcelImportTemplateRow;

namespace _Ext.ExcelImporter
{
    public interface IExcelImportTemplateRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

    public class ExcelImportTemplateRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IExcelImportTemplateRetrieveHandler
    {
        public ExcelImportTemplateRetrieveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}