
namespace SerExtraNet5.Common {

    @Serenity.Decorators.registerClass()
    export class ExcelImportDataEditor extends _Ext.JsonGridEditorBase<any> {

        constructor(container: JQuery) {
            container.css({ minHeight: 230 });
            super(container);
        }

        protected getButtons(): Serenity.ToolButton[] {
            return [{
                title: 'Import',
                icon: 'fa-arrow-right',
                cssClass: 'btn-custom',
                onClick: () => {
                    if (this.onImportButtonClick)
                        this.onImportButtonClick();
                }
            }];
        }

        onImportButtonClick: Function;

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