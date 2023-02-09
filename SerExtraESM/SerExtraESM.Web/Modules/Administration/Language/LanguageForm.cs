using System;
using Serenity.ComponentModel;

namespace SerExtraESM.Administration.Forms
{
    [FormScript("Administration.Language")]
    [BasedOnRow(typeof(LanguageRow), CheckNames = true)]
    public class LanguageForm
    {
        public String LanguageId { get; set; }
        public String LanguageName { get; set; }
    }
}