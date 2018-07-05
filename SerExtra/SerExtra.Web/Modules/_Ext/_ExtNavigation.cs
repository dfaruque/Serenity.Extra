using Serenity.Navigation;
using MyPages = _Ext.DevTools.Pages;

[assembly: NavigationLink(int.MaxValue, "Administration/Audit Log", typeof(_Ext.Pages.AuditLogController), icon: null)]
[assembly: NavigationLink(int.MaxValue, "DevTools/Compare Entity to DB", typeof(MyPages.CompareEntityToDBController), icon: null)]
[assembly: NavigationLink(int.MaxValue, "DevTools/Generate Migrations from Entity", typeof(MyPages.GenerateMigrationFromEntityController), icon: null)]
[assembly: NavigationLink(int.MaxValue, "DevTools/Sergen", typeof(MyPages.SergenController), icon: null)]
