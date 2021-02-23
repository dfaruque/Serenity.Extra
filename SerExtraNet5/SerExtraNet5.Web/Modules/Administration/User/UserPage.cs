using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace SerExtraNet5.Administration.Pages
{
    [PageAuthorize(typeof(Entities.UserRow))]
    public class UserController : Controller
    {
        [Route("Administration/User")]
        public ActionResult Index()
        {
            return View(MVC.Views.Administration.User.UserIndex);
        }
    }
}