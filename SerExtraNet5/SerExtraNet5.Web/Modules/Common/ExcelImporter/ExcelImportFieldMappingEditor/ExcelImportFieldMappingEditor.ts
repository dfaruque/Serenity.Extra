
namespace _Ext.ExcelImporter {

    @Serenity.Decorators.registerClass()
    export class ExcelImportFieldMappingEditor extends _Ext.GridEditorBase<ExcelImportFieldMappingRow> {
        protected getColumnsKey() { return ExcelImportFieldMappingColumns.columnsKey; }
        //protected getDialogType() { return ExcelImportFieldMappingEditorDialog; }
        protected getLocalTextPrefix() { return ExcelImportFieldMappingRow.localTextPrefix; }

        constructor(container: JQuery) {
            container.css({ minHeight: 230 });
            super(container);
            this.toolbar.element.hide();
        }

        protected getSlickOptions() {
            let options = super.getSlickOptions();

            options.editable = true;

            return options;
        }

        protected get_ExtGridOptions() {
            let options = super.get_ExtGridOptions();

            options.ShowInlineActionsColumn = false;

            return options;
        }

    }
}