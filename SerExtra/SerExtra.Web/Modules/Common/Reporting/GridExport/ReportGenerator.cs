namespace _Ext.Reports
{
    using Serenity;
    using Serenity.ComponentModel;
    using Serenity.Data;
    using Serenity.PropertyGrid;
    using Serenity.Reflection;
    using Serenity.Reporting;
    using Serenity.Services;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using System.Text;

    public class ReportGenerator
    {
        public string RenderHtml(IDataOnlyReport report, Type detailColumn, Type detailRowType)
        {
            var columns = report.GetColumnList();

            var rows = new List<object>();
            var detailsData = new List<object>();
            var input = report.GetData();
            var list = (input as IEnumerable) ?? new List<object> { input };

            var detailCols = new List<string>();
            var detailColsProp = report.GetType().GetProperty("DetailColumnList");
            IList detailColumns = (IList)detailColsProp.GetValue(report, null);
            foreach (var dtCols in detailColumns)
            {
                detailCols.Add(dtCols.ToString());
            }

            var detailColumnsList = GetDetailColumnList(detailCols, detailColumn);
            detailColumnsList = detailColumnsList.Where(q => q.Title != null && q.Title != "").ToList();

            /**/
            //var detailsTypeName = detailsType.GetGenericArguments()[0];
            foreach (var item in list)
            {
                var detailProps = item.GetType().GetProperties();
                foreach (var detailProp in detailProps)
                {
                    var type = detailProp.PropertyType;
                    if (type == detailRowType)
                    {
                        IList detailList = (IList)detailProp.GetValue(item, null);
                        foreach (var subItem in detailList)
                        {
                            detailsData.Add(subItem);
                        }
                    }
                }
                rows.Add(item);
            }




            if (columns == null)
                throw new ArgumentNullException("columns");

            if (rows == null)
                throw new ArgumentNullException("rows");

            Field[] fields = null;
            TypeAccessor accessor = null;
            bool[] invalidProperty = null;

            var colCount = columns.Count;
            var detailColumnsCount = detailColumnsList.Count;

            int endCol = colCount;
            int endRow = rows.Count + 1;

            int detailEndCol = detailColumnsCount;
            int detailEndRow = detailsData.Count + 1;


            //generate html
            var sb = new StringBuilder();
            sb.AppendLine("<div class='row'>");
            sb.AppendLine("<div class='col-sm-12'>");
            sb.AppendLine("<table class='table table-bordered table-condensed table-responsive report-table'>");


            var dataList = new List<object[]>();
            foreach (var obj in rows)
            {
                var data = new object[colCount];
                var row = obj as Row;
                if (row != null)
                {
                    if (fields == null)
                    {
                        fields = new Field[colCount];
                        for (var i = 0; i < columns.Count; i++)
                        {
                            var n = columns[i].Name;
                            fields[i] = row.FindFieldByPropertyName(n) ?? row.FindField(n);
                        }
                    }
                }
                else if (obj != null)
                {
                    if (obj is IDictionary || obj is IDictionary<string, object>)
                    {
                    }
                    else if (accessor == null)
                    {
                        accessor = TypeAccessor.Create(obj.GetType());
                        invalidProperty = new bool[colCount];
                        for (var c = 0; c < colCount; c++)
                            try
                            {
                                if (accessor[obj, columns[c].Name] != null)
                                {
                                }
                            }
                            catch
                            {
                                invalidProperty[c] = true;
                            }
                    }
                }

                for (var c = 0; c < colCount; c++)
                {
                    if (row != null)
                    {
                        var field = fields[c];
                        if (!ReferenceEquals(null, field))
                        {
                            if (field.Type == FieldType.Boolean)
                            {
                                var v = field.AsObject(row);
                                data[c] = (bool)v == true ? "Yes" : "No";
                            }
                            else
                            {
                                data[c] = field.AsObject(row);
                            }
                        }
                    }
                    else if (obj is IDictionary<string, object>)
                    {
                        var n = columns[c].Name;
                        var dict = obj as IDictionary<string, object>;
                        object v;
                        if (dict.TryGetValue(n, out v))
                            data[c] = v;
                    }
                    else if (obj is IDictionary)
                    {
                        var n = columns[c].Name;
                        var dict = obj as IDictionary;
                        if (dict.Contains(n))
                            data[c] = dict[n];
                    }
                    else if (obj != null)
                    {
                        if (!invalidProperty[c])
                            data[c] = accessor[obj, columns[c].Name];
                    }
                }

                dataList.Add(data);
            }

            for (var colNum = 1; colNum <= endCol; colNum++)
            {
                var col = columns[colNum - 1];
                var decorator = col.Decorator;

                sb.AppendLine("<tr>");
                var title = columns[colNum - 1].Title == null ? columns[colNum - 1].Name : columns[colNum - 1].Title;
                sb.AppendLine($@"<td style='width:30%'><strong>{title}</strong></td>");

                var fieldValue = dataList[0][colNum - 1];

                if (decorator != null)
                {
                    for (var rowNum = 2; rowNum <= endRow; rowNum++)
                    {
                        var obj = rows[rowNum - 2];
                        var row = obj as Row;

                        decorator.Item = obj;
                        decorator.Name = col.Name;
                        decorator.Format = null;

                        object value = null;
                        if (row != null)
                        {
                            var field = fields[colNum - 1];
                            if (!ReferenceEquals(null, field))
                                value = field.AsObject(row);
                        }
                        else if (obj is IDictionary<string, object>)
                        {
                            var n = col.Name;
                            var dict = obj as IDictionary<string, object>;
                            if (!dict.TryGetValue(n, out value))
                                value = null;
                        }
                        else if (obj is IDictionary)
                        {
                            var n = col.Name;
                            var dict = obj as IDictionary;
                            if (dict.Contains(n))
                                value = dict[n];
                        }
                        else if (obj != null)
                        {
                            if (!invalidProperty[colNum - 1])
                                value = accessor[obj, col.Name];
                        }
                        else
                            continue;

                        decorator.Value = value;
                        decorator.Decorate();
                        fieldValue = decorator.Value;
                    }
                }
                sb.AppendLine($@"<td>{fieldValue}</td>");
                sb.AppendLine("</tr>");
            }

            sb.AppendLine("</table>");




            /* Detail Part */

            Field[] detailFields = null;

            sb.AppendLine("<table class='table table-bordered table-condensed table-responsive report-table'>");

            sb.AppendLine("<thead><tr>");
            detailColumnsList.ForEach(detailCol =>
            {
                var title = detailCol.Title == null ? detailCol.Name : detailCol.Title;
                sb.AppendLine($@"<th>{title}</th>");
            });
            sb.AppendLine("</thead></tr>");

            var dataListDetail = new List<object[]>();
            foreach (var obj in detailsData)
            {

                var data = new object[detailColumnsCount];
                var row = obj as Row;
                if (row != null)
                {
                    if (detailFields == null)
                    {
                        detailFields = new Field[detailColumnsCount];
                        for (var i = 0; i < detailColumnsList.Count; i++)
                        {
                            var n = detailColumnsList[i].Name;
                            detailFields[i] = row.FindFieldByPropertyName(n) ?? row.FindField(n);
                        }
                    }
                }
                else if (obj != null)
                {
                    if (obj is IDictionary || obj is IDictionary<string, object>)
                    {
                    }
                    else if (accessor == null)
                    {
                        accessor = TypeAccessor.Create(obj.GetType());
                        invalidProperty = new bool[detailColumnsCount];
                        for (var c = 0; c < detailColumnsCount; c++)
                            try
                            {
                                if (accessor[obj, detailColumnsList[c].Name] != null)
                                {
                                }
                            }
                            catch
                            {
                                invalidProperty[c] = true;
                            }
                    }
                }

                for (var c = 0; c < detailColumnsCount; c++)
                {
                    if (row != null)
                    {
                        var field = detailFields[c];
                        if (!ReferenceEquals(null, field))
                        {
                            if (field.Type == FieldType.Boolean)
                            {
                                var v = field.AsObject(row);
                                data[c] = (bool)v == true ? "Yes" : "No";
                            }
                            else
                            {
                                data[c] = field.AsObject(row);
                            }
                        }
                    }
                    else if (obj is IDictionary<string, object>)
                    {
                        var n = detailColumnsList[c].Name;
                        var dict = obj as IDictionary<string, object>;
                        object v;
                        if (dict.TryGetValue(n, out v))
                            data[c] = v;
                    }
                    else if (obj is IDictionary)
                    {
                        var n = detailColumnsList[c].Name;
                        var dict = obj as IDictionary;
                        if (dict.Contains(n))
                            data[c] = dict[n];
                    }
                    else if (obj != null)
                    {
                        if (!invalidProperty[c])
                            data[c] = accessor[obj, detailColumnsList[c].Name];
                    }
                }

                dataListDetail.Add(data);
            }

            for (var colNum = 1; colNum <= detailEndCol; colNum++)
            {
                var col = detailColumnsList[colNum - 1];
                var decorator = col.Decorator;


                if (decorator != null)
                {
                    for (var rowNum = 2; rowNum <= detailEndRow; rowNum++)
                    {


                        var obj = detailsData[rowNum - 2];
                        var row = obj as Row;

                        decorator.Item = obj;
                        decorator.Name = col.Name;
                        decorator.Format = null;

                        object value = null;
                        if (row != null)
                        {
                            var field = detailFields[colNum - 1];
                            if (!ReferenceEquals(null, field))
                                value = field.AsObject(row);
                        }
                        else if (obj is IDictionary<string, object>)
                        {
                            var n = col.Name;
                            var dict = obj as IDictionary<string, object>;
                            if (!dict.TryGetValue(n, out value))
                                value = null;
                        }
                        else if (obj is IDictionary)
                        {
                            var n = col.Name;
                            var dict = obj as IDictionary;
                            if (dict.Contains(n))
                                value = dict[n];
                        }
                        else if (obj != null)
                        {
                            if (!invalidProperty[colNum - 1])
                                value = accessor[obj, col.Name];
                        }
                        else
                            continue;

                        decorator.Value = value;
                        decorator.Decorate();
                    }
                }

            }


            sb.Append("<tbody>");

            for (int row = 0; row < dataListDetail.Count; row++)
            {
                sb.AppendLine("<tr>");
                for (int col = 0; col < detailColumnsList.Count; col++)
                {
                    var val = dataListDetail[row][col];
                    if (val != null)
                    {
                        if (val.ToString().Contains("00.00.00") || val.ToString().Contains("T00:00"))
                        {
                            val = Convert.ToDateTime(val).ToString("dd-MM-yyyy");
                        }
                    }
                    sb.AppendLine($@"<td>{val}</td>");
                }
                sb.AppendLine("</tr>");
            }

            sb.Append("</tbody>");
            sb.AppendLine("</table>");
            sb.AppendLine("</div>");
            sb.AppendLine("</div>");

            return sb.ToString();
        }

        public string RenderHtml(IDataOnlyReport report)
        {
            var columns = report.GetColumnList();

            var rows = new List<object>();
            var detailsData = new List<object>();
            var input = report.GetData();
            var list = (input as IEnumerable) ?? new List<object> { input };

            foreach (var item in list)
            {
                rows.Add(item);
            }


            if (columns == null)
                throw new ArgumentNullException("columns");

            if (rows == null)
                throw new ArgumentNullException("rows");

            Field[] fields = null;
            TypeAccessor accessor = null;
            bool[] invalidProperty = null;

            var colCount = columns.Count;

            int endCol = colCount;
            int endRow = rows.Count + 1;


            //generate html
            var sb = new StringBuilder();
            sb.AppendLine("<div class='row'>");
            sb.AppendLine("<div class='col-sm-12'>");
            sb.AppendLine("<table class='table table-bordered table-condensed table-responsive report-table'>");


            var dataList = new List<object[]>();
            foreach (var obj in rows)
            {
                var data = new object[colCount];
                var row = obj as Row;
                if (row != null)
                {
                    if (fields == null)
                    {
                        fields = new Field[colCount];
                        for (var i = 0; i < columns.Count; i++)
                        {
                            var n = columns[i].Name;
                            fields[i] = row.FindFieldByPropertyName(n) ?? row.FindField(n);
                        }
                    }
                }
                else if (obj != null)
                {
                    if (obj is IDictionary || obj is IDictionary<string, object>)
                    {
                    }
                    else if (accessor == null)
                    {
                        accessor = TypeAccessor.Create(obj.GetType());
                        invalidProperty = new bool[colCount];
                        for (var c = 0; c < colCount; c++)
                            try
                            {
                                if (accessor[obj, columns[c].Name] != null)
                                {
                                }
                            }
                            catch
                            {
                                invalidProperty[c] = true;
                            }
                    }
                }

                for (var c = 0; c < colCount; c++)
                {
                    if (row != null)
                    {
                        var field = fields[c];
                        if (!ReferenceEquals(null, field))
                        {
                            if (field.Type == FieldType.Boolean)
                            {
                                var v = field.AsObject(row);
                                data[c] = (bool)v == true ? "Yes" : "No";
                            }
                            else
                            {
                                data[c] = field.AsObject(row);
                                if (data[c] != null)
                                {
                                    if (data[c].ToString().Contains("00.00.00") || data[c].ToString().Contains("T00:00"))
                                    {
                                        data[c] = Convert.ToDateTime(data[c]).ToString("dd-MM-yyyy");
                                    }
                                }
                            }
                        }
                    }
                    else if (obj is IDictionary<string, object>)
                    {
                        var n = columns[c].Name;
                        var dict = obj as IDictionary<string, object>;
                        object v;
                        if (dict.TryGetValue(n, out v))
                            data[c] = v;
                    }
                    else if (obj is IDictionary)
                    {
                        var n = columns[c].Name;
                        var dict = obj as IDictionary;
                        if (dict.Contains(n))
                            data[c] = dict[n];
                    }
                    else if (obj != null)
                    {
                        if (!invalidProperty[c])
                            data[c] = accessor[obj, columns[c].Name];
                    }
                }

                dataList.Add(data);
            }

            for (var colNum = 1; colNum <= endCol; colNum++)
            {
                var col = columns[colNum - 1];
                var decorator = col.Decorator;

                sb.AppendLine("<tr>");
                var title = columns[colNum - 1].Title == null ? columns[colNum - 1].Name : columns[colNum - 1].Title;
                sb.AppendLine($@"<td style='width:30%'><strong>{title}</strong></td>");

                var fieldValue = dataList[0][colNum - 1];

                if (decorator != null)
                {
                    for (var rowNum = 2; rowNum <= endRow; rowNum++)
                    {
                        var obj = rows[rowNum - 2];
                        var row = obj as Row;

                        decorator.Item = obj;
                        decorator.Name = col.Name;
                        decorator.Format = null;

                        object value = null;
                        if (row != null)
                        {
                            var field = fields[colNum - 1];
                            if (!ReferenceEquals(null, field))
                                value = field.AsObject(row);
                        }
                        else if (obj is IDictionary<string, object>)
                        {
                            var n = col.Name;
                            var dict = obj as IDictionary<string, object>;
                            if (!dict.TryGetValue(n, out value))
                                value = null;
                        }
                        else if (obj is IDictionary)
                        {
                            var n = col.Name;
                            var dict = obj as IDictionary;
                            if (dict.Contains(n))
                                value = dict[n];
                        }
                        else if (obj != null)
                        {
                            if (!invalidProperty[colNum - 1])
                                value = accessor[obj, col.Name];
                        }
                        else
                            continue;

                        decorator.Value = value;
                        decorator.Decorate();
                        fieldValue = decorator.Value;
                    }
                }
                sb.AppendLine($@"<td>{fieldValue}</td>");
                sb.AppendLine("</tr>");
            }

            sb.AppendLine("</table>");

            sb.AppendLine("</table>");
            sb.AppendLine("</div>");
            sb.AppendLine("</div>");

            return sb.ToString();
        }

        public List<ReportColumn> GetDetailColumnList(List<string> DetailColumnList, Type DetailColumnsType)
        {
            var list = new List<ReportColumn>();

            if (!DetailColumnList.Any())
                return list;

            IDictionary<string, PropertyItem> propertyItems = null;
            IDictionary<string, PropertyInfo> propertyInfos = null;
            Row basedOnRow = null;

            if (DetailColumnsType != null)
            {
                propertyItems = LocalCache.Get("DynamicDataReport:Columns:" + DetailColumnsType.FullName, TimeSpan.Zero,
                    () => PropertyItemHelper.GetPropertyItemsFor(DetailColumnsType).ToDictionary(x => x.Name));

                propertyInfos = DetailColumnsType.GetProperties().ToDictionary(x => x.Name);

                var basedOnAttr = DetailColumnsType.GetCustomAttribute<BasedOnRowAttribute>();
                if (basedOnAttr != null &&
                    basedOnAttr.RowType != null &&
                    typeof(Row).IsAssignableFrom(basedOnAttr.RowType))
                {
                    basedOnRow = (Row)Activator.CreateInstance(basedOnAttr.RowType);
                }
            }

            foreach (var columnName in DetailColumnList)
            {
                PropertyItem item;
                if (!propertyItems.TryGetValue(columnName, out item))
                    continue;

                var basedOnField = basedOnRow == null ? (Field)null :
                    (basedOnRow.FindField(columnName) ?? basedOnRow.FindFieldByPropertyName(columnName));

                PropertyInfo p;
                if (propertyInfos == null || !propertyInfos.TryGetValue(columnName, out p))
                    p = null;

                list.Add(FromPropertyItem(item, basedOnField, p));
            }

            return list;
        }

        private ReportColumn FromPropertyItem(PropertyItem item, Field field, PropertyInfo property)
        {
            var result = new ReportColumn();
            result.Name = item.Name;
            result.Title = item.Title ?? item.Name;
            if (result.Title != null)
                result.Title = LocalText.TryGet(result.Title) ?? result.Title;

            if (item.Width != null)
                result.Width = item.Width;

            if (!string.IsNullOrWhiteSpace(item.DisplayFormat))
                result.Format = item.DisplayFormat;
            else
            {
                var dtf = field as DateTimeField;
                if (!ReferenceEquals(null, dtf) &&
                    dtf.DateTimeKind != DateTimeKind.Unspecified)
                {
                    result.Format = "dd/MM/yyyy HH:mm";
                }
                else if (!ReferenceEquals(null, dtf))
                {
                    result.Format = "dd/MM/yyyy";
                }
            }

            var enumField = field as IEnumTypeField;
            if (enumField != null && enumField.EnumType != null)
            {
                result.Decorator = new EnumDecorator(enumField.EnumType);
            }

            if (property != null)
            {
                var decorator = property.GetCustomAttribute<CellDecoratorAttribute>();
                if (decorator != null && decorator.DecoratorType != null)
                    result.Decorator = (ICellDecorator)Activator.CreateInstance(decorator.DecoratorType);
            }

            if (!ReferenceEquals(null, field))
            {
                if (result.Title == null)
                    result.Title = field.Title;

                if (result.Width == null && field is StringField && field.Size != 0)
                    result.Width = field.Size;
            }

            result.DataType = !ReferenceEquals(null, field) ? field.ValueType : null;

            return result;
        }


    }
}