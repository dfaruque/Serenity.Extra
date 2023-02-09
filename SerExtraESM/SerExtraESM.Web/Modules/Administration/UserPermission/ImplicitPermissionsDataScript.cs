using System;
using System.Collections.Generic;
using Microsoft.Extensions.Caching.Memory;
using Serenity.Abstractions;
using Serenity.ComponentModel;
using Serenity.Web;
using SerExtraESM.Administration.Repositories;

namespace SerExtraESM.Administration
{
    [DataScript("Administration.ImplicitPermissions", Permission = PermissionKeys.Security)]
    public class ImplicitPermissionsDataScript : DataScript<IDictionary<string, HashSet<string>>>
    {
        private readonly IMemoryCache cache;
        private readonly ITypeSource typeSource;

        public ImplicitPermissionsDataScript(IMemoryCache cache, ITypeSource typeSource)
        {
            this.cache = cache ?? throw new ArgumentNullException(nameof(cache));
            this.typeSource = typeSource ?? throw new ArgumentNullException(nameof(typeSource));
        }

        protected override IDictionary<string, HashSet<string>> GetData()
        {
            return UserPermissionRepository.GetImplicitPermissions(cache, typeSource);
        }
    }
}