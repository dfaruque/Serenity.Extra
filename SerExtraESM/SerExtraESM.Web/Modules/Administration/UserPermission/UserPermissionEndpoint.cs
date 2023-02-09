using System.Data;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Serenity.Abstractions;
using Serenity.Data;
using Serenity.Services;
using MyRepository = SerExtraESM.Administration.Repositories.UserPermissionRepository;
using MyRow = SerExtraESM.Administration.UserPermissionRow;

namespace SerExtraESM.Administration.Endpoints
{
    [Route("Services/Administration/UserPermission/[action]")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class UserPermissionController : ServiceEndpoint
    {
        [HttpPost, AuthorizeUpdate(typeof(MyRow))]
        public SaveResponse Update(IUnitOfWork uow, UserPermissionUpdateRequest request)
        {
            return new MyRepository(Context).Update(uow, request);
        }

        public ListResponse<MyRow> List(IDbConnection connection, UserPermissionListRequest request)
        {
            return new MyRepository(Context).List(connection, request);
        }

        public ListResponse<string> ListRolePermissions(IDbConnection connection, UserPermissionListRequest request)
        {
            return new MyRepository(Context).ListRolePermissions(connection, request);
        }

        public ListResponse<string> ListPermissionKeys(
            [FromServices] ISqlConnections sqlConnections,
            [FromServices] ITypeSource typeSource)
        {
            return new ListResponse<string>
            {
                Entities = MyRepository.ListPermissionKeys(Cache, sqlConnections, typeSource,
                    includeRoles: false).ToList()
            };
        }
    }
}