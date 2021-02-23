using Serenity.Services;

namespace SerExtraNet5.Northwind
{
    public class OrderListRequest : ListRequest
    {
        public int? ProductID { get; set; }
    }
}