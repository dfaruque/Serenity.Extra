
namespace _Ext.DevTools.Pages
{
    using Serenity;
    using Serenity.Web;
    using Microsoft.AspNetCore.Mvc;

    [PageAuthorize("DevTools:CodeSnippets")]
    public class CodeSnippetsController : Controller
    {
        [Route("CodeSnippets")]
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/DevTools/CodeSnippets/CodeSnippetsIndex.cshtml");
        }
    }
}