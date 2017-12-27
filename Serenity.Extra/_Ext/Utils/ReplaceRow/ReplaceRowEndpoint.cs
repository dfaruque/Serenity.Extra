
namespace _Ext.Endpoints
{
    using Serenity.Data;
    using Serenity.Services;
    using System.Web.Mvc;

    [RoutePrefix("Services/ReplaceRow"), Route("{action}")]
    public partial class ReplaceRowController : ServiceEndpoint
    {
        public ReplaceRowResponse Replace(ReplaceRowRequest request)
        {
            var response = new ReplaceRowResponse();

            var rowType = Q.GetRowTypeByFormKey(request.FormKey);
            string connectionKey = Q.GetConnectionKeyByRowType(rowType);
            string tableName = Q.GetTableNameByRowType(rowType);

            var connection = SqlConnections.NewByKey(connectionKey);

            //EXEC ReplaceRow TebleName,'Id', ValueToBeDeleted, NewValue;  
            var data = connection.Execute($"ReplaceRow",
                param: new
                {
                    refTableName = tableName,
                    refColName = request.IdProperty,
                    refValue = request.DeletedEntityId,
                    refNewValue = request.ReplaceWithEntityId

                },
                commandType: System.Data.CommandType.StoredProcedure);

            connection.Close();
            connection.Dispose();
            return response;
        }

    }

    public class ReplaceRowRequest : ServiceRequest
    {
        public string FormKey { get; set; }
        public string IdProperty { get; set; }
        public string NameProperty { get; set; }
        public string EntityTypeTitle { get; set; }

        public long DeletedEntityId { get; set; }
        public string DeletedEntityName { get; set; }
        public long ReplaceWithEntityId { get; set; }
    }

    public class ReplaceRowResponse : ServiceResponse
    {

    }

}
