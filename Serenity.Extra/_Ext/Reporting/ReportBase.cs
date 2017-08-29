using Serenity;
using Serenity.Reporting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _Ext

{
    public partial class ReportBase : ICustomizeHtmlToPdf
    {
        public ReportListRequest reportListRequest { get; set; }
        public ReportRetrieveRequest reportRetrieveRequest { get; set; }

        public virtual void Customize(IHtmlToPdfOptions options)
        {
            // you may customize HTML to PDF converter (WKHTML) parameters here, e.g. 
            options.Landscape = false;
            options.PageSize = "A4";
            options.MarginsAll = "1.2cm";
            options.FooterHtmlUrl = GetBaseUrl() + "ReportFooter.html";
        }

        public string GetBaseUrl()
        {
            var httpRequest = System.Web.HttpContext.Current.Request;
            var appUrl = System.Web.HttpRuntime.AppDomainAppVirtualPath;

            if (appUrl != "/")
                appUrl = "/" + appUrl + "/";

            var baseUrl = string.Format("{0}://{1}{2}", httpRequest.Url.Scheme, httpRequest.Url.Authority, appUrl);

            return baseUrl;
        }

    }
}
