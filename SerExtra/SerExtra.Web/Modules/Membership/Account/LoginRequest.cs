
namespace SerExtra.Membership
{
    using Serenity.ComponentModel;
    using Serenity.Services;
    using System.ComponentModel;

    [FormScript("Membership.Login")]
    [BasedOnRow(typeof(Administration.Entities.UserRow))]
    public class LoginRequest : ServiceRequest
    {
        [Placeholder("default username is 'admin'")]
        public string Username { get; set; }
        [PasswordEditor, Placeholder("default password for 'admin' is 'serenity'"), Required(true)]
        public string Password { get; set; }

        [Recaptcha(SiteKey = "6Lfts2kUAAAAACa-8L6yESiVZBFHWWRI-0PqCkXh")]
        [DisplayName(""), Hidden]
        public string ReCaptcha { get; set; }

    }
}