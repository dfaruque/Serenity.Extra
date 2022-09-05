
namespace SerExtraNet5.Northwind.Columns
{
    using Serenity.ComponentModel;
    using System;
    using System.ComponentModel;

    [ColumnsScript("ExtraSamples.MainGridInlineEditing")]
    [BasedOnRow(typeof(Entities.ProductRow), CheckNames = true)]
    public class MainGridInlineEditingColumns
    {
        [EditLink, DisplayName("Db.Shared.RecordId"), AlignRight, Hidden]
        public String ProductID { get; set; }
        public String ProductName { get; set; }
        public Boolean Discontinued { get; set; }
        public Int32 SupplierID { get; set; }
        public Int32 CategoryID { get; set; }
        public String QuantityPerUnit { get; set; }
        public Decimal UnitPrice { get; set; }
        public Int16 UnitsInStock { get; set; }
        public Int16 UnitsOnOrder { get; set; }
        public Int16 ReorderLevel { get; set; }
    }
}