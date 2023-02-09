using Serenity.Services;

namespace SerExtraESM.Administration
{
    public class UserRoleListRequest : ServiceRequest
    {
        public int? UserID { get; set; }
    }
}