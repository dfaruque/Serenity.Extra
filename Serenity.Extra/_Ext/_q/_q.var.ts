
namespace q {
    export var queryString = {};
    export var jsPDFHeaderImageData: string = null
    export var jsPDFHeaderTitle: string = 'Report Title';

    export var DefaultMainGridOptions: GridOptions = {
        AutoColumnSize: true,
        FadeInEffectWhenInit: true,
        ShowAnyInEqualityFilterWithTextValue: true,
    };

    export var DefaultEditorGridOptions: GridOptions = {
        AutoColumnSize: true,
        FadeInEffectWhenInit: true,
        ShowAnyInEqualityFilterWithTextValue: true,
    };

    export var DefaultEntityDialogOptions: DialogOptions = {
        AutoFitContentArea: true,

    };

    export var DefaultEditorDialogOptions: DialogOptions = {
        AutoFitContentArea: false,

    };

    //date time
    export var fiscalYearMonths = [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5]

}
