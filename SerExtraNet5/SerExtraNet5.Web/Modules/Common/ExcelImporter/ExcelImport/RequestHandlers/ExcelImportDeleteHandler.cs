using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = _Ext.ExcelImporter.ExcelImportRow;

namespace _Ext.ExcelImporter
{
    public interface IExcelImportDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> {}

    public class ExcelImportDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IExcelImportDeleteHandler
    {
        public ExcelImportDeleteHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}