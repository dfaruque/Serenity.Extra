
namespace _Ext.Pages
{
    using Serenity;
    using Serenity.Web;
#if COREFX
    using Microsoft.AspNetCore.Mvc;
#else
    using System.Web.Mvc;
    [RoutePrefix("_Ext/AuditLog"), Route("{action=index}")]
#endif

    [PageAuthorize(typeof(Entities.AuditLogRow))]
    public class AuditLogController : Controller
    {
#if COREFX         
        [Route("_Ext/AuditLog")]
#endif
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/AuditLog/AuditLogIndex.cshtml");
        }
    }
}