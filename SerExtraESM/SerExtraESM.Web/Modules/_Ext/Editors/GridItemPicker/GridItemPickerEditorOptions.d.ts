interface GridItemPickerEditorOptions extends Serenity.Select2FilterOptions {
    gridType: any;
    pageImportPath: string;
    nameFieldInThisRow?: string;
    serviceUrl?: string;

    rowType?: string;
    idFieldInGridRow?: string;
    nameFieldInGridRow?: string;

    inplaceView?: boolean;

    multiple?: boolean;
    preSelectedKeys?: any[];

    filteringCriteria?: any;
    customPrams?: any;

    dialogType?: any;

    //from Serenity.Select2FilterOptions
    cascadeFrom?: string;
    cascadeField?: string;
    cascadeValue?: any;
    filterField?: string;
    filterValue?: any;

}
