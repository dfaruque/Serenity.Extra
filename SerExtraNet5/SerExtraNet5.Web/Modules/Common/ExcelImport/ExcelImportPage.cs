using Serenity;
using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace SerExtraNet5.Common.Pages
{

    [PageAuthorize(typeof(ExcelImportRow))]
    public class ExcelImportController : Controller
    {
        [Route("Common/ExcelImport")]
        public ActionResult Index()
        {
            return View("~/Modules/Common/ExcelImport/ExcelImportIndex.cshtml");
        }
    }
}