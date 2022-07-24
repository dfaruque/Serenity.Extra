using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
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

        private const string MasterAndDetailFieldSeparator = ".";
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
            if (Items.Count > 0)
                return Items;

            var excelImportableRowTypes = Assembly.GetExecutingAssembly().GetTypes()
                .Where(_ => _.GetAttribute<ExcelImportAttribute>().HasValue());

            foreach (var rowType in excelImportableRowTypes)
            {
                var tableNameAttr = rowType.GetAttribute<TableNameAttribute>();

                if (tableNameAttr is null) continue;

                var excelImportableFields = GetImportableFields(rowType);

                Items.Add(new ExcelImportableTable
                {
                    RowType = rowType.FullName,
                    TableName = tableNameAttr.Name,
                    ImportableFields = excelImportableFields
                });
            }

            return Items;
        }

        private List<PropertyItem> GetImportableFields(Type rowType, string sourceFieldPrefix = "")
        {
            var propertyItems = PropertyProvider.GetPropertyItemsFor(rowType);

            var excelImportableFields = new List<PropertyItem>();

            var rowProps = rowType.GetProperties();
            foreach (var propertyItem in propertyItems)
            {
                var prop = rowType.GetProperty(propertyItem.Name);
                var excelImportableAttr = prop.GetAttribute<ExcelImportableAttribute>();
                if (excelImportableAttr is null) continue;

                var row = Activator.CreateInstance(rowType) as IRow;
                var field = row.FindField(propertyItem.Name);

                if (field.Flags.HasFlag(FieldFlags.NotNull)) //NotNull fiels not marked as Required! why?
                {
                    if (field.GetAttribute<DefaultValueAttribute>() is null)
                        propertyItem.Required = true;
                }

                if (prop.GetAttribute<MasterDetailRelationAttribute>() is MasterDetailRelationAttribute masterDetailRelation)
                {
                    var detailRowType = prop.PropertyType.GenericTypeArguments.FirstOrDefault();
                    sourceFieldPrefix = sourceFieldPrefix + prop.Name + MasterAndDetailFieldSeparator;
                    var detailImportableFields = GetImportableFields(detailRowType, sourceFieldPrefix);
                    detailImportableFields.ForEach(f =>
                    {
                        f.Name = sourceFieldPrefix + f.Name;
                        f.Title = sourceFieldPrefix + f.Title;
                    });
                    excelImportableFields.AddRange(detailImportableFields);
                }
                else
                    excelImportableFields.Add(propertyItem);

                //add EditLinkIdField if this property is a ForeignField
                if (field.Flags.HasFlag(FieldFlags.Foreign))
                {
                    var editLinkIdField = row.Fields.FirstOrDefault(f => f.TextualField == field.Name);
                    if (editLinkIdField.GetAttribute<ExcelImportableAttribute>() is null)
                    {
                        propertyItem.EditLinkIdField = sourceFieldPrefix + editLinkIdField.Name;
                        propertyItem.Title += " [" + propertyItem.Name + "]";
                        propertyItem.EditLinkCssClass += "HasEditLink";

                        var editLinkIdPropertyItem = propertyItems.First(f => f.Name == editLinkIdField.Name);
                        editLinkIdPropertyItem.Title += " [" + editLinkIdPropertyItem.Name + "]";
                        editLinkIdPropertyItem.EditLinkCssClass += "IsEditLink";

                        if (editLinkIdField.Flags.HasFlag(FieldFlags.NotNull))
                        {
                            editLinkIdPropertyItem.Required = true;
                            propertyItem.Required = true;
                        }

                        excelImportableFields.Add(editLinkIdPropertyItem);
                    }
                }
            }

            return excelImportableFields;
        }
    }
}