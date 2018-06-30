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

    public static string GetIdByName<TRow>(this IDbConnection connection, string name)
        where TRow : Row, IIdRow, INameRow, new()
    {
        var row = new TRow();

        var query = new SqlQuery()
            .From(row)
            .Select((Field)row.IdField)
            .Where(((Field)row.NameField).Name + '=' + name.Trim());

        using (var reader = SqlHelper.ExecuteReader(connection, query))
            while (reader.Read())
                return reader.AsString(0);

        return null;
    }

}
