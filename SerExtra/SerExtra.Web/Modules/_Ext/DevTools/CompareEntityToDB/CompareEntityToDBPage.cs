
namespace _Ext.DevTools.Pages
{
    using Serenity;
    using Serenity.Data;
    using System;
    using System.Linq;
    using System.Reflection;
    using Serenity.Data.Mapping;
    using Serenity.Web;
#if COREFX
    using Microsoft.AspNetCore.Mvc;
#else
    using System.Web.Mvc;
    [RoutePrefix("CompareEntityToDB"), Route("{action=index}")]
#endif

    [PageAuthorize("DevTools:CompareEntityToDB")]
    public class CompareEntityToDBController : Controller
    {
#if COREFX
        [Route("CompareEntityToDB")]
#endif
        [HttpGet]
        public ActionResult Index()
        {
            var model = new Model.CompareEntityToDBPageModel();

            return View("~/Modules/_Ext/DevTools/CompareEntityToDB/CompareEntityToDBIndex.cshtml", model);
        }
    }
}
