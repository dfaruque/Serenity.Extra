using Serenity.Services;
using MyRequest = Serenity.Services.SaveRequest<SerExtraESM.Administration.LanguageRow>;
using MyResponse = Serenity.Services.SaveResponse;
using MyRow = SerExtraESM.Administration.LanguageRow;


namespace SerExtraESM.Administration
{
    public interface ILanguageSaveHandler : ISaveHandler<MyRow, MyRequest, MyResponse> { }
    public class LanguageSaveHandler : SaveRequestHandler<MyRow, MyRequest, MyResponse>, ILanguageSaveHandler
    {
        public LanguageSaveHandler(IRequestContext context)
             : base(context)
        {
        }
    }
}