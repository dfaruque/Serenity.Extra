namespace SerExtraNet10.Administration.Pages;

[PageAuthorize(typeof(RoleRow))]
public class RolePage : Controller
{
    [Route("Administration/Role")]
    public ActionResult Index()
    {
        return this.GridPage("@/Administration/Role/RolePage",
            RoleRow.Fields.PageTitle());
    }
}