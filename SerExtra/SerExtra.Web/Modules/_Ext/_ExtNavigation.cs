using Serenity.Navigation;
using MyPages = _Ext.Pages;

[assembly: NavigationLink(int.MaxValue, "Administration/Audit Log", typeof(MyPages.AuditLogController), icon: null)]
[assembly: NavigationLink(int.MaxValue, "Administration/Compare Entity to DB", typeof(MyPages.CompareEntityToDBController), icon: null)]
