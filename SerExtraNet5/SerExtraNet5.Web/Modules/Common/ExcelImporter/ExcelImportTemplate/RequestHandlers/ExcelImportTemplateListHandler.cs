using Serenity;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Data;
using MyRequest = Serenity.Services.ListRequest;
using MyResponse = Serenity.Services.ListResponse<_Ext.ExcelImporter.ExcelImportTemplateRow>;
using MyRow = _Ext.ExcelImporter.ExcelImportTemplateRow;

namespace _Ext.ExcelImporter
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