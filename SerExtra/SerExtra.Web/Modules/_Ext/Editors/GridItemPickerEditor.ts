namespace _Ext {
    @Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element("<div/>")
    export class GridItemPickerEditor extends Serenity.TemplatedWidget<any>
        implements Serenity.IGetEditValue, Serenity.ISetEditValue {
        protected getTemplate() {
            return `<div class="input-group">
                        <input type="text" class="form-control" />
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>`;
        };
        public getEditValue(property, target) { target[property.name] = this.value; }
        public setEditValue(source, property) { this.value = source[property.name]; }

        constructor(container: JQuery, options: GridItemPickerEditorOptions) {
            super(container);

            setTimeout(() => {
                this.element.find('.fa-search').click(e => {
                    var gridType = Q.typeByFullName(options.gridType);
                    var pickerDialog = new _Ext.GridItemPickerDialog(gridType);

                    pickerDialog.onSuccess = (selectedItems: any[]) => {
                        this.value = pickerDialog.checkGrid.rowSelection.getSelectedKeys()[0];

                    }
                    pickerDialog.dialogOpen();
                });
            }, 500);
        }

        protected

        public get value(): string {
            let editVal = this.element.find('input').val();
            return editVal;
        }

        public set value(val: string) {
            this.element.find('input').val(val);
        }

    }

    export interface GridItemPickerEditorOptions {
        gridType: string;
    }
}