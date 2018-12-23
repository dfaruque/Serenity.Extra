
namespace _Ext.Forms
{
    using Serenity.ComponentModel;
    using Serenity.Web;
    using System;
    using System.ComponentModel;

    [FormScript("_Ext.ReplaceRow")]
    public class ReplaceRowForm
    {
        [DisplayName("Deleted Entity"), ReadOnly(true)]
        public string DeletedEntityName { get; set; }
        [DisplayName("Replace With Entity"), EmptyLookupEditor, Required]
        public Int32 ReplaceWithEntityId { get; set; }
    }

}