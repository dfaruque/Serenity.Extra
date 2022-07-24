using Serenity;
using Serenity.Web;
using Microsoft.AspNetCore.Mvc;

namespace _Ext.ExcelImporter.Pages
{

    [PageAuthorize(typeof(ExcelImportRow))]
    public class ExcelImportController : Controller
    {
        [Route("Common/ExcelImport")]
        public ActionResult Index()
        {
            return View("~/Modules/Common/ExcelImporter/ExcelImport/ExcelImportIndex.cshtml");
        }
    }
}