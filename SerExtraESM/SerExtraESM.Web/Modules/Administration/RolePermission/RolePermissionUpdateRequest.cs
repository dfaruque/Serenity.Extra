using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Serenity.Services;

namespace SerExtraESM.Administration
{
    public class RolePermissionUpdateRequest : ServiceRequest
    {
        public Int32? RoleID { get; set; }
        [JsonProperty(Required = Required.AllowNull)]
        public string Module { get; set; }
        [JsonProperty(Required = Required.AllowNull)]
        public string Submodule { get; set; }
        public List<string> Permissions { get; set; }
    }
}