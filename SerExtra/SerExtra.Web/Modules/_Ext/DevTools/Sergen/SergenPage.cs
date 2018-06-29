
namespace _Ext.DevTools.Pages
{
    using Serenity.Web;
    using System.Net;
    using System.Web;
    using System.Web.Mvc;

    [PageAuthorize("DevTools:Sergen")]
    public class SergenController : Controller
    {
        [Route("DevTools/Sergen")]
        public ActionResult Index()
        {
            if (!Request.IsLocal)
                return View("~/Modules/_Ext/DevTools/Sergen/SergenError.cshtml");
                
            return View("~/Modules/_Ext/DevTools/Sergen/SergenIndex.cshtml");
        }
    }
}
