
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
    using System.IO;
    using System.Web.Hosting;

    [RoutePrefix("DatabaseExplorer"), Route("{action=index}")]
    [PageAuthorize("DevTools:DatabaseExplorer")]
    public class DatabaseExplorerController : Controller
    {
        [Authorize, HttpGet]
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/DevTools/DatabaseExplorer/DatabaseExplorerIndex.cshtml");
        }

    }
}
