using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<SerExtraNet5.Common.ExcelImportRow>;
using MyRow = SerExtraNet5.Common.ExcelImportRow;

namespace SerExtraNet5.Common
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