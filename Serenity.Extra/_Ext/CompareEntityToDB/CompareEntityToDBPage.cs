
namespace _Ext.Pages
{
    using Serenity;
    using Serenity.Data;
    using System;
    using System.Web.Mvc;
    using System.Linq;
    using System.Reflection;
    using Serenity.Data.Mapping;

    [RoutePrefix("CompareEntityToDB"), Route("{action=index}")]
    public class CompareEntityToDBController : Controller
    {
        [Authorize, HttpGet]
        public ActionResult Index()
        {
            var model = new Model.CompareEntityToDBPageModel();

            return View("~/Modules/_Ext/CompareEntityToDB/CompareEntityToDBIndex.cshtml", model);
        }
    }
}
