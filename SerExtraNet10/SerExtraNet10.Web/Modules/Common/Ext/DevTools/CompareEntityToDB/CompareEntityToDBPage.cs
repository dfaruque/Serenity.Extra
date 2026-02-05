
namespace Ext.DevTools.Pages
{
    using Serenity;
    using Serenity.Data;
    using System;
    using System.Linq;
    using System.Reflection;
    using Serenity.Data.Mapping;
    using Serenity.Web;
    using Microsoft.AspNetCore.Mvc;

    [PageAuthorize("DevTools:CompareEntityToDB")]
    public class CompareEntityToDBController : Controller
    {
        [Route("CompareEntityToDB")]
        [HttpGet]
        public ActionResult Index([FromServices] ISqlConnections sqlConnections)
        {
            var model = new Model.CompareEntityToDBPageModel(sqlConnections);

            return View("~/Modules/Common/Ext/DevTools/CompareEntityToDB/CompareEntityToDBIndex.cshtml", model);
        }
    }
}
