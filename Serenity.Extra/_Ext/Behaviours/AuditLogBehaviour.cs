using LiteDB;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Web;

namespace _Ext
{
    public class AuditRowBehavior : IImplicitBehavior, ISaveBehavior, IDeleteBehavior
    {
        public bool ActivateFor(Row row)
        {
            var auditLog = row as IAuditLog;
            if (auditLog == null)
            {
                var exauditLog = row as IExAuditLog;
                if (exauditLog == null)
                    return false;
                //else
                //    IdFieldName = exauditLog.IdField.PropertyName;
            }
            return true;
        }


        public void OnAfterSave(ISaveRequestHandler handler) { }
        public void OnAudit(ISaveRequestHandler handler)
        {
            if (handler.IsCreate)
            {
                InsertNewLog(handler.Row, handler.Old, AuditActionType.Insert);
            }

            if (handler.IsUpdate)
            {
                InsertNewLog(handler.Row, handler.Old, AuditActionType.Update);
            }
        }

        public void OnBeforeSave(ISaveRequestHandler handler) { }
        public void OnPrepareQuery(ISaveRequestHandler handler, SqlQuery query) { }
        public void OnReturn(ISaveRequestHandler handler) { }
        public void OnSetInternalFields(ISaveRequestHandler handler) { }
        public void OnValidateRequest(ISaveRequestHandler handler) { }

        public void OnAfterDelete(IDeleteRequestHandler handler) { }
        public void OnAudit(IDeleteRequestHandler handler)
        {
            InsertNewLog(handler.Row, null, AuditActionType.Delete);
        }
        public void OnBeforeDelete(IDeleteRequestHandler handler) { }
        public void OnPrepareQuery(IDeleteRequestHandler handler, SqlQuery query) { }
        public void OnReturn(IDeleteRequestHandler handler) { }
        public void OnValidateRequest(IDeleteRequestHandler handler) { }

        private void InsertNewLog(Row row, Row oldRow, AuditActionType auditActionType)
        {
            try
            {
                // Open database (or create if doesn't exist)

                var constr = ConfigurationManager.ConnectionStrings["LogLiteDB"].ConnectionString;
                if (String.IsNullOrWhiteSpace(constr)) return;
                using (var db = new LiteDatabase(constr))
                {
                    var collectionName = row.Table.Replace('.', '_');
                    var collections = db.GetCollection<VersionInfo>(collectionName);

                    var entityId = (row as IIdRow).IdField[row] ?? 0;
                    var previousVersions = collections.Find(x => x.EntityId == entityId);

                    var lastVersion = previousVersions?.OrderBy(o => o.VersionNo).LastOrDefault();

                    //var jsonSerializerSettings = new JsonSerializerSettings
                    //{
                    //    ContractResolver = new DynamicContractResolver("IDate", "IUser", "EDate", "EUser")
                    //};

                    var rowJson = JsonConvert.SerializeObject(row);//, jsonSerializerSettings);
                    var oldrowJson = JsonConvert.SerializeObject(oldRow);//, jsonSerializerSettings);

                    if (auditActionType == AuditActionType.Delete || lastVersion?.Entity != rowJson)
                    {
                        int versionNo = previousVersions?.Count() ?? 0;

                        var versionInfo = new VersionInfo
                        {
                            VersionNo = versionNo,
                            VersionDate = DateTime.Now,
                            UserId = Authorization.UserId,
                            AuditActionType = auditActionType,
                            ChangeViaUrl = GetPageUrl(),
                            EntityId = entityId,
                            OldEntity = oldrowJson,
                            Entity = rowJson
                        };

                        collections.Insert(versionInfo);
                    }
                }
            }
            catch { }
        }

        string GetPageUrl()
        {
            string pageUrl = "";
            if (HttpContext.Current != null && HttpContext.Current.Request != null)
            {
                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.UrlReferrer != null)
                    pageUrl = httpRequest.UrlReferrer.PathAndQuery;
                else if (httpRequest.Url != null)
                    pageUrl = httpRequest.Url.PathAndQuery;
            }
            return pageUrl;
        }
    }

    /// <summary>
    /// This interface is used to log the changes for Insert / Update and Delete.
    /// This identify the Identity Column as Row Id (Unique Id) and save in Audit Table. If Identity column is not found then it use Id (Hard Coded) column.
    /// </summary>
    public interface IAuditLog
    {
    }

    /// <summary>
    /// This is used if want to store specific IdFields instead of default Identity field (or identity field is not avail able  ).
    /// </summary>
    public interface IExAuditLog
    {
        /// <summary>
        /// Assign the field which need to save as reference id in Audit Log Table
        /// </summary>
        Int32Field IdField { get; }
    }

    [EnumKey("Enum.Audit.AuditActionType"), ScriptInclude]
    public enum AuditActionType
    {
        Insert = 1,
        Update = 2,
        Delete = 3
    }

    /// <summary>
    /// Any field which does not required to log in audit table. For Example InsertUserId, InsertDate etc
    /// </summary>
    public class IgnoreAuditLog : Attribute
    {
    }

    [ScriptInclude]
    public class VersionInfo
    {
        public ObjectId Id { get; set; }
        public int VersionNo { get; set; }
        public DateTime VersionDate { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string ChangeViaUrl { get; set; }
        public AuditActionType AuditActionType { get; set; }
        public Int64 EntityId { get; set; }
        public string OldEntity { get; set; }
        public string Entity { get; set; }
    }

    public class DynamicContractResolver : DefaultContractResolver
    {
        private readonly string[] props;

        public DynamicContractResolver(params string[] prop)
        {
            this.props = prop;
        }

        protected override IList<JsonProperty> CreateProperties(Type type, MemberSerialization memberSerialization)
        {
            IList<JsonProperty> retval = base.CreateProperties(type, memberSerialization);

            // retorna todas as propriedades que não estão na lista para ignorar
            retval = retval.Where(p => !this.props.Contains(p.PropertyName)).ToList();

            return retval;
        }

        protected override List<MemberInfo> GetSerializableMembers(Type objectType)
        {
            var retval = base.GetSerializableMembers(objectType);
            // retorna todas as propriedades que não estão na lista para ignorar
            retval = retval.Where(p => !this.props.Contains(p.Name)).ToList();
            return retval;
        }

    }
}