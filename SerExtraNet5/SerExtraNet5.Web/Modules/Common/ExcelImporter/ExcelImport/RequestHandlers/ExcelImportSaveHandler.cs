using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.SaveRequest<SerExtraNet5.Common.ExcelImportRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = SerExtraNet5.Common.ExcelImportRow;

namespace SerExtraNet5.Common
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