using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.SaveRequest<_Ext.ExcelImporter.ExcelImportRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = _Ext.ExcelImporter.ExcelImportRow;

namespace _Ext.ExcelImporter
{
    public interface IExcelImportSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

    public class ExcelImportSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IExcelImportSaveHandler
    {
        public ExcelImportSaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}