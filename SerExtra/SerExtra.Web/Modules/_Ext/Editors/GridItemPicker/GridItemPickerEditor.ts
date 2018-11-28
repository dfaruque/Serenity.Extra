namespace _Ext {
    @Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element("<div/>")
    export class GridItemPickerEditor extends Serenity.TemplatedWidget<GridItemPickerEditorOptions>
        implements Serenity.IGetEditValue, Serenity.ISetEditValue {
        protected getTemplate() {
            return `<div class="input-group">
                        <input type="hidden" class="value" />
                        <input type="text" class="form-control text" disabled/>
                          <span class="input-group-btn">
                            <button class="btn btn-default" style="height: 27px; padding-top: 3px;" type="button"><i class="fa fa-search"></i></button>
                          </span>
                    </div>`;
        };
        public getEditValue(property, target) { target[property.name] = this.value; }
        public setEditValue(source, property) { this.value = source[property.name]; this.text = source[this.options.nameFieldInThisRow]; }

        constructor(container: JQuery, options: GridItemPickerEditorOptions) {
            super(container, options);

            setTimeout(() => {
                this.element.find('.btn').click(e => {
                    var pickerDialog = new _Ext.GridItemPickerDialog(options);

                    pickerDialog.onSuccess = (selectedItems: any[]) => {
                        this.value = pickerDialog.checkGrid.rowSelection.getSelectedKeys().join(',');
                        this.text = selectedItems.map(m => m[options.nameFieldInGridRow]).join(', ');
                    }
                    pickerDialog.dialogOpen();
                });
            }, 500);
        }

        protected

        public get value(): string {
            let editVal = this.element.find('input.value').val();
            return editVal;
        }

        public set value(val: string) {
            this.element.find('input.value').val(val);
        }

        public get text(): string {
            let editVal = this.element.find('input.text').val();
            return editVal;
        }

        public set text(val: string) {
            this.element.find('input.text').val(val);
        }

    }

    export interface GridItemPickerEditorOptions {
        gridType: any;
        nameFieldInThisRow?: string;

        rowType?: string;
        nameFieldInGridRow?: string;

        multiple: boolean;
        preSelectedKeys?: any[]
    }
}