using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<SerExtraNet5.Common.ExcelImportRow>;
using MyRow = SerExtraNet5.Common.ExcelImportRow;

namespace SerExtraNet5.Common
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