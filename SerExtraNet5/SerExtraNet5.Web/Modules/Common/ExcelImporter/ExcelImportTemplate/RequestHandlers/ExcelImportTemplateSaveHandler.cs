using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.SaveRequest<_Ext.ExcelImporter.ExcelImportTemplateRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = _Ext.ExcelImporter.ExcelImportTemplateRow;

namespace _Ext.ExcelImporter
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