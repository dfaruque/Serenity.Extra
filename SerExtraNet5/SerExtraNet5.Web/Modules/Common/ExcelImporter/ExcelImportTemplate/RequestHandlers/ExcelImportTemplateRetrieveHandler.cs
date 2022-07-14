using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.RetrieveRequest;
using MyResponse = Serenity.Services.RetrieveResponse<SerExtraNet5.Common.ExcelImportTemplateRow>;
using MyRow = SerExtraNet5.Common.ExcelImportTemplateRow;

namespace SerExtraNet5.Common
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