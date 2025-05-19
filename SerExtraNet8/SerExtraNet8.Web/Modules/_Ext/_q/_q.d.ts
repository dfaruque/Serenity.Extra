
interface ExtGridEditorOptions {
    isReadOnly?: boolean; //false
    height?: number;
    autoHeight?: boolean;//true
    width?: number;
    showCaption?: boolean;//false
    hideToolbar?: boolean;//false
}

interface ExtGridOptions {
    AutoColumnSize: boolean,
    FadeInEffectWhenInit: boolean,
    ShowAnyInEqualityFilterWithTextValue: boolean,
    ShowRowNumberColumn:boolean,
    ShowInlineActionsColumn: boolean,
    ShowEditInlineButtun: boolean,
    ShowDeleteInlineButtun: boolean,
    ShowPrintInlineButtun: boolean,
    ShowRowSelectionCheckboxColumn: boolean,
    EnableQuickSearch?: boolean,
    RowsPerPage?: number
}

interface ExtDialogOptions {
    PendingChangesConfirmation: boolean,
    ShowCloseButtonInToolbar: boolean,
    ShowSaveAndNewButtonInToolbar: boolean,
    ShowRefreshButtonInToolbar: boolean,
    ShowChangeLogButtonInToolbar: boolean,
    ShowReplaceRowButtonInToolbar: boolean,
    ShowKeyboardLayoutButtonInToolbar: boolean,
    VerticalForm: boolean,
    HasSubcategory: boolean,
}