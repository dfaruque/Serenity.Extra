
namespace _Ext.Endpoints
{
    using LiteDB;
    using Serenity.Services;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Linq;
    using System.Web.Mvc;

    [RoutePrefix("Services/AuditLogViewer"), Route("{action}")]
    public partial class AuditLogViewerController : ServiceEndpoint
    {
        public AuditLogViewerResponse List(AuditLogViewerRequest request)
        {
            var response = new AuditLogViewerResponse();

            var rowType = Q.GetRowTypeByFormKey(request.FormKey);
            string connectionKey = Q.GetConnectionKeyByRowType(rowType);
            string tableName = Q.GetTableNameByRowType(rowType);

            // Open database (or create if doesn't exist)
            var constr = ConfigurationManager.ConnectionStrings["LogLiteDB"].ConnectionString;
            //if (constr.IsTrimmedEmpty()) return;
            using (var db = new LiteDatabase(constr))
            {

                var collectionName = tableName?.Replace('.', '_');
                var collections = db.GetCollection<VersionInfo>(collectionName);

                response.EntityVersions = collections.Find(x => x.EntityId == request.EntityId).ToList();

            }

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
        public List<VersionInfo> EntityVersions { get; set; }

    }

}
