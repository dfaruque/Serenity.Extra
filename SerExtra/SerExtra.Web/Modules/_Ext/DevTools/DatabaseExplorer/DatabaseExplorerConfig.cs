
namespace _Ext.DevTools
{
    using Serenity.ComponentModel;
    using System.Collections.Generic;

    [SettingKey("DatabaseExplorer"), SettingScope("Application")]
    public class DatabaseExplorerConfig
    {
        public string[] IncludeConnections { get; set; }
        public string[] ExcludeConnections { get; set; }
        public Dictionary<string, string[]> ExcludeTables { get; set; }
    }
}