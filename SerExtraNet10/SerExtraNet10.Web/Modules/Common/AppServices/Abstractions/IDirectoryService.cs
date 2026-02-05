
namespace SerExtraNet10;

public interface IDirectoryService
{
    AppServices.DirectoryEntry Validate(string username, string password);
}