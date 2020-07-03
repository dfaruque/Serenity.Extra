using Serenity.Navigation;
using SerExtraCore.ExtraSamples.Pages;

[assembly: NavigationMenu(7900, "Extra Samples", icon: "fa-plus")]
[assembly: NavigationLink(7950, "Extra Samples/Grids/Main Grid Inline Editing", typeof(ExtraSamplesController), action: nameof(ExtraSamplesController.MainGridInlineEditing))]
[assembly: NavigationLink(7960, "Extra Samples/Grids/Main Grid Multi-Editing", typeof(ExtraSamplesController), action: nameof(ExtraSamplesController.MainGridMultiEditing))]
[assembly: NavigationLink(7960, "Extra Samples/Grids/Custom Templated Grid", typeof(ExtraSamplesController), action: nameof(ExtraSamplesController.CustomTemplatedGrid))]
//[assembly: NavigationLink(7970, "Extra Samples/Pages/React Sample Page", typeof(ExtraSamplesController), action: nameof(ExtraSamplesController.ReactSamplePage))]
//[assembly: NavigationLink(7970, "Extra Samples/Pages/Chat Sample Page", typeof(ExtraSamplesController), action: nameof(ExtraSamplesController.ChatSamplePage))]

[assembly: NavigationLink(7901, "Extra Samples/Reports/Orders By Customer", typeof(OrdersByCustomerController))]
