using MyRow = SerExtraNet10.Administration.RoleRow;

namespace SerExtraNet10.Administration;

public interface IRoleSaveHandler : ISaveHandler<MyRow> { }

public class RoleSaveHandler(IRequestContext context)
    : SaveRequestHandler<MyRow>(context), IRoleSaveHandler
{
    protected override void InvalidateCacheOnCommit()
    {
        base.InvalidateCacheOnCommit();

        Cache.InvalidateOnCommit(UnitOfWork, UserPermissionRow.Fields);
        Cache.InvalidateOnCommit(UnitOfWork, RolePermissionRow.Fields);
    }
}