
namespace _Ext.Pages
{
    using Serenity;
    using Serenity.Web;
    using System.Web.Mvc;

    [RoutePrefix("_Ext/AuditLog"), Route("{action=index}")]
    [PageAuthorize(typeof(Entities.AuditLogRow))]
    public class AuditLogController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/AuditLog/AuditLogIndex.cshtml");
        }
    }
}