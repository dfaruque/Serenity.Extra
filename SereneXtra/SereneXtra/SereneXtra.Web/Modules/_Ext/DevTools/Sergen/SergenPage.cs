
namespace _Ext.DevTools.Pages
{
    using Serenity.Web;
    using System.Net;
    using System.Web;
#if ASPNETCORE
    using Microsoft.AspNetCore.Mvc;
    [Route("DevTools/Sergen/[action]")]
#else
    using System.Web.Mvc;
    [RoutePrefix("DevTools/Sergen"), Route("{action}")]
#endif

    [PageAuthorize("DevTools:Sergen")]
    public class SergenController : Controller
    {
        public ActionResult Index()
        {
            //if (!Request.IsLocal)
            //    return View("~/Modules/_Ext/DevTools/Sergen/SergenError.cshtml");
                
            return View("~/Modules/_Ext/DevTools/Sergen/SergenIndex.cshtml");
        }
    }
}
