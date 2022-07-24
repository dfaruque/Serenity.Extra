using Serenity;
using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace _Ext.ExcelImporter.Pages
{

    [PageAuthorize(typeof(ExcelImportTemplateRow))]
    public class ExcelImportTemplateController : Controller
    {
        [Route("Common/ExcelImportTemplate")]
        public ActionResult Index()
        {
            return View("~/Modules/Common/ExcelImporter/ExcelImportTemplate/ExcelImportTemplateIndex.cshtml");
        }
    }
}