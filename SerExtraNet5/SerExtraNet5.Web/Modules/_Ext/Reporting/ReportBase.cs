using Serenity;
using Serenity.Data;
using Serenity.Reporting;
using Serenity.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _Ext
{
    public partial class ListReportBase : ReportBase
    {
        public ListReportRequest Request { get; set; }

        public ListReportBase(IRequestContext requestContext, ISqlConnections sqlConnections) : base(requestContext, sqlConnections)
        {

        }
    }

    public partial class EntityReportBase : ReportBase
    {
        public EntityReportRequest Request { get; set; }

        public EntityReportBase(IRequestContext requestContext, ISqlConnections sqlConnections) : base(requestContext, sqlConnections)
        {

        }
    }

    public abstract class ReportBase : BaseRepository, ICustomizeHtmlToPdf
    {
        protected ISqlConnections SqlConnections { get; private set; }
        protected IRequestContext RequestContext { get; private set; }
        public ReportBase(IRequestContext requestContext, ISqlConnections sqlConnections) : base(requestContext)
        {
            SqlConnections = sqlConnections;
            RequestContext = requestContext;
        }

        public virtual void Customize(IHtmlToPdfOptions options)
        {
            // you may customize HTML to PDF converter (WKHTML) parameters here, e.g. 
            options.Landscape = false;
            options.PageSize = "A4";
            options.MarginsAll = "1.2cm";
            options.FooterHtmlUrl = GetBaseUrl() + "Modules/_Ext/Reporting/ReportFooter.html";
            options.SmartShrinking = true;
        }

        public string GetBaseUrl()
        {
            var baseUrl = string.Empty;
//#if COREFX

//#else
//            var httpRequest = System.Web.HttpContext.Current.Request;
//            var appUrl = System.Web.HttpRuntime.AppDomainAppVirtualPath;

//            if (appUrl != "/")
//                appUrl = "/" + appUrl + "/";

//            baseUrl = string.Format("{0}://{1}{2}", httpRequest.Url.Scheme, httpRequest.Url.Authority, appUrl);
//#endif

            return baseUrl;
        }

    }
}
