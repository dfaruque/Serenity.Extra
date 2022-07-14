using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<SerExtraNet5.Common.ExcelImportTemplateRow>;
using MyRow = SerExtraNet5.Common.ExcelImportTemplateRow;

namespace SerExtraNet5.Common
{
    public interface IExcelImportTemplateListHandler : IListHandler<MyRow, MyRequest, MyResponse> {}

    public class ExcelImportTemplateListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IExcelImportTemplateListHandler
    {
        public ExcelImportTemplateListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}