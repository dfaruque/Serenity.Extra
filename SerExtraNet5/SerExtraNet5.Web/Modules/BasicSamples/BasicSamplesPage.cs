using Microsoft.AspNetCore.Mvc;
using Serenity.Web;

namespace SerExtraNet5.BasicSamples.Pages
{
    [PageAuthorize, Route("BasicSamples/[action]")]
    public partial class BasicSamplesController : Controller
    {
    }
}
