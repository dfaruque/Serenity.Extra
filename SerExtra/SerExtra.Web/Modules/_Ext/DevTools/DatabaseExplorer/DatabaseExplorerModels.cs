
using Serenity.Services;

namespace _Ext.DevTools
{
    public class DatabaseExplorerConnection
    {
        public string Key { get; set; }
    }

    public class DatabaseExplorerTable
    {
        public string Name { get; set; }
    }

    public class DatabaseExplorerField
    {
        public string Name { get; set; }
    }

    public class DatabaseExplorerListTablesRequest : ListRequest
    {
        public string ConnectionKey { get; set; }
    }

    public class DatabaseExplorerListRequest : ListRequest
    {
        public string ConnectionKey { get; set; }
        public string TableName { get; set; }
    }
}