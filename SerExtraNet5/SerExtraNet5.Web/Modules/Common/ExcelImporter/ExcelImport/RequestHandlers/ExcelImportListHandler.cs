using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<_Ext.ExcelImporter.ExcelImportRow>;
using MyRow = _Ext.ExcelImporter.ExcelImportRow;

namespace _Ext.ExcelImporter
{
    public interface IExcelImportListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

    public class ExcelImportListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IExcelImportListHandler
    {
        public ExcelImportListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}