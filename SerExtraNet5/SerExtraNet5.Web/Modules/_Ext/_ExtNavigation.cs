using Serenity.Navigation;
using MyPages = _Ext.DevTools.Pages;

[assembly: NavigationLink(int.MaxValue, "Administration/Audit Log", typeof(_Ext.Pages.AuditLogController), icon: "fa-history")]

[assembly: NavigationMenu(int.MaxValue, "DevTools", icon: "fa-code")]
[assembly: NavigationLink(int.MaxValue, "DevTools/Compare Entity to DB", typeof(MyPages.CompareEntityToDBController), icon: null)]
[assembly: NavigationLink(int.MaxValue, "DevTools/Generate Migrations from Entity", typeof(MyPages.GenerateMigrationFromEntityController), icon: null)]
[assembly: NavigationLink(int.MaxValue, "DevTools/Code Snippets", typeof(MyPages.CodeSnippetsController), icon: null)]
[assembly: NavigationLink(int.MaxValue, "DevTools/Sergen", typeof(MyPages.SergenController), icon: null)]
