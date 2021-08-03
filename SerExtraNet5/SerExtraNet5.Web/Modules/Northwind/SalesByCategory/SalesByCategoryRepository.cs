using Serenity.Services;
using System.Data;
using MyRow = SerExtraNet5.Northwind.Entities.SalesByCategoryRow;


namespace SerExtraNet5.Northwind.Repositories
{
    public class SalesByCategoryRepository : BaseRepository
    {
        public SalesByCategoryRepository(IRequestContext context) : base(context) { }

        private static MyRow.RowFields fld { get { return MyRow.Fields; } }

        public ListResponse<MyRow> List(IDbConnection connection, ListRequest request)
        {
            return new MyListHandler(Context).Process(connection, request);
        }

        private class MyListHandler : ListRequestHandler<MyRow>
        {
            public MyListHandler(IRequestContext context) : base(context) { }
        }

    }
}