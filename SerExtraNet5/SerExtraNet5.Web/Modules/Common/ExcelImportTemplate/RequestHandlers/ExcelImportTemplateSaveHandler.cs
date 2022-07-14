using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.SaveRequest<SerExtraNet5.Common.ExcelImportTemplateRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = SerExtraNet5.Common.ExcelImportTemplateRow;

namespace SerExtraNet5.Common
{
    public interface IExcelImportTemplateSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> {}

    public class ExcelImportTemplateSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, IExcelImportTemplateSaveHandler
    {
        public ExcelImportTemplateSaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}