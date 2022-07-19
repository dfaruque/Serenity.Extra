using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Serenity;
using Serenity.ComponentModel;
using Serenity.Data;
using Serenity.Data.Mapping;
using Serenity.PropertyGrid;
using Serenity.Web;

namespace SerExtraNet5.Common
{
    [LookupScript]
    public class ExcelImportableTableLookup : LookupScript
    {
        public static List<ExcelImportableTable> Items = new();

        public IPropertyItemProvider PropertyProvider { get; }
        public IServiceProvider ServiceProvider { get; }

        public ExcelImportableTableLookup(IPropertyItemProvider propertyProvider, IServiceProvider serviceProvider)
        {
            IdField = TextField = nameof(ExcelImportableTable.TableName);
            PropertyProvider = propertyProvider;
            ServiceProvider = serviceProvider;
        }

        protected override IEnumerable GetItems()
        {
            var excelImportableRowTypes = Assembly.GetExecutingAssembly().GetTypes()
                .Where(_ => _.GetAttribute<ExcelImportAttribute>().HasValue());

            foreach (var rowType in excelImportableRowTypes)
            {
                var tableNameAttr = rowType.GetAttribute<TableNameAttribute>();

                if (tableNameAttr is null) continue;

                var propertyItems = PropertyProvider.GetPropertyItemsFor(rowType);

                var excelImportableFields = new List<PropertyItem>();

                var rowProps = rowType.GetProperties();
                foreach (var propertyItem in propertyItems)
                {
                    var prop = rowType.GetProperty(propertyItem.Name);
                    var excelImportableAttr = prop.GetAttribute<ExcelImportableAttribute>();
                    if (excelImportableAttr is null) continue;

                    excelImportableFields.Add(propertyItem);

                    //add ForeignIdField if this property is a ForeignField
                    var row = Activator.CreateInstance(rowType) as IRow;
                    var field = row.FindField(propertyItem.Name);

                    if (field.Flags.HasFlag(FieldFlags.Foreign))
                    {
                        var foreignIdField = row.Fields.FirstOrDefault(f => f.TextualField == field.Name);
                        if (foreignIdField.GetAttribute<ExcelImportableAttribute>() is null)
                        {
                            propertyItem.EditLinkIdField = foreignIdField.Name;

                            var foreignPropertyItem = propertyItems.First(f => f.Name == foreignIdField.Name);
                            excelImportableFields.Add(foreignPropertyItem);
                        }
                    }
                }

                Items.Add(new ExcelImportableTable
                {
                    RowType = rowType.FullName,
                    TableName = tableNameAttr.Name,
                    ImportableFields = excelImportableFields
                });
            }

            return Items;
        }
    }
}