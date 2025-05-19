import { CascadedWidgetLink, ComboboxEditorOptions, Decorators, EditorUtils, Fluent, getType, IGetEditValue, IReadOnly, isEmptyOrNull, ISetEditValue, IStringValue, IValidateRequired, resolveUrl, RetrieveColumnSelection, RetrieveRequest, RetrieveResponse, serviceCall, Widget, WidgetProps } from "@serenity-is/corelib";
import { DialogBase } from "../../Bases/DialogBase";
import { GridItemPickerDialog } from "./GridItemPickerDialog";

@Decorators.registerEditor('_Ext.GridItemPickerEditor', [ISetEditValue, IGetEditValue, IStringValue, IReadOnly, IValidateRequired])
@Decorators.element("<input type=\"text\" />")
export class GridItemPickerEditor<P extends GridItemPickerEditorOptions = GridItemPickerEditorOptions>
    extends Widget<P>
    implements ISetEditValue, IGetEditValue, IStringValue, IReadOnly, IValidateRequired {

    containerDiv: Fluent;
    inplaceSearchButton: Fluent;
    inplaceViewButton: Fluent;
    clearSelectionButton: Fluent;

    constructor(props: WidgetProps<P>) {
        super(props);

        this.importPagejs(props);

        this.element.addClass('select2-offscreen');

        this.containerDiv = Fluent(<div class={["editor s-GridItemPickerEditor select2-container", props.multiple ? 'select2-container-multi' : '', "has-inplace-button"]}>
            <div class={[props.multiple ? 'select2-choices' : 'select2-choice']}>
                <div class="display-text" style="user-select: text; padding-right: 20px;${props.multiple ? 'padding-left: 5px;' : ''}"></div>
                <a class="select2-search-choice-close btn-clear-selection" style="margin-top: 2px; cursor: pointer; left: unset;"></a>
            </div>
        </div>);

        this.containerDiv.insertBefore(this.element);

        this.addInplaceButtons();

        this.setCascadeFrom(this.options.cascadeFrom);

    }

    protected importPagejs(options: GridItemPickerEditorOptions): void {

        let pageImportPath = options.pageImportPath;

        if (pageImportPath.startsWith("@/")) {
            pageImportPath = "~/esm/Modules/" + pageImportPath.substring(2);
            if (!pageImportPath.endsWith(".js"))
                pageImportPath += ".js";
        }

        pageImportPath = resolveUrl(pageImportPath);

        import(pageImportPath);
    }

    protected addInplaceButtons(): void {
        var self = this;

        this.inplaceSearchButton = Fluent(<a class="inplace-button inplace-search align-center"
            title="search"
            style="padding-top: 2px;">
            <i class="fa fa-search"></i>
        </a>);

        this.inplaceSearchButton.insertAfter(this.containerDiv)
            .click(function (e) {
                self.inplaceSearchClick(e);
            });

        this.inplaceViewButton = Fluent(<a class="inplace-button inplace-view align-center"
            title="view"
            style="padding-top: 2px;">
            <i class="fa fa-eye"></i>
        </a>);

        this.inplaceViewButton.click(function (e) {
            self.inplaceViewClick(e);
        }).hide();

        if (this.options.inplaceView != false && !this.options.multiple) {
            this.inplaceViewButton.insertAfter(this.containerDiv);
        }

        this.clearSelectionButton = this.containerDiv.findFirst('.select2-search-choice-close')
            .click(e => {
                this.value = '';
                this.text = '';

                this._selectedItem = null;
                this.selectedItems = [];

                Fluent(e.target).hide();

                this.element.trigger('change');
                //this.element.triggerHandler('change');
            })
            .hide();

    }

    protected inplaceSearchClick(e: any): void {
        this.options.preSelectedKeys = this.values;
        var pickerDialog = new GridItemPickerDialog(this.options);

        pickerDialog.onSuccess = (selectedItems: any[]) => {
            this.value = pickerDialog.checkGrid.rowSelection.getSelectedKeys().join(',');
            this.text = selectedItems.map(m => m[this.options.nameFieldInGridRow]).join(', ');

            if (isEmptyOrNull(this.text)) {
                console.warn('nameFieldInGridRow might be wrong in ' + this.uniqueName);
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

        if (!isEmptyOrNull(val)) {
            var dlg = this.getDialogInstance();
            dlg.isReadOnly = true;
            dlg.loadByIdAndOpenDialog(val, false);
        }
    }

    private getDialogInstance(): DialogBase<any, any> {
        var dialogType = this.options.dialogType;

        if (!dialogType.prototype)
            dialogType = getType(this.options.dialogType);

        try {
            var dlg = new dialogType() as DialogBase<any, any>;
            return dlg;
        } catch (ex) {
            console.warn('Could not intialize ' + this.options.dialogType);
        }
    }

    public get value(): string {
        let editVal = this.element.val();
        return editVal;
    }

    public set value(val: string) {
        this.element.val(val);

        if (isEmptyOrNull(val)) {
            this.text = '';
            this.inplaceViewButton.hide()
            this.clearSelectionButton.hide()
        } else {
            this.inplaceViewButton.show()
            if (this.get_readOnly() == false)
                this.clearSelectionButton.show()
        }

    }

    public get values(): string[] {
        let valCVS = this.value;
        if (isEmptyOrNull(valCVS))
            return [];
        else
            return valCVS.split(',');
    }

    public set values(val: string[]) {
        this.value = val.join(',');
    }

    public get text(): string {
        let editVal = this.containerDiv.findFirst('.display-text').text();
        return editVal;
    }

    public set text(val: string) {
        this.containerDiv.findFirst('.display-text').text(val);
    }

    public getEditValue(property, target) {
        if (this.options.multiple == true) {
            target[property.name] = this.values;
        } else {
            target[property.name] = this.value;
        }
    }
    public setEditValue(source, property) {
        this.value = source[property.name];

        let text = source[this.options.nameFieldInThisRow];
        this.text = text;

        if (source[property.name]) {
            this._selectedItem = {};
            this._selectedItem[this.options.idFieldInGridRow] = source[property.name];
            this._selectedItem[this.options.nameFieldInGridRow] = text;
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
            this.element.addClass('readonly');
            this.containerDiv.addClass('select2-container-disabled');
            this.inplaceSearchButton.addClass('disabled').hide();
            this.clearSelectionButton.addClass('disabled').hide();
        } else {
            this.element.removeClass('readonly')
            this.containerDiv.removeClass('select2-container-disabled');
            this.inplaceSearchButton.removeClass('disabled').show();
            this.clearSelectionButton.removeClass('disabled').show();
        }
    }

    get_required(): boolean {
        return this.element.hasClass('required');
    }
    set_required(value: boolean): void {
        if (value) {
            this.element.addClass('required');
            this.containerDiv.addClass('required');
            this.containerDiv.findFirst('.select2-choice, display-text').addClass('required');
        } else {
            this.element.removeClass('required');
            this.containerDiv.removeClass('required');
            this.containerDiv.findFirst('.select2-choice, display-text').removeClass('required');
        }
    }


    private _selectedItem;
    public selectedItemIncludeColumns: string[] = [];

    public get selectedItem() {
        if (this._selectedItem
            && this._selectedItem[this.options.nameFieldInGridRow]
            && this.selectedItemIncludeColumns.every(e => this._selectedItem[e])
        )
            return this._selectedItem;
        else if (!isEmptyOrNull(this.value)) {

            serviceCall<RetrieveResponse<any>>({
                service: this.serviceUrl + '/Retrieve',
                request: {
                    EntityId: this.value,
                    ColumnSelection: RetrieveColumnSelection.list,
                    IncludeColumns: this.selectedItemIncludeColumns
                } as RetrieveRequest,
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
        if (isEmptyOrNull(this._serviceUrl)) {
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
    protected getCascadeFromValue(parent: Widget<any>) {
        return EditorUtils.getValue(parent);
    }

    protected cascadeLink: CascadedWidgetLink<Widget<any>>;

    protected setCascadeFrom(value: string) {

        if (isEmptyOrNull(value)) {
            if (this.cascadeLink != null) {
                this.cascadeLink.set_parentID(null);
                this.cascadeLink = null;
            }
            (this.options as ComboboxEditorOptions).cascadeFrom = null;
            return;
        }

        this.cascadeLink = new CascadedWidgetLink<Widget<any>>(Widget, this, p => {
            this.set_cascadeValue(this.getCascadeFromValue(p));
        });

        this.cascadeLink.set_parentID(value);
        (this.options as ComboboxEditorOptions).cascadeFrom = value;
    }

    protected get_cascadeFrom(): string {
        return (this.options as ComboboxEditorOptions).cascadeFrom;
    }

    get cascadeFrom(): string {
        return this.get_cascadeFrom();
    }

    protected set_cascadeFrom(value: string) {
        if (value !== (this.options as ComboboxEditorOptions).cascadeFrom) {
            this.setCascadeFrom(value);
            this.updateItems();
        }
    }

    set cascadeFrom(value: string) {
        this.set_cascadeFrom(value);
    }

    protected get_cascadeField() {
        return (this.options as ComboboxEditorOptions).cascadeField ?? (this.options as ComboboxEditorOptions).cascadeFrom;
    }

    get cascadeField(): string {
        return this.get_cascadeField();
    }

    protected set_cascadeField(value: string) {
        (this.options as ComboboxEditorOptions).cascadeField = value;
    }

    set cascadeField(value: string) {
        this.set_cascadeField(value);
    }

    protected get_cascadeValue(): any {
        return (this.options as ComboboxEditorOptions).cascadeValue;
    }

    get cascadeValue(): any {
        return this.get_cascadeValue();
    }

    protected set_cascadeValue(value: any) {
        if ((this.options as ComboboxEditorOptions).cascadeValue !== value) {
            (this.options as ComboboxEditorOptions).cascadeValue = value;
            this.set_value(null);
            this.updateItems();

        }
    }

    set cascadeValue(value: any) {
        this.set_cascadeValue(value);
    }

    protected get_filterField() {
        return (this.options as ComboboxEditorOptions).filterField;
    }

    get filterField(): string {
        return this.get_filterField();
    }

    protected set_filterField(value: string) {
        (this.options as ComboboxEditorOptions).filterField = value;
    }

    set filterField(value: string) {
        this.set_filterField(value);
    }

    protected get_filterValue(): any {
        return (this.options as ComboboxEditorOptions).filterValue;
    }

    get filterValue(): any {
        return this.get_filterValue();
    }

    protected set_filterValue(value: any) {
        if ((this.options as ComboboxEditorOptions).filterValue !== value) {
            (this.options as ComboboxEditorOptions).filterValue = value;
            this.set_value(null);
            this.updateItems();

        }
    }

    set filterValue(value: any) {
        this.set_filterValue(value);
    }

    protected updateItems() {
    }

}