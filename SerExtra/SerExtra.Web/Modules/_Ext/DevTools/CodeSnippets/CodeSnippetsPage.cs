
namespace _Ext.DevTools.Pages
{
    using Serenity;
    using Serenity.Web;
#if COREFX
    using Microsoft.AspNetCore.Mvc;
#else
    using System.Web.Mvc;
    [RoutePrefix("CodeSnippets"), Route("{action=index}")]
#endif

    [PageAuthorize("DevTools:CodeSnippets")]
    public class CodeSnippetsController : Controller
    {
#if COREFX
        [Route("CodeSnippets")]
#endif
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/DevTools/CodeSnippets/CodeSnippetsIndex.cshtml");
        }
    }
}