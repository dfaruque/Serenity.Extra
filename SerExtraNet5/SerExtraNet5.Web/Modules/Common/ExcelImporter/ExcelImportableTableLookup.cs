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
    public class ExcelImportableTableLookup: LookupScript
    {
        public ExcelImportableTableLookup()
        {
            IdField = TextField = nameof(ExcelImportableTable.TableName);
        }

        protected override IEnumerable GetItems()
        {
            var excelImportableTables = new List<ExcelImportableTable>();

            var excelImportableRows = Assembly.GetExecutingAssembly().GetTypes()
                .Where(_ => _.GetAttribute<ExcelImportableAttribute>().HasValue()
                && _.GetAttribute<TableNameAttribute>().HasValue());

            foreach (var row in excelImportableRows)
            {
                var tableName = row.GetAttribute<TableNameAttribute>();

                if (tableName is null) continue;

                excelImportableTables.Add(new ExcelImportableTable
                {
                    RowType = row.Name,
                    TableName = tableName.Name,
                    //ImportableFields
                });
            }

            return excelImportableTables;
        }
    }
}