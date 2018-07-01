
namespace SerExtra.ExtraSamples.Pages
{
    using Serenity.Web;
    using SerExtra.Northwind.Entities;
    using System.Web.Mvc;

    [RoutePrefix("ExtraSample/OrdersByCustomer"), Route("{action=index}")]
    [PageAuthorize(typeof(OrderRow))]
    public class OrdersByCustomerController : Controller
    {
        public ActionResult Index()
        {
            return View(MVC.Views.ExtraSamples.Reports.OrdersByCustomer.OrdersByCustomerIndex);
        }
    }
}
