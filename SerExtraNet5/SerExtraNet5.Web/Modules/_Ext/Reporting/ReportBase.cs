using Serenity;
using Serenity.Reporting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _Ext
{
    public partial class ListReportBase : ReportBase
    {
        public ListReportRequest Request { get; set; }
    }

    public partial class EntityReportBase : ReportBase
    {
        public EntityReportRequest Request { get; set; }
    }

    public abstract class ReportBase : ICustomizeHtmlToPdf
    {

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
