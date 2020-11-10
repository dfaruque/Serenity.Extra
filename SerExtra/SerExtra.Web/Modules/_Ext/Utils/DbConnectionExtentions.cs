using Serenity;
using Serenity.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

public static partial class DbConnectionExtentions
{
    public static string GetNameById<TRow>(this IDbConnection connection, object id)
        where TRow : Row, IIdRow, INameRow, new()
    {
        if (id == null) return null;

        var row = new TRow();

        var query = new SqlQuery()
            .From(row)
            .Select(row.NameField)
            .Where(((Field)row.IdField).Name + '=' + id);

        using (var reader = SqlHelper.ExecuteReader(connection, query))
            while (reader.Read())
                return reader.AsString(0);

        return null;
    }

    public static object GetIdByName<TRow>(this IDbConnection connection, string name)
        where TRow : Row, IIdRow, INameRow, new()
    {
        if (name == null) return null;

        var row = new TRow();

        var query = new SqlQuery()
            .From(row)
            .Select((Field)row.IdField)
            .Where(((Field)row.NameField).Name + "=" + name.Trim().ToSql())
            .Take(1);

        using (var reader = SqlHelper.ExecuteReader(connection, query))
            while (reader.Read())
                return reader.GetValue(0);

        return null;
    }

    public static List<string> GetNamesByIds<TRow>(this IDbConnection connection, IEnumerable<Int64> ids)
        where TRow : Row, IIdRow, INameRow, new()
    {
        var row = new TRow();

        var query = new SqlQuery()
            .From(row)
            .Select(row.NameField)
            .Where(((Field)row.IdField).In(ids));

        return connection.Query<string>(query).ToList();
    }

    public static List<string> GetNamesByIds<TRow>(this IDbConnection connection, IEnumerable<Int32> ids)
        where TRow : Row, IIdRow, INameRow, new()
    {
        var row = new TRow();

        var query = new SqlQuery()
            .From(row)
            .Select(row.NameField)
            .Where(((Field)row.IdField).In(ids));

        return connection.Query<string>(query).ToList();
    }

    public static TRow TryFirstByName<TRow>(this IDbConnection connection, string name)
        where TRow : Row, IIdRow, INameRow, new()
    {
        if (name == null) return null;

        var row = new TRow();

        var id = connection.GetIdByName<TRow>(name);

        if (id != null)
            return connection.ById<TRow>(id);
        else
            return null;
    }

    public static object TryGetId<TRow>(this IDbConnection connection, ICriteria criteria, IField orderByField = null, bool desc = false)
        where TRow : Row, IIdRow, INameRow, new()
    {
        var row = new TRow();

        var query = new SqlQuery()
            .From(row)
            .Select((Field)row.IdField)
            .Where(criteria)
            .Take(1);

        if (orderByField != null) query.OrderBy(orderByField, desc);

        using (var reader = SqlHelper.ExecuteReader(connection, query))
            while (reader.Read())
                return reader.GetValue(0);

        return null;
    }

}
