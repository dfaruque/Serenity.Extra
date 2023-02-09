
namespace _Ext.Pages;

using Serenity;
using Serenity.Web;
using Microsoft.AspNetCore.Mvc;
using _Ext.Entities;
using SerExtraESM;

[PageAuthorize(typeof(Entities.AuditLogRow))]
public class AuditLogController : Controller
{
    [Route("_Ext/AuditLog")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/AuditLog/AuditLogPage",
            AuditLogRow.Fields.PageTitle());

    }
}