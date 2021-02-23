using Serenity.Data;
using Serenity.Data.Schema;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace _Ext.DevTools
{
    public class SchemaHelper
    {
        public static ISchemaProvider GetSchemaProvider(string serverType)
        {
            var providerType = Type.GetType("Serenity.Data.Schema." + serverType + "SchemaProvider, Serenity.Data");
            if (providerType == null || !typeof(ISchemaProvider).GetTypeInfo().IsAssignableFrom(providerType))
                throw new ArgumentOutOfRangeException("serverType", (object)serverType, "Unknown server type");

            return (ISchemaProvider)Activator.CreateInstance(providerType);
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
                { "NVARCHAR2", "String" },
                { "real", "Single" },
                { "rowversion", "ByteArray" },
                { "smalldatetime", "DateTime" },
                { "smallint", "Int16" },
                { "text", "String" },
                { "time", "TimeSpan" },
                { "timestamp", "DateTime" },
                { "TIMESTAMP(4)", "DateTime" },
                { "timestamp without time zone", "DateTime" },
                { "timestamp with time zone", "DateTimeOffset" },
                { "tinyint", "Int16" },
                { "uniqueidentifier", "Guid" },
                { "varbinary", "Stream" },
                { "varchar", "String" },
                { "NCLOB", "String" },

            };

        public static string SqlTypeNameToFieldType(string sqlTypeName, int size, int scale)
        {
            string fieldType;
            sqlTypeName = sqlTypeName.ToLowerInvariant();

            if (sqlTypeName == "varbinary")
            {
                if (size == 0 || size > 256)
                    return "Stream";

                return "ByteArray";
            }
            else if (sqlTypeName == "timestamp" || sqlTypeName == "rowversion")
            {
                return "ByteArray";
            }
            else if (sqlTypeName == "number")
            {
                if (scale > 0)
                    return "Decimal";
                else
                {
                    if (size == 1) return "Boolean";
                    else if (size > 1 && size <= 5) return "Int16";
                    else if (size > 5 && size <= 9) return "Int32";
                    else if (size > 10) return "Int64";
                    else return "Int32";
                }
            }
            else if (SqlTypeToFieldTypeMap.TryGetValue(sqlTypeName, out fieldType))
                return fieldType;
            else
                return "Stream";
        }

        public static char[] Quotes = new char[] { '[', ']', '`', '"' };

        public static string GetTableNameOnly(IDbConnection connection, string tableName)
        {
            if (tableName.IndexOf('.') > 0)
            {
                tableName = tableName.Substring(tableName.IndexOf('.') + 1).Trim(SchemaHelper.Quotes);
            }
            else
            {
                tableName = tableName.Trim(SchemaHelper.Quotes);
            }

            var dialect = connection.GetDialect();

            if (dialect is OracleDialect)
            {
                return tableName.ToUpper();
            }

            return tableName;
        }

        public static string GetTableNameOnly(string tableName)
        {
            if (tableName.IndexOf('.') > 0)
            {
                tableName = tableName.Substring(tableName.IndexOf('.') + 1).Trim(SchemaHelper.Quotes);
            }
            else
            {
                tableName = tableName.Trim(SchemaHelper.Quotes);
            }

            return tableName;
        }

        public static string GetSchemaName(IDbConnection connection, string tableName)
        {
            var dialect = connection.GetDialect();

            string schema = null;

            if (dialect is SqlServer2012Dialect) schema = "dbo";
            else if (dialect is OracleDialect)
            {

                DbConnectionStringBuilder dbConnectionStringBuilder = new DbConnectionStringBuilder();
                dbConnectionStringBuilder.ConnectionString = connection.ConnectionString;
                schema = dbConnectionStringBuilder["User Id"].ToString();
            }

            if (tableName.IndexOf('.') > 0)
            {
                schema = tableName.Substring(0, tableName.IndexOf('.')).Trim(SchemaHelper.Quotes);
                //tableName = tableName.Substring(tableName.IndexOf('.') + 1).Trim(SchemaHelper.Quotes);
            }
            else
            {
                //tableName = tableName.Trim(SchemaHelper.Quotes);
            }
            return schema;
        }

        public static string GetSchemaName(string tableName)
        {
            string schema = null;

            if (tableName.IndexOf('.') > 0)
            {
                schema = tableName.Substring(0, tableName.IndexOf('.')).Trim(SchemaHelper.Quotes);
                //tableName = tableName.Substring(tableName.IndexOf('.') + 1).Trim(SchemaHelper.Quotes);
            }
            else
            {
                //tableName = tableName.Trim(SchemaHelper.Quotes);
            }
            return schema;
        }
    }
}
