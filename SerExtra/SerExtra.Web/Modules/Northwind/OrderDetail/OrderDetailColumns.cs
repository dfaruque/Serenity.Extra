
namespace SerExtra.Northwind.Forms
{
    using Serenity.ComponentModel;
    using System;

    [ColumnsScript("Northwind.OrderDetail")]
    [BasedOnRow(typeof(Entities.OrderDetailRow), CheckNames = true)]
    public class OrderDetailColumns
    {
        public Int32? ProductCategoryID { get; set; }
        [EditLink, Width(200)]
        public String ProductID { get; set; }
        [Width(100)]
        public Decimal UnitPrice { get; set; }
        [Width(100)]
        public Int16 Quantity { get; set; }
        [Width(100)]
        public Double Discount { get; set; }
        [Width(100)]
        public Decimal LineTotal { get; set; }
    }
}