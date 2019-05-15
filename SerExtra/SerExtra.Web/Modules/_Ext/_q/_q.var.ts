
var isPageRefreshRequired: boolean;
//const nameof = <T>(name: keyof T) => name;
//const nameofFactory = <T>() => (name: keyof T) => name;
//usage const nameof = nameofFactory<Edoc.RevenueReportModel>();

namespace q {
    export var queryString = {};
    export var jsPDFHeaderImageData: string = null
    export var jsPDFHeaderTitle: string = 'Report Title';
    export var useSerenityInlineEditors: boolean = true;

    export var DefaultMainGridOptions: ExtGridOptions = {
        AutoColumnSize: true,
        FadeInEffectWhenInit: true,
        ShowAnyInEqualityFilterWithTextValue: true,
        ShowInlineActionsColumn: true,
        ShowDeleteInlineButtun: false,
        ShowEditInlineButtun: true,
        ShowRowNumberColumn: true,
        ShowRowSelectionCheckboxColumn: false,
        EnableQuickSearch: true,
        RowsPerPage: 20
    };

    export var DefaultEditorGridOptions: ExtGridOptions = {
        AutoColumnSize: true,
        FadeInEffectWhenInit: true,
        ShowAnyInEqualityFilterWithTextValue: true,
        ShowInlineActionsColumn: true,
        ShowDeleteInlineButtun: true,
        ShowEditInlineButtun: true,
        ShowRowSelectionCheckboxColumn: false,
        EnableQuickSearch: false,
        ShowRowNumberColumn: true
    };

    export var DefaultEntityDialogOptions: ExtDialogOptions = {
        AutoFitContentArea: true,
        HideCategoyLinksBar: true,
        PendingChangesConfirmation: true,
        ShowSaveAndNewButtonInToolbar: false,
        ShowCloseButtonInToolbar: false,
        ShowRefreshButtonInToolbar: false,
        ShowChangeLogButtonInToolbar: true,
        ShowReplaceRowButtonInToolbar: false

    };

    export var DefaultEditorDialogOptions: ExtDialogOptions = {
        AutoFitContentArea: false,
        HideCategoyLinksBar: true,
        PendingChangesConfirmation: true,
        ShowSaveAndNewButtonInToolbar: false,
        ShowCloseButtonInToolbar: false,
        ShowRefreshButtonInToolbar: false,
        ShowChangeLogButtonInToolbar: false,
        ShowReplaceRowButtonInToolbar: false
    };

    //date time
    export var fiscalYearMonths = [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5]

}
