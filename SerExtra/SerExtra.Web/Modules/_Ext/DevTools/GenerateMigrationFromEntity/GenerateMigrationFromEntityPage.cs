
namespace _Ext.DevTools.Pages
{
    using Serenity;
    using Serenity.Data;
    using System;
    using System.Web.Mvc;
    using System.Linq;
    using System.Reflection;
    using Serenity.Data.Mapping;
    using Serenity.Web;

    [RoutePrefix("GenerateMigrationFromEntity"), Route("{action=index}")]
    [PageAuthorize("DevTools:GenerateMigrationFromEntity")]
    public class GenerateMigrationFromEntityController : Controller
    {
        [Authorize, HttpGet]
        public ActionResult Index()
        {
            var model = new Model.GenerateMigrationFromEntityPageModel();

            return View("~/Modules/_Ext/DevTools/GenerateMigrationFromEntity/GenerateMigrationFromEntityIndex.cshtml", model);
        }
    }
}
