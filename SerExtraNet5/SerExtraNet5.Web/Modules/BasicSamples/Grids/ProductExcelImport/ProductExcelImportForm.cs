using Serenity.ComponentModel;
using Serenity.Web;
using System;

namespace SerExtraNet5.BasicSamples.Forms
{
    [FormScript("BasicSamples.ProductExcelImport")]
    public class ProductExcelImportForm
    {
        [FileUploadEditor, Required]
        public String FileName { get; set; }
    }
}
