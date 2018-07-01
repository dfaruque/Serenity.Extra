
namespace SerExtra.Northwind.Forms
{
    using _Ext;
    using Serenity.ComponentModel;
    using System;

    [FormScript("Northwind.Category")]
    [BasedOnRow(typeof(Entities.CategoryRow), CheckNames = true)]
    public class CategoryForm
    {
        public String CategoryName { get; set; }
        public String Description { get; set; }
    }
}