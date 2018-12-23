
namespace _Ext.Pages
{
    using Serenity;
    using Serenity.Web;
#if ASPNETCORE
    using Microsoft.AspNetCore.Mvc;
    [Route("_Ext/AuditLog/[action]")]
#else
    using System.Web.Mvc;
    [RoutePrefix("_Ext/AuditLog"), Route("{action=index}")]
#endif

    [PageAuthorize(typeof(Entities.AuditLogRow))]
    public class AuditLogController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/AuditLog/AuditLogIndex.cshtml");
        }
    }
}