
namespace Ext.DevTools.Pages
{
    using Microsoft.AspNetCore.Mvc;
    using Serenity;
    using Serenity.Web;

    [PageAuthorize("DevTools:EnumExproler")]
    public class EnumExprolerController : Controller
    {
        [Route("EnumExproler")]
        [HttpGet]
        public ActionResult Index([FromServices] ITextLocalizer localizer)
        {
            var model = new Model.EnumExprolerPageModel(localizer);

            return View("~/Modules/Common/Ext/DevTools/EnumExproler/EnumExprolerIndex.cshtml", model);
        }
    }
}
