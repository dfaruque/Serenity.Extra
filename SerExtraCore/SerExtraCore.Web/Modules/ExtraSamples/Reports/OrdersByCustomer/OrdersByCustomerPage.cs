
namespace SerExtraCore.ExtraSamples.Pages
{
    using Serenity.Web;
    using SerExtraCore.Northwind.Entities;
    using Microsoft.AspNetCore.Mvc;

    [PageAuthorize(typeof(OrderRow))]
    public class OrdersByCustomerController : Controller
    {
        [Route("ExtraSample/OrdersByCustomer")]
        public ActionResult Index()
        {
            return View(MVC.Views.ExtraSamples.Reports.OrdersByCustomer.OrdersByCustomerIndex);
        }
    }
}
