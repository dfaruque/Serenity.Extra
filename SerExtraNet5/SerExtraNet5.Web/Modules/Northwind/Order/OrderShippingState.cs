using Serenity.ComponentModel;
using System.ComponentModel;

namespace SerExtraNet5.Northwind
{
    [EnumKey("Northwind.OrderShippingState")]
    public enum OrderShippingState
    {
        [Description("Not Shipped")]
        NotShipped = 0,
        [Description("Shipped")]
        Shipped = 1
    }
}