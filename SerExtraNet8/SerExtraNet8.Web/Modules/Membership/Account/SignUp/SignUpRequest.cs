namespace SerExtraNet8.Membership;

public class SignUpRequest : ServiceRequest
{
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}