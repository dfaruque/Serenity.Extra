using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace SerExtraNet5.ExtraSamples.Pages;

[PageAuthorize, Route("ExtraSamples/[action]")]
public partial class ExtraSamplesController : Controller
{
    public ActionResult MainGridInlineEditing()
    {
        return View(MVC.Views.ExtraSamples.MainGridInlineEditing.Index);
    }

    public ActionResult MainGridMultiEditing()
    {
        return null;
    }

    public ActionResult CustomTemplatedGrid()
    {
        return View(MVC.Views.ExtraSamples.CustomTemplatedGrid.Index);
    }

    public ActionResult ReactSamplePage()
    {
        return View(MVC.Views.ExtraSamples.ReactSamplePage.Index);
    }

}
