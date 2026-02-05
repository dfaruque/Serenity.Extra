using MyRow = SerExtraNet10.Administration.RoleRow;

namespace SerExtraNet10.Administration;

public interface IRoleRetrieveHandler : IRetrieveHandler<MyRow> { }
public class RoleRetrieveHandler(IRequestContext context)
    : RetrieveRequestHandler<MyRow>(context), IRoleRetrieveHandler
{
}