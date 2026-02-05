using MyRow = SerExtraNet10.Administration.LanguageRow;

namespace SerExtraNet10.Administration;

public interface ILanguageListHandler : IListHandler<MyRow> { }

public class LanguageListHandler(IRequestContext context)
    : ListRequestHandler<MyRow>(context), ILanguageListHandler
{
}