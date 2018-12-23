
namespace _Ext.DevTools.Pages
{
    using Serenity;
    using Serenity.Web;
#if ASPNETCORE
    using Microsoft.AspNetCore.Mvc;
    [Route("CodeSnippets/[action]")]
#else
    using System.Web.Mvc;
    [RoutePrefix("CodeSnippets"), Route("{action=index}")]
#endif

    [PageAuthorize("DevTools:CodeSnippets")]
    public class CodeSnippetsController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/DevTools/CodeSnippets/CodeSnippetsIndex.cshtml");
        }
    }
}