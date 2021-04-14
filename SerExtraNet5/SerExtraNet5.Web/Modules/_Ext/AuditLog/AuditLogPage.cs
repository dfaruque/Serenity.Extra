
namespace _Ext.Pages
{
    using Serenity;
    using Serenity.Web;
    using Microsoft.AspNetCore.Mvc;

    [PageAuthorize(typeof(Entities.AuditLogRow))]
    public class AuditLogController : Controller
    {
        [Route("_Ext/AuditLog")]
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/AuditLog/AuditLogIndex.cshtml");
        }
    }
}