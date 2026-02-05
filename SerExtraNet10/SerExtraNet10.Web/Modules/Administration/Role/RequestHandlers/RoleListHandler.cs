using MyRow = SerExtraNet10.Administration.RoleRow;

namespace SerExtraNet10.Administration;

public interface IRoleListHandler : IListHandler<MyRow> { }

public class RoleListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), IRoleListHandler
{
}