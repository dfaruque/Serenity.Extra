using System.Collections.Generic;
using Serenity.Services;

namespace Ext;

[ScriptInclude]
public partial class ListReportRequest : ListRequest
{
    /// <summary>
    /// it is only used in client side to determine report key for generating report
    /// </summary>
    public string ReportKey { get; set; }
    /// <summary>
    /// it is only used in client side to determine endpoint method name
    /// </summary>
    public string ReportServiceMethodName { get; set; } //"Report";
    public string ListExcelServiceMethodName { get; set; } //"ListExcel";
    public string ReportDesignPath { get; set; } //"~/Modules/.../.../Report/...ReportDesign.cshtml";

    public Dictionary<string, string> EqualityFilterWithTextValue { get; set; }
    public Dictionary<string, object> CustomParameters { get; set; }
}

[ScriptInclude]
public partial class EntityReportRequest : RetrieveRequest
{
    /// <summary>
    /// it is only used in client side to determine report key for generating report
    /// </summary>
    public string ReportKey { get; set; }
    /// <summary>
    /// it is only used in client side to determine endpoint method name
    /// </summary>
    public string ReportServiceMethodName { get; set; } //"Report";
    public string ReportDesignPath { get; set; } //"~/Modules/.../.../Report/...ReportDesign.cshtml";

    public EntityReportRequest()
    {
        ColumnSelection = RetrieveColumnSelection.Details;
    }
}