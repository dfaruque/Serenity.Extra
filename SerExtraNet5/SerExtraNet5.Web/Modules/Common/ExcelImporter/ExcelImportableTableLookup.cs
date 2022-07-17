using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data.Mapping;
using Serenity.Web;

namespace SerExtraNet5.Common
{
    [LookupScript]
    public class ExcelImportableTableLookup : LookupScript
    {
        public ExcelImportableTableLookup()
        {
            IdField = TextField = nameof(ExcelImportableTable.TableName);
        }

        protected override IEnumerable GetItems()
        {
            var excelImportableTables = new List<ExcelImportableTable>();

            var excelImportableRowTypes = Assembly.GetExecutingAssembly().GetTypes()
                .Where(_ => _.GetAttribute<ExcelImportAttribute>().HasValue());

            foreach (var rowType in excelImportableRowTypes)
            {
                var tableNameAttr = rowType.GetAttribute<TableNameAttribute>();

                if (tableNameAttr is null) continue;

                var rowProps = rowType.GetProperties();

                var excelImportableFields = new List<ExcelImportableField>();

                foreach (var prop in rowProps)
                {
                    var excelImportableAttr = prop.GetAttribute<ExcelImportableAttribute>();
                    if (excelImportableAttr is null) continue;

                    var propType = prop.PropertyType;
                    if (propType.IsGenericType)
                    {
                        if (propType.GetGenericTypeDefinition() == typeof(Nullable<>))
                            propType = propType.GetGenericArguments()[0];
                    }

                    excelImportableFields.Add(new ExcelImportableField
                    {
                        FieldName = prop.Name,
                        FieldType = propType.Name
                    });
                }

                excelImportableTables.Add(new ExcelImportableTable
                {
                    RowType = rowType.Name,
                    TableName = tableNameAttr.Name,
                    ImportableFields = excelImportableFields
                });
            }

            return excelImportableTables;
        }
    }
}