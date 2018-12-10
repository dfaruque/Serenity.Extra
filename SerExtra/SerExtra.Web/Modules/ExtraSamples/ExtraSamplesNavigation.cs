using Serenity.Navigation;
using SerExtra.ExtraSamples.Pages;

[assembly: NavigationMenu(7900, "Extra Samples", icon: "fa-plus")]
[assembly: NavigationLink(7950, "Extra Samples/Grids/Main Grid Inline Editing", typeof(ExtraSamplesController), action: nameof(ExtraSamplesController.MainGridInlineEditing))]
[assembly: NavigationLink(7950, "Extra Samples/Grids/Main Grid Multi-Editing", typeof(ExtraSamplesController), action: nameof(ExtraSamplesController.MainGridMultiEditing))]

[assembly: NavigationLink(7901, "Extra Samples/Reports/Orders By Customer", typeof(OrdersByCustomerController))]
