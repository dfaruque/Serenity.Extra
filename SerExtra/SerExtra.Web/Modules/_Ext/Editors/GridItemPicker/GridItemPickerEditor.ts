namespace _Ext {
    @Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element("<div/>")
    export class GridItemPickerEditor extends Serenity.TemplatedWidget<GridItemPickerEditorOptions>
        implements Serenity.IGetEditValue, Serenity.ISetEditValue {
        protected getTemplate() {
            return `<input type="hidden" class="value" />
                    <span class="select2-choice">
                        <span class="display-text" style="user-select: text;"></span>
                        <a class="select2-search-choice-close" style="margin-top: 2px; cursor: pointer"></a>
                    </span>
                    `;
        };

        constructor(container: JQuery, options: GridItemPickerEditorOptions) {
            super(container, options);

            this.addInplaceSearch();
        }

        protected addInplaceSearch(): void {
            var self = this;
            this.element.addClass('select2-container has-inplace-button');

            $('<a style="padding-top: 2px;"><i class="fa fa-search"></i></a>')
                .addClass('inplace-button inplace-search align-center').attr('title', 'search')
                .insertAfter(this.element)
                .click(function (e) {
                    self.inplaceSearchClick(e);
                });

            this.element.find('.select2-search-choice-close').click(e => {
                this.value = null;
                this.text = '';
                $(e.target).hide();

                this.element.trigger('change');
                this.element.triggerHandler('change');
            });

        }

        protected inplaceSearchClick(e: any): void {
            var pickerDialog = new _Ext.GridItemPickerDialog(this.options);

            pickerDialog.onSuccess = (selectedItems: any[]) => {
                this.value = pickerDialog.checkGrid.rowSelection.getSelectedKeys().join(',');
                this.text = selectedItems.map(m => m[this.options.nameFieldInGridRow]).join(', ');


                this.element.trigger('change');
                this.element.triggerHandler('change');

            }
            pickerDialog.dialogOpen();

        }

        public get value(): string {
            let editVal = this.element.find('input.value').val();
            return editVal;
        }

        public set value(val: string) {
            this.element.find('input.value').val(val);

            if (val && val.length > 0)
                this.element.find('.select2-search-choice-close').show()

        }

        public get text(): string {
            let editVal = this.element.find('span.display-text').text();
            return editVal;
        }

        public set text(val: string) {
            this.element.find('span.display-text').text(val);
        }

        public getEditValue(property, target) { target[property.name] = this.value; }
        public setEditValue(source, property) { this.value = source[property.name]; this.text = source[this.options.nameFieldInThisRow]; }
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