using Serenity.Services;

namespace SerExtraCore.Northwind
{
    public class OrderListRequest : ListRequest
    {
        public int? ProductID { get; set; }
    }
}