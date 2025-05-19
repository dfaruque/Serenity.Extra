using MyRequest = SerExtraNet8.Administration.UserListRequest;
using MyResponse = Serenity.Services.ListResponse<SerExtraNet8.Administration.UserRow>;
using MyRow = SerExtraNet8.Administration.UserRow;

namespace SerExtraNet8.Administration;
public interface IUserListHandler : IListHandler<MyRow, MyRequest, MyResponse> { }

public class UserListHandler : ListRequestHandler<MyRow, MyRequest, MyResponse>, IUserListHandler
{
    public UserListHandler(IRequestContext context)
         : base(context)
    {
    }
}