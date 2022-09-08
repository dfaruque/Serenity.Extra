using System.Collections.Generic;
using System.Data;
using System.Web;
using _Ext;
using _Ext.Entities;
using _Ext.Repositories;
using Serenity;
using Serenity.Data;
using Serenity.Reporting;
using SerExtra.Administration.Entities;

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
        public List<AuditLogRow> AuditLogs { get; set; } = new List<AuditLogRow>();
        public List<UserRow> Users { get; set; } = new List<UserRow>();

        public AuditLogListReportModel(IDbConnection connection, ListReportRequest request)
        {
            Request = request;

            AuditLogs = new AuditLogRepository().List(connection, request).Entities;

            using (var userConnection = SqlConnections.NewFor<UserRow>())
            {
                var ufld = UserRow.Fields;
                Users = userConnection.List<UserRow>(q => q.Select(ufld.UserId, ufld.DisplayName));

                AuditLogs.ForEach(a => a.UserName = Users.Find(f => f.UserId == a.UserId)?.DisplayName);
            }

        }

    }
}

