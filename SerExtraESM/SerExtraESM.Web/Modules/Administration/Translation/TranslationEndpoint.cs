using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Serenity.Abstractions;
using Serenity.Services;
using MyRepository = SerExtraESM.Administration.Repositories.TranslationRepository;

namespace SerExtraESM.Administration.Endpoints
{
    [Route("Services/Administration/Translation/[action]")]
    [ServiceAuthorize(PermissionKeys.Translation)]
    public class TranslationController : ServiceEndpoint
    {
        protected IWebHostEnvironment HostEnvironment { get; }
        protected ILocalTextRegistry LocalTextRegistry { get; }
        protected ITypeSource TypeSource { get; }

        public TranslationController(IWebHostEnvironment hostEnvironment,
            ILocalTextRegistry localTextRegistry, ITypeSource typeSource)
        {
            HostEnvironment = hostEnvironment ?? throw new ArgumentNullException(nameof(hostEnvironment));
            LocalTextRegistry = localTextRegistry ?? throw new ArgumentNullException(nameof(localTextRegistry));
            TypeSource = typeSource ?? throw new ArgumentNullException(nameof(typeSource));
        }

        private MyRepository NewRepository()
        {
            return new MyRepository(Context, HostEnvironment, LocalTextRegistry, TypeSource);
        }

        public ListResponse<TranslationItem> List(TranslationListRequest request)
        {
            return NewRepository().List(request);
        }

        [HttpPost]
        public SaveResponse Update(TranslationUpdateRequest request)
        {
            return NewRepository().Update(request, HttpContext.RequestServices);
        }
    }
}
