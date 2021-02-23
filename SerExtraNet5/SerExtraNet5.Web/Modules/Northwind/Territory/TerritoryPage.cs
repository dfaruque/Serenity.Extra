using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace SerExtraNet5.Northwind.Pages
{
    [PageAuthorize(typeof(Entities.TerritoryRow))]
    public class TerritoryController : Controller
    {
        [Route("Northwind/Territory")]
        public ActionResult Index()
        {
            return View(MVC.Views.Northwind.Territory.TerritoryIndex);
        }
    }
}
