using System.Data;
using Serenity.Extensions.Entities;
using MyRequest = Serenity.Services.DeleteRequest;
using MyResponse = Serenity.Services.DeleteResponse;
using MyRow = SerExtraNet8.Administration.UserRow;

namespace SerExtraNet8.Administration;
public interface IUserDeleteHandler : IDeleteHandler<MyRow, MyRequest, MyResponse> { }
public class UserDeleteHandler : DeleteRequestHandler<MyRow, MyRequest, MyResponse>, IUserDeleteHandler
{
    private readonly IOptions<EnvironmentSettings> environmentOptions;

    public UserDeleteHandler(IRequestContext context, IOptions<EnvironmentSettings> environmentOptions)
         : base(context)
    {
        this.environmentOptions = environmentOptions ??
            throw new System.ArgumentNullException(nameof(environmentOptions));
    }

    protected override void ValidateRequest()
    {
        base.ValidateRequest();

        environmentOptions.CheckPublicDemo(Row.UserId);
    }

    protected override void OnBeforeDelete()
    {
        base.OnBeforeDelete();

        new SqlDelete(UserPreferenceRow.Fields.TableName)
            .Where(UserPreferenceRow.Fields.UserId == Row.UserId.Value)
            .Execute(Connection, ExpectedRows.Ignore);

        new SqlDelete(UserRoleRow.Fields.TableName)
            .Where(UserRoleRow.Fields.UserId == Row.UserId.Value)
            .Execute(Connection, ExpectedRows.Ignore);

        new SqlDelete(UserPermissionRow.Fields.TableName)
            .Where(UserPermissionRow.Fields.UserId == Row.UserId.Value)
            .Execute(Connection, ExpectedRows.Ignore);
    }
}