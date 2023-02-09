﻿using System.Data;
using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Services;
using MyRepository = SerExtraESM.Administration.Repositories.UserRoleRepository;
using MyRow = SerExtraESM.Administration.UserRoleRow;

namespace SerExtraESM.Administration.Endpoints
{
    [Route("Services/Administration/UserRole/[action]")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class UserRoleController : ServiceEndpoint
    {
        [HttpPost, AuthorizeUpdate(typeof(MyRow))]
        public SaveResponse Update(IUnitOfWork uow, UserRoleUpdateRequest request)
        {
            return new MyRepository(Context).Update(uow, request);
        }

        public UserRoleListResponse List(IDbConnection connection, UserRoleListRequest request)
        {
            return new MyRepository(Context).List(connection, request);
        }
    }
}