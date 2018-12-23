
namespace _Ext.DevTools.Pages
{
    using Serenity;
    using Serenity.Data;
    using System;
    using System.Linq;
    using System.Reflection;
    using Serenity.Data.Mapping;
    using Serenity.Web;

#if ASPNETCORE
    using Microsoft.AspNetCore.Mvc;
    [Route("CompareEntityToDB/[action]")]
#else
    using System.Web.Mvc;
    [RoutePrefix("CompareEntityToDB"), Route("{action=index}")]
#endif
    [PageAuthorize("DevTools:CompareEntityToDB")]
    public class CompareEntityToDBController : Controller
    {
        public ActionResult Index()
        {
            var model = new Model.CompareEntityToDBPageModel();

            return View("~/Modules/_Ext/DevTools/CompareEntityToDB/CompareEntityToDBIndex.cshtml", model);
        }
    }
}
