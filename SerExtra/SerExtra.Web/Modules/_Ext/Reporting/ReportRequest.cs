using Serenity.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace _Ext
{
    public partial class ListReportRequest : ListRequest
    {
        /// <summary>
        /// it is only used in client side to determine report key for generating report
        /// </summary>
        public string ReportKey { get; set; }
        /// <summary>
        /// it is only used in client side to determine endpoing method name
        /// </summary>
        public string ReportServiceMethodName { get; set; } //"Report";
        public string ListExcelServiceMethodName { get; set; } //"ListExcel";
        public string ReportDesignPath { get; set; } //"~/Modules/.../.../Report/...ReportDesign.cshtml";

        public Dictionary<string, string> EqualityFilterWithTextValue { get; set; }
        public Dictionary<string, object> CustomParameters { get; set; }
    }

    public partial class EntityReportRequest : RetrieveRequest
    {
        /// <summary>
        /// it is only used in client side to determine report key for generating report
        /// </summary>
        public string ReportKey { get; set; }
        /// <summary>
        /// it is only used in client side to determine endpoing method name
        /// </summary>
        public string ReportServiceMethodName { get; set; } //"Report";
        public string ReportDesignPath { get; set; } //"~/Modules/.../.../Report/...ReportDesign.cshtml";

        public EntityReportRequest()
        {
            ColumnSelection = RetrieveColumnSelection.Details;

        }

    }
}