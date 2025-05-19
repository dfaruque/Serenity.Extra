export var queryString = {};
export var jsPDFHeaderImageData: string = null
export var jsPDFHeaderTitle: string = 'Report Title';
export var ListExcelServiceMethodName: string = null;
export var useSerenityInlineEditors: boolean = true;

export var DefaultMainGridOptions: ExtGridOptions = {
    AutoColumnSize: true,
    FadeInEffectWhenInit: true,
    ShowAnyInEqualityFilterWithTextValue: true,
    ShowInlineActionsColumn: true,
    ShowDeleteInlineButtun: false,
    ShowEditInlineButtun: true,
    ShowPrintInlineButtun: false,
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
    ShowPrintInlineButtun: false,
    ShowRowSelectionCheckboxColumn: false,
    ShowRowNumberColumn: true,
    EnableQuickSearch: false
};

export var DefaultEntityDialogOptions: ExtDialogOptions = {
    PendingChangesConfirmation: true,
    ShowSaveAndNewButtonInToolbar: false,
    ShowCloseButtonInToolbar: false,
    ShowRefreshButtonInToolbar: false,
    ShowChangeLogButtonInToolbar: true,
    ShowReplaceRowButtonInToolbar: false,
    ShowKeyboardLayoutButtonInToolbar: false,
    VerticalForm: false,
    HasSubcategory:false
};

export var DefaultEditorDialogOptions: ExtDialogOptions = {
    PendingChangesConfirmation: true,
    ShowSaveAndNewButtonInToolbar: false,
    ShowCloseButtonInToolbar: false,
    ShowRefreshButtonInToolbar: false,
    ShowChangeLogButtonInToolbar: false,
    ShowReplaceRowButtonInToolbar: false,
    ShowKeyboardLayoutButtonInToolbar: false,
    VerticalForm: false,
    HasSubcategory: false
};

//date time
export var fiscalYearMonths = [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5]
