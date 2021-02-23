using Serenity.Services;

namespace SerExtraNet5.Administration
{
    public class UserRoleListRequest : ServiceRequest
    {
        public int? UserID { get; set; }
    }
}