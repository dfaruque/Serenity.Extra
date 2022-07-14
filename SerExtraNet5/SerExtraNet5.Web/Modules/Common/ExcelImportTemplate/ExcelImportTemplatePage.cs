using Serenity;
using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace SerExtraNet5.Common.Pages
{

    [PageAuthorize(typeof(ExcelImportTemplateRow))]
    public class ExcelImportTemplateController : Controller
    {
        [Route("Common/ExcelImportTemplate")]
        public ActionResult Index()
        {
            return View("~/Modules/Common/ExcelImportTemplate/ExcelImportTemplateIndex.cshtml");
        }
    }
}