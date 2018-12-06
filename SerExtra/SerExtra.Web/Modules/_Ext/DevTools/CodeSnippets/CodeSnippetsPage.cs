
namespace _Ext.DevTools.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("CodeSnippets"), Route("{action=index}")]
    [PageAuthorize("DevTools:CodeSnippets")]
    public class CodeSnippetsController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/DevTools/CodeSnippets/CodeSnippetsIndex.cshtml");
        }
    }
}