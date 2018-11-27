interface JQuery {
    insertStatusAddOn(target: JQuery | any[] | Element | Text | string): JQuery;
}
declare function SerenityInlineEditor(args: any): void;

declare namespace Slick {
    interface Column {
        onChange?: any;
    }
    class AutoColumnSize {

    }
}
declare namespace LiteDB {
    interface ObjectId {

    }
}

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
    ShowRowSelectionCheckboxColumn: boolean,
    RowsPerPage?: number
}

interface ExtDialogOptions {
    AutoFitContentArea: boolean,
    HideCategoyLinksBar: boolean,
    PendingChangesConfirmation: boolean,
    ShowCloseButtonInToolbar: boolean,
    ShowSaveAndNewButtonInToolbar: boolean,
    ShowRefreshButtonInToolbar: boolean,
    ShowChangeLogButtonInToolbar: boolean,
    ShowReplaceRowButtonInToolbar: boolean
}


