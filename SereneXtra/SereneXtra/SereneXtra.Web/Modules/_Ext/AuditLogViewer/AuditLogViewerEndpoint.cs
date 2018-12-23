
namespace _Ext.Endpoints
{
    using _Ext.Entities;
    using Serenity.Data;
    using Serenity.Services;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Linq;
#if ASPNETCORE
    using Microsoft.AspNetCore.Mvc;
    [Route("Services/AuditLogViewer/[action]")]
#else
    using System.Web.Mvc;
    [RoutePrefix("Services/AuditLogViewer"), Route("{action}")]
#endif

    [ConnectionKey(typeof(AuditLogRow))]
    public partial class AuditLogViewerController : ServiceEndpoint
    {
        public AuditLogViewerResponse List(IDbConnection connection, AuditLogViewerRequest request)
        {
            var response = new AuditLogViewerResponse();

            var rowType = Q.GetRowTypeByFormKey(request.FormKey);
            string connectionKey = Q.GetConnectionKeyByRowType(rowType);
            string tableName = Q.GetTableNameByRowType(rowType);
            var fld = AuditLogRow.Fields;

            response.EntityVersions = connection.List<AuditLogRow>(fld.EntityTableName == tableName
                && fld.EntityId == request.EntityId).ToList();


            return response;
        }


    }

    public class AuditLogViewerRequest : ServiceRequest
    {
        public string FormKey { get; set; }
        public long EntityId { get; set; }
    }

    public class AuditLogViewerResponse : ServiceResponse
    {
        public List<AuditLogRow> EntityVersions { get; set; }

    }

}
