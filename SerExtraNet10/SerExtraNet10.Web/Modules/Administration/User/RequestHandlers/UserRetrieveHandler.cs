using MyRow = SerExtraNet10.Administration.UserRow;

namespace SerExtraNet10.Administration;

public interface IUserRetrieveHandler : IRetrieveHandler<MyRow> { }

public class UserRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), IUserRetrieveHandler
{
}