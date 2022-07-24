using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<_Ext.ExcelImporter.ExcelImportRow>;
using MyRow = _Ext.ExcelImporter.ExcelImportRow;

namespace _Ext.ExcelImporter
{
    public interface IExcelImportRetrieveHandler : IRetrieveHandler<MyRow, MyRequest, MyResponse> {}

    public class ExcelImportRetrieveHandler : RetrieveRequestHandler<MyRow, MyRequest, MyResponse>, IExcelImportRetrieveHandler
    {
        public ExcelImportRetrieveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}