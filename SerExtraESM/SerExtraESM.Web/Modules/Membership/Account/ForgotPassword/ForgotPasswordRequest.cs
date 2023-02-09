using System;
using System.ComponentModel;
using Serenity.ComponentModel;
using Serenity.Services;

namespace SerExtraESM.Membership
{
    [FormScript("Membership.ForgotPassword")]
    public class ForgotPasswordRequest : ServiceRequest
    {
        [Required(true), EmailAddressEditor, DisplayName("E-mail Address"), Placeholder("e-mail")]
        public String Email { get; set; }
    }
}