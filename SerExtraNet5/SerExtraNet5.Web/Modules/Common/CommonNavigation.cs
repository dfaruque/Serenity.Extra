using Serenity.Navigation;
using MyPages = SerExtraNet5.Common.Pages;

[assembly: NavigationLink(int.MaxValue, "Common/Excel Import Template", typeof(MyPages.ExcelImportTemplateController), icon: null)]
[assembly: NavigationLink(int.MaxValue, "Common/Excel Import", typeof(MyPages.ExcelImportController), icon: null)]