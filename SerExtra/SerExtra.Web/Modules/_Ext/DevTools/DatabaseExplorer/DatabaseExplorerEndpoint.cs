
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Schema;
using Serenity.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;

namespace _Ext.DevTools
{
    [RoutePrefix("Services/_Ext/DatabaseExplorer"), Route("{action}")]
    [ServiceAuthorize("DevTools:DatabaseExplorer")]
    public class DatabaseExplorerController : ServiceEndpoint
    {
        public ListResponse<DatabaseExplorerConnection> ListConnections(ListRequest request)
        {
            request.CheckNotNull();

            var response = new ListResponse<DatabaseExplorerConnection>();
            response.Entities = new List<DatabaseExplorerConnection>();

            var config = Config.Get<DatabaseExplorerConfig>();

            foreach (ConnectionStringSettings cs in ConfigurationManager.ConnectionStrings)
            {
                if ((config.IncludeConnections == null ||
                     config.IncludeConnections.Contains(cs.Name, StringComparer.OrdinalIgnoreCase)) &&
                    (config.ExcludeConnections == null ||
                     !config.ExcludeConnections.Contains(cs.Name, StringComparer.OrdinalIgnoreCase)))
                {
                    response.Entities.Add(new DatabaseExplorerConnection
                    {
                        Key = cs.Name
                    });
                }
            }

            IEnumerable<DatabaseExplorerConnection> result = response.Entities;
            if (!string.IsNullOrEmpty(request.ContainsText))
                result = response.Entities.Where(x =>
                    StringHelper.RemoveDiacritics(x.Key)
                        .ToLowerInvariant()
                        .Contains(request.ContainsText));

            if (request.Skip > 0)
                result = result.Skip(request.Skip);

            if (request.Take > 0)
                result = result.Take(request.Take);

            return response;
        }

        private static ISchemaProvider GetSchemaProvider(string serverType)
        {
            var providerType = Type.GetType("Serenity.Data.Schema." + serverType + "SchemaProvider, Serenity.Data");
            if (providerType == null || !typeof(ISchemaProvider).IsAssignableFrom(providerType))
                throw new ArgumentOutOfRangeException("serverType", (object)serverType, "Unknown server type");

            return (ISchemaProvider)Activator.CreateInstance(providerType);
        }

        public ListResponse<DatabaseExplorerTable> ListTables(DatabaseExplorerListTablesRequest request)
        {
            request.CheckNotNull();
            Check.NotNullOrEmpty(request.ConnectionKey, "connectionKey");

            if (!ListConnections(new ListRequest()).Entities.Any(x => x.Key == request.ConnectionKey))
                throw new ArgumentOutOfRangeException("connectionKey");

            var config = Config.Get<DatabaseExplorerConfig>();
            string[] excludes;
            if (config.ExcludeTables == null ||
                !config.ExcludeTables.TryGetValue(request.ConnectionKey, out excludes))
                excludes = new string[0];

            var response = new ListResponse<DatabaseExplorerTable>();
            response.Entities = new List<DatabaseExplorerTable>();

            using (var connection = SqlConnections.NewByKey(request.ConnectionKey))
            {

                var schemaProvider = GetSchemaProvider(connection.GetDialect().ServerType);
                foreach (var t in schemaProvider.GetTableNames(connection))
                {
                    if (excludes.Contains(t.Tablename, StringComparer.OrdinalIgnoreCase))
                        continue;

                    response.Entities.Add(new DatabaseExplorerTable
                    {
                        Name = t.Tablename
                    });
                }
            }

            IEnumerable<DatabaseExplorerTable> result = response.Entities;

            if (!string.IsNullOrEmpty(request.ContainsText))
                result = response.Entities.Where(x =>
                    StringHelper.RemoveDiacritics(x.Name)
                        .ToLowerInvariant()
                        .Contains(request.ContainsText));

            if (request.Skip > 0)
                result = result.Skip(request.Skip);

            if (request.Take > 0)
                result = result.Take(request.Take);

            response.Entities = result.ToList();

            return response;
        }

        private string[] NumericTypes = new string[] { "Int32", "Int64", "Int16", "Decimal", "Double", "Single" };

        private static int AutoWidth(string dataType, int size)
        {
            switch (dataType)
            {
                case "String":
                    if (size > 0 && size <= 25)
                        return Math.Max(size * 6, 150);
                    else if (size <= 0)
                        return 250;
                    else
                        return 150;
                case "Boolean":
                    return 40;
                case "DateTime":
                    return 85;
                case "Time":
                    return 70;
                case "Int16":
                    return 55;
                case "Int32":
                    return 65;
                case "Single":
                case "Double":
                case "Decimal":
                    return 85;
                default:
                    return 80;
            }
        }

        private static Dictionary<string, string> SqlTypeToFieldTypeMap =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                { "bigint", "Int64" },
                { "bit", "Boolean" },
                { "blob sub_type 1", "String" },
                { "char", "String" },
                { "character varying", "String" },
                { "character", "String" },
                { "date", "DateTime" },
                { "datetime", "DateTime" },
                { "datetime2", "DateTime" },
                { "datetimeoffset", "DateTimeOffset" },
                { "decimal", "Decimal" },
                { "double", "Double" },
                { "doubleprecision", "Double" },
                { "float", "Double" },
                { "guid", "Guid" },
                { "int", "Int32" },
                { "int4", "Int32" },
                { "int8", "Int64" },
                { "integer", "Int32" },
                { "money", "Decimal" },
                { "nchar", "String" },
                { "ntext", "String" },
                { "numeric", "Decimal" },
                { "nvarchar", "String" },
                { "real", "Single" },
                { "rowversion", "ByteArray" },
                { "smalldatetime", "DateTime" },
                { "smallint", "Int16" },
                { "text", "String" },
                { "time", "TimeSpan" },
                { "timestamp", "DateTime" },
                { "timestamp without time zone", "DateTime" },
                { "timestamp with time zone", "DateTimeOffset" },
                { "tinyint", "Int16" },
                { "uniqueidentifier", "Guid" },
                { "varbinary", "Stream" },
                { "varchar", "String" }
            };

        public static string SqlTypeNameToFieldType(string sqlTypeName, int size, out string dataType)
        {
            dataType = null;
            string fieldType;
            sqlTypeName = sqlTypeName.ToLowerInvariant();

            if (sqlTypeName == "varbinary")
            {
                if (size == 0 || size > 256)
                    return "Stream";

                dataType = "byte[]";
                return "ByteArray";
            }
            else if (sqlTypeName == "timestamp" || sqlTypeName == "rowversion")
            {
                dataType = "byte[]";
                return "ByteArray";
            }
            else if (SqlTypeToFieldTypeMap.TryGetValue(sqlTypeName, out fieldType))
                return fieldType;
            else
                return "Stream";
        }

        public ListResponse<PropertyItem> ListColumns(DatabaseExplorerListRequest request)
        {
            request.CheckNotNull();
            Check.NotNullOrEmpty(request.ConnectionKey, "connectionKey");
            Check.NotNullOrEmpty(request.TableName, "tableName");

            if (!ListConnections(new ListRequest()).Entities.Any(x => x.Key == request.ConnectionKey))
                throw new ArgumentOutOfRangeException("connectionKey");

            if (!ListTables(new DatabaseExplorerListTablesRequest { ConnectionKey = request.ConnectionKey })
                .Entities.Any(x => x.Name == request.TableName))
                throw new ArgumentOutOfRangeException("connectionKey");

            var response = new ListResponse<PropertyItem>();
            response.Entities = new List<PropertyItem>();

            using (var connection = SqlConnections.NewByKey(request.ConnectionKey))
            {

                var schemaProvider = GetSchemaProvider(connection.GetDialect().ServerType);
                var parts = request.TableName.Split('.');
                var schema = parts.Length > 1 ? parts[0] : null;
                var table = parts.Length > 1 ? parts[1] : parts[0];
                foreach (var fi in schemaProvider.GetFieldInfos(connection, schema, table))
                {
                    string dataType;
                    var fieldType = SqlTypeNameToFieldType(fi.DataType, fi.Size, out dataType);

                    response.Entities.Add(new PropertyItem
                    {
                        Name = fi.FieldName,
                        Title = fi.FieldName,
                        Alignment = NumericTypes.Contains(fieldType) ? "right" : null,
                        Width = AutoWidth(fieldType, fi.Size),
                        Sortable = true
                    });
                }
            }

            return response;
        }

        public ListResponse<Dictionary<string, object>> List(DatabaseExplorerListRequest request)
        {
            request.CheckNotNull();
            Check.NotNullOrEmpty(request.ConnectionKey, "connectionKey");
            Check.NotNullOrEmpty(request.TableName, "tableName");

            if (!ListConnections(new ListRequest()).Entities.Any(x => x.Key == request.ConnectionKey))
                throw new ArgumentOutOfRangeException("connectionKey");

            if (!ListTables(new DatabaseExplorerListTablesRequest { ConnectionKey = request.ConnectionKey })
                .Entities.Any(x => x.Name == request.TableName))
                throw new ArgumentOutOfRangeException("connectionKey");

            var response = new ListResponse<Dictionary<string, object>>();
            response.Entities = new List<Dictionary<string, object>>();

            using (var connection = SqlConnections.NewByKey(request.ConnectionKey))
            {
                var schemaProvider = GetSchemaProvider(connection.GetDialect().ServerType);
                var parts = request.TableName.Split('.');
                var schema = parts.Length > 1 ? parts[0] : null;
                var table = parts.Length > 1 ? parts[1] : parts[0];

                var tableName = schema != null ? (SqlSyntax.AutoBracket(schema) + "." + SqlSyntax.AutoBracket(table)) : SqlSyntax.AutoBracket(table);

                var query = new SqlQuery()
                    .Dialect(connection.GetDialect())
                    .From(tableName)
                    .Select("*");

                if (request.Sort != null)
                {
                    foreach (var item in request.Sort)
                    {
                        if (!string.IsNullOrEmpty(item.Field) &&
                            SqlSyntax.IsValidIdentifier(item.Field))
                        {
                            query.OrderBy(item.Field, item.Descending);
                        }
                    }
                }

                if (!request.ContainsText.IsEmptyOrNull())
                {
                    var stringFields = schemaProvider.GetFieldInfos(connection, schema, table).Where(fi =>
                    {
                        string dataType;
                        return SqlTypeNameToFieldType(fi.DataType, fi.Size, out dataType) == "String";
                    }).Select(x => x.FieldName);

                    var containsCriteria = Criteria.Empty;
                    if (stringFields.Any())
                    {
                        foreach (var x in stringFields)
                            containsCriteria |= new Criteria(SqlSyntax.AutoBracket(x))
                                .Contains(request.ContainsText);

                        query.Where(containsCriteria);
                    }                   
                }

                var identityFields = schemaProvider.GetIdentityFields(connection, schema, table);
                if (identityFields.Any())
                    query.OrderBy(identityFields.First());
                else
                {
                    var primaryKeyFields = schemaProvider.GetPrimaryKeyFields(connection, schema, table);
                    if (primaryKeyFields.Any())
                        foreach (var p in primaryKeyFields)
                            query.OrderBy(SqlSyntax.AutoBracket(p));
                    else
                    {
                        var firstField = schemaProvider.GetFieldInfos(connection, schema, table).FirstOrDefault();
                        if (firstField != null)
                            query.OrderBy(SqlSyntax.AutoBracket(firstField.FieldName));
                    }
                }

                query.ApplySkipTakeAndCount(request.Skip, request.Take, true);
                response.Skip = request.Skip;
                response.Take = request.Take;
                response.Entities = connection.Query(query).Select(x => new Dictionary<string, object>(x)).ToList();

                response.TotalCount = connection.Query<int>(new SqlQuery()
                    .Dialect(connection.GetDialect())
                    .Select(Sql.Count())
                    .From(tableName)).First();
            }

            return response;
        }
    }
}