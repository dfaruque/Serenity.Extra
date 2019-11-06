namespace _Ext {
    @Serenity.Decorators.registerClass([Serenity.ISetEditValue, Serenity.IGetEditValue, Serenity.IStringValue, Serenity.IReadOnly, Serenity.IValidateRequired])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element('<div/>')
    export class GridItemPickerEditor extends Serenity.TemplatedWidget<GridItemPickerEditorOptions>
        implements Serenity.ISetEditValue, Serenity.IGetEditValue, Serenity.IStringValue, Serenity.IReadOnly, Serenity.IValidateRequired {
        protected getTemplate() {
            return `<input type="text" class="value select2-offscreen" />
                    <span class="select2-choice">
                        <span class="display-text" style="user-select: text; padding-right: 20px;"></span>
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

            this.setCascadeFrom((this.options as Serenity.Select2EditorOptions).cascadeFrom);

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
                })
                .hide();

            if (this.options.inplaceView != false && !this.options.multiple) {
                this.inplaceViewButton.insertAfter(this.element);
            }

            this.clearSelectionButton = this.element.find('.select2-search-choice-close')
                .click(e => {
                    this.value = null;
                    this.text = '';

                    this._selectedItem = null;
                    this.selectedItems = [];

                    $(e.target).hide();

                    this.element.trigger('change');
                    //this.element.triggerHandler('change');
                })
                .hide();

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
                this.text = '';
                this.inplaceViewButton.hide()
                this.clearSelectionButton.hide()
            } else {
                this.inplaceViewButton.show()
                if (this.get_readOnly() == false)
                    this.clearSelectionButton.show()
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
        public setEditValue(source, property) {
            this.value = source[property.name];
            this.text = source[this.options.nameFieldInThisRow];

            if (source[property.name] && source[this.options.nameFieldInThisRow]) {
                this._selectedItem = {};
                this._selectedItem[this.options.idFieldInGridRow] = source[property.name];
                this._selectedItem[this.options.nameFieldInGridRow] = source[this.options.nameFieldInThisRow];
            }
        }

        get_value() {
            return this.value;
        }

        set_value(value: string) {
            this.value = value;
        }

        get_readOnly(): boolean {
            return this.element.hasClass('readonly');
        }
        set_readOnly(value: boolean): void {
            if (value) {
                this.element.addClass('select2-container-disabled readonly');
                this.inplaceSearchButton.addClass('disabled').hide();
                this.clearSelectionButton.addClass('disabled').hide();
            } else {
                this.element.removeClass('select2-container-disabled readonly')
                this.inplaceSearchButton.removeClass('disabled').show();
                this.clearSelectionButton.removeClass('disabled').show();
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
        public selectedItemIncludeColumns: string[] = [];

        public get selectedItem() {
            if (this._selectedItem
                && this._selectedItem[this.options.nameFieldInGridRow]
                && this.selectedItemIncludeColumns.every(e => this._selectedItem[e])
            )
                return this._selectedItem;
            else if (!Q.isEmptyOrNull(this.value)) {

                Q.serviceCall<Serenity.RetrieveResponse<any>>({
                    service: this.serviceUrl + '/Retrieve',
                    request: {
                        EntityId: this.value,
                        ColumnSelection: Serenity.RetrieveColumnSelection.list,
                        IncludeColumns: this.selectedItemIncludeColumns
                    } as Serenity.RetrieveRequest,
                    async: false,
                    onSuccess: (response) => {
                        this._selectedItem = response.Entity;
                    }
                });

                return this._selectedItem;
            }
        }

        public selectedItems: any[];

        private _serviceUrl: string;
        get serviceUrl(): string {
            if (Q.isEmptyOrNull(this._serviceUrl)) {
                var dlg = this.getDialogInstance();
                this._serviceUrl = dlg['getService']();
            }
            return this._serviceUrl;
        }

        setValueAndText(value, text) {
            this.value = value;
            this.text = text;
        }

        //-------------------------------cascading and filtering -----------------------------------
        protected getCascadeFromValue(parent: Serenity.Widget<any>) {
            return Serenity.EditorUtils.getValue(parent);
        }

        protected cascadeLink: Serenity.CascadedWidgetLink<Serenity.Widget<any>>;

        protected setCascadeFrom(value: string) {

            if (Q.isEmptyOrNull(value)) {
                if (this.cascadeLink != null) {
                    this.cascadeLink.set_parentID(null);
                    this.cascadeLink = null;
                }
                (this.options as Serenity.Select2EditorOptions).cascadeFrom = null;
                return;
            }

            this.cascadeLink = new Serenity.CascadedWidgetLink<Serenity.Widget<any>>(Serenity.Widget, this, p => {
                this.set_cascadeValue(this.getCascadeFromValue(p));
            });

            this.cascadeLink.set_parentID(value);
            (this.options as Serenity.Select2EditorOptions).cascadeFrom = value;
        }

        protected get_cascadeFrom(): string {
            return (this.options as Serenity.Select2EditorOptions).cascadeFrom;
        }

        get cascadeFrom(): string {
            return this.get_cascadeFrom();
        }

        protected set_cascadeFrom(value: string) {
            if (value !== (this.options as Serenity.Select2EditorOptions).cascadeFrom) {
                this.setCascadeFrom(value);
                this.updateItems();
            }
        }

        set cascadeFrom(value: string) {
            this.set_cascadeFrom(value);
        }

        protected get_cascadeField() {
            return Q.coalesce((this.options as Serenity.Select2EditorOptions).cascadeField, (this.options as Serenity.Select2EditorOptions).cascadeFrom);
        }

        get cascadeField(): string {
            return this.get_cascadeField();
        }

        protected set_cascadeField(value: string) {
            (this.options as Serenity.Select2EditorOptions).cascadeField = value;
        }

        set cascadeField(value: string) {
            this.set_cascadeField(value);
        }

        protected get_cascadeValue(): any {
            return (this.options as Serenity.Select2EditorOptions).cascadeValue;
        }

        get cascadeValue(): any {
            return this.get_cascadeValue();
        }

        protected set_cascadeValue(value: any) {
            if ((this.options as Serenity.Select2EditorOptions).cascadeValue !== value) {
                (this.options as Serenity.Select2EditorOptions).cascadeValue = value;
                this.set_value(null);
                this.updateItems();

                this.options.filteringCriteria = [[this.cascadeField], '=', value];
            }
        }

        set cascadeValue(value: any) {
            this.set_cascadeValue(value);
        }

        protected get_filterField() {
            return (this.options as Serenity.Select2EditorOptions).filterField;
        }

        get filterField(): string {
            return this.get_filterField();
        }

        protected set_filterField(value: string) {
            (this.options as Serenity.Select2EditorOptions).filterField = value;
        }

        set filterField(value: string) {
            this.set_filterField(value);
        }

        protected get_filterValue(): any {
            return (this.options as Serenity.Select2EditorOptions).filterValue;
        }

        get filterValue(): any {
            return this.get_filterValue();
        }

        protected set_filterValue(value: any) {
            if ((this.options as Serenity.Select2EditorOptions).filterValue !== value) {
                (this.options as Serenity.Select2EditorOptions).filterValue = value;
                this.set_value(null);
                this.updateItems();

                this.options.filteringCriteria = [[this.cascadeField], '=', value];

            }
        }

        set filterValue(value: any) {
            this.set_filterValue(value);
        }

        protected updateItems() {
        }

    }

    export interface GridItemPickerEditorOptions extends Serenity.Select2FilterOptions {
        gridType: any;
        nameFieldInThisRow?: string;
        serviceUrl?: string;

        rowType?: string;
        idFieldInGridRow?: string;
        nameFieldInGridRow?: string;

        inplaceView?: boolean;

        multiple?: boolean;
        preSelectedKeys?: any[];

        filteringCriteria?: any;

        dialogType?: any;

        //from Serenity.Select2FilterOptions
        cascadeFrom?: string;
        cascadeField?: string;
        cascadeValue?: any;
        filterField?: string;
        filterValue?: any;

    }
}