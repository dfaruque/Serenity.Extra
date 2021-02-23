using Microsoft.AspNetCore.Mvc;
using Serenity.Data;
using Serenity.Services;
using System.Data;
using MyRepository = SerExtraNet5.Northwind.Repositories.SalesByCategoryRepository;
using MyRow = SerExtraNet5.Northwind.Entities.SalesByCategoryRow;

namespace SerExtraNet5.Northwind.Endpoints
{
    [Route("Services/Northwind/SalesByCategory/[action]")]
    [ConnectionKey(typeof(MyRow)), ServiceAuthorize(typeof(MyRow))]
    public class SalesByCategoryController : ServiceEndpoint
    {
        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request)
        {
            return new MyRepository(Context).List(connection, request);
        }
    }
}
