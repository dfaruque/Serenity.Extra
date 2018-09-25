
namespace SerExtra.ExtraSamples.Pages
{
    using MVC;
    using System.Web.Mvc;

    [Authorize, RoutePrefix("ExtraSamples"), Route("{action=index}")]
    public partial class ExtraSamplesController : Controller
    {
        public ActionResult MainGridInlineEditing()
        {
            return View(Views.ExtraSamples.MainGridInlineEditing.Index);
        }

    }
}
