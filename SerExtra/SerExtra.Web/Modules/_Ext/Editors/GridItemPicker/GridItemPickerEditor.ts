namespace _Ext {
    @Serenity.Decorators.registerClass([Serenity.ISetEditValue, Serenity.IGetEditValue, Serenity.IStringValue, Serenity.IReadOnly, Serenity.IValidateRequired])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element('<div/>')
    export class GridItemPickerEditor extends Serenity.TemplatedWidget<GridItemPickerEditorOptions>
        implements Serenity.ISetEditValue, Serenity.IGetEditValue, Serenity.IStringValue, Serenity.IReadOnly, Serenity.IValidateRequired {
        protected getTemplate() {
            return `<input type="text" class="value select2-offscreen" />
                    <span class="select2-choice">
                        <span class="display-text" style="user-select: text;"></span>
                        <a class="select2-search-choice-close btn-clear-selection" style="margin-top: 2px; cursor: pointer"></a>
                    </span>
                    `;
        };

        inplaceSearchButton: JQuery;
        inplaceViewButton: JQuery;
        clearSelectionButton: JQuery;

        constructor(container: JQuery, public options: GridItemPickerEditorOptions) {
            super(container, options);

            this.addInplaceButtons();
        }

        protected addInplaceButtons(): void {
            var self = this;
            this.element.addClass('select2-container has-inplace-button');

            this.inplaceSearchButton = $('<a style="padding-top: 2px;"><i class="fa fa-search"></i></a>')
                .addClass('inplace-button inplace-search align-center').attr('title', 'search')
                .insertAfter(this.element)
                .click(function (e) {
                    self.inplaceSearchClick(e);
                });

            this.inplaceViewButton = $('<a style="padding-top: 2px;"><i class="fa fa-eye"></i></a>')
                .addClass('inplace-button inplace-view align-center').attr('title', 'view')
                .click(function (e) {
                    self.inplaceViewClick(e);
                });

            if (this.options.inplaceView != false && !this.options.multiple) {
                this.inplaceViewButton.insertAfter(this.element);
            }

            this.clearSelectionButton = this.element.find('.select2-search-choice-close').click(e => {
                this.value = null;
                this.text = '';

                this._selectedItem = null;
                this.selectedItems = [];

                $(e.target).hide();

                this.element.trigger('change');
                //this.element.triggerHandler('change');
            });

        }

        protected inplaceSearchClick(e: any): void {
            var pickerDialog = new _Ext.GridItemPickerDialog(this.options);

            pickerDialog.onSuccess = (selectedItems: any[]) => {
                this.value = pickerDialog.checkGrid.rowSelection.getSelectedKeys().join(',');
                this.text = selectedItems.map(m => m[this.options.nameFieldInGridRow]).join(', ');

                if (Q.isEmptyOrNull(this.text)) {
                    console.warn('nameFieldInGridRow might be wrong in ' + this.widgetName);
                }

                this._selectedItem = selectedItems[0];
                this.selectedItems = selectedItems;

                this.element.trigger('change');
                //this.element.triggerHandler('change');

            }
            pickerDialog.dialogOpen();

        }

        protected inplaceViewClick(e: any): void {
            var val = this.value;

            if (!Q.isEmptyOrNull(val)) {
                var dlg = this.getDialogInstance();
                dlg.isReadOnly = true;
                dlg.loadByIdAndOpenDialog(val, false);
            }
        }

        private getDialogInstance(): DialogBase<any, any> {
            var dialogType = this.options.dialogType;

            if (!dialogType.prototype)
                dialogType = Q.typeByFullName(this.options.dialogType);

            try {
                var dlg = new dialogType() as DialogBase<any, any>;
                return dlg;
            } catch (ex) {
                console.warn('Could not intialize ' + this.options.dialogType);
            }
        }

        public get value(): string {
            let editVal = this.element.find('input.value').val();
            return editVal;
        }

        public set value(val: string) {
            this.element.find('input.value').val(val);

            if (Q.isEmptyOrNull(val)) {
                this.clearSelectionButton.hide()
                this.inplaceViewButton.hide()
            } else {
                this.clearSelectionButton.show()
                this.inplaceViewButton.show()
            }

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

        get_value() {
            return this.value;
        }

        set_value(value: string) {
            this.value = value;
        }

        get_readOnly(): boolean {
            return this.inplaceSearchButton.hasClass('disabled');;
        }
        set_readOnly(value: boolean): void {
            if (value) {
                this.inplaceSearchButton.addClass('disabled');
                this.clearSelectionButton.addClass('disabled');
                var field = this.getGridField();
                field.find('*').off();
            }
        }

        get_required(): boolean {
            return this.element.find('input.value').hasClass('required');
        }
        set_required(value: boolean): void {
            if (value) {
                this.element.find('input.value, .select2-choice, span.display-text').addClass('required');
            };
        }

        private _selectedItem;

        public get selectedItem() {
            if (this._selectedItem)
                return this._selectedItem;
            else if (!Q.isEmptyOrNull(this.value)) {
                var dlg = this.getDialogInstance();

                Q.serviceCall<Serenity.RetrieveResponse<any>>({
                    service: dlg['getService']() + '/Retrieve',
                    request: { EntityId: this.value },
                    async: false,
                    onSuccess: (response) => {
                        this._selectedItem = response.Entity;
                    }
                });

                return this._selectedItem;
            }
        }

        public selectedItems: any[];

    }

    export interface GridItemPickerEditorOptions {
        gridType: any;
        nameFieldInThisRow?: string;

        rowType?: string;
        nameFieldInGridRow?: string;

        inplaceView?: boolean;

        multiple?: boolean;
        preSelectedKeys?: any[];

        filteringCriteria?: any;

        dialogType?: any;
    }
}