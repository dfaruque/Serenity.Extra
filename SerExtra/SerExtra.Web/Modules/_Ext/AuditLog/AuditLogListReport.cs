using System.Collections.Generic;
using System.Data;
using System.Web;
using _Ext;
using _Ext.Entities;
using _Ext.Repositories;
using Serenity;
using Serenity.Data;
using Serenity.Reporting;

namespace _Ext.Reports
{
    [Report("_Ext.AuditLogList")]
    [ReportDesign("~/Modules/_Ext/AuditLog/AuditLogListReport.cshtml")]
    public class AuditLogListReport : ListReportBase, IReport
    {
        public object GetData()
        {
            using (var connection = SqlConnections.NewFor<AuditLogRow>())
            {
                return new AuditLogListReportModel(connection, Request);
            }
        }
    }

    public class AuditLogListReportModel : ListReportModelBase
    {
        public List<AuditLogRow> ConsumerList { get; set; } = new List<AuditLogRow>();

        public AuditLogListReportModel(IDbConnection connection, ListReportRequest request)
        {
            Request = request;

            request.IncludeColumns.Add(nameof(AuditLogRow.UserName));

            ConsumerList = new AuditLogRepository().List(connection, request).Entities;
        }

    }
}

