using Microsoft.AspNetCore.Mvc;
using Serenity.Web;
using SerExtraNet5.Northwind.Entities;

namespace SerExtraNet5.ExtraSamples.Pages;

[PageAuthorize(typeof(OrderRow))]
public class OrdersByCustomerController : Controller
{
    [Route("ExtraSample/OrdersByCustomer")]
    public ActionResult Index()
    {
        return View(MVC.Views.ExtraSamples.Reports.OrdersByCustomer.OrdersByCustomerIndex);
    }
}
