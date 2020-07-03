
namespace SerExtraCore.ExtraSamples.Pages
{
    using MVC;
    using Microsoft.AspNetCore.Mvc;
    using Serenity.Web;

    [PageAuthorize, Route("ExtraSamples/[action]")]
    public partial class ExtraSamplesController : Controller
    {
        public ActionResult MainGridInlineEditing()
        {
            return View(Views.ExtraSamples.MainGridInlineEditing.Index);
        }

        public ActionResult MainGridMultiEditing()
        {
            return View(Views.ExtraSamples.MainGridMultiEditing.Index);
        }

        public ActionResult CustomTemplatedGrid()
        {
            return View(Views.ExtraSamples.CustomTemplatedGrid.Index);
        }

        public ActionResult ReactSamplePage()
        {
            return View(Views.ExtraSamples.ReactSamplePage.Index);
        }

        public ActionResult ChatSamplePage()
        {
            return View(Views.ExtraSamples.Chat.ChatPage);
        }

    }
}
