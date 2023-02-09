using Serenity.Services;
using MyRequest = SerExtraESM.Administration.UserListRequest;
using MyResponse = Serenity.Services.ListResponse<SerExtraESM.Administration.UserRow>;
using MyRow = SerExtraESM.Administration.UserRow;

namespace SerExtraESM.Administration
{
    public interface IUserListHandler : IListHandler<MyRow, MyRequest, MyResponse> { }

    public class UserListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IUserListHandler
    {
        public UserListHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}