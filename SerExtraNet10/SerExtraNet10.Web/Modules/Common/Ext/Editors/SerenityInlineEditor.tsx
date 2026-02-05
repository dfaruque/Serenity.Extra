import { deepClone, EditorTypeRegistry, Fluent, Widget } from "@serenity-is/corelib";
import { Editor, EditorOptions, keyCode } from "@serenity-is/sleekgrid";

//Copied from https://github.com/serenity-is/sleekgrid/blob/main/src/editors/editors.ts
function addCompositeChangeListener(editor: Editor, args: EditorOptions, input: HTMLElement) {
    if (!args.compositeEditorOptions)
        return;

    // don't show Save/Cancel when it's a Composite Editor and also trigger a onCompositeEditorChange event when input changes
    input.addEventListener("change", () => {
        triggerCompositeEditorChange(editor, args);
    });
}

function triggerCompositeEditorChange(editor: Editor, args: EditorOptions) {
    var activeCell = args.grid.getActiveCell();

    // when valid, we'll also apply the new value to the dataContext item object
    if (editor.validate().valid)
        editor.applyValue(args.item, editor.serializeValue());
    editor.applyValue(args.compositeEditorOptions.formValues, editor.serializeValue());
    args.grid.onCompositeEditorChange.notify({
        row: activeCell.row,
        cell: activeCell.cell,
        item: args.item,
        column: args.column,
        formValues: args.compositeEditorOptions.formValues
    });
}

/*
* Depending on the value of Grid option 'editorCellNavOnLRKeys', us
* Navigate to the cell on the left if the cursor is at the beginning of the input string
* and to the right cell if it's at the end. Otherwise, move the cursor within the text
*/
function handleKeydownLRNav(e: KeyboardEvent): void {
    var cursorPosition = this.selectionStart;
    var textLength = this.value.length;
    if (((e.key === "Left" || e.key === "ArrowLeft") && cursorPosition > 0) ||
        (e.key === "Right" || e.key === "ArrowRight") && cursorPosition < textLength - 1) {
        e.stopImmediatePropagation();
    }
}

function handleKeydownLRNoNav(e: KeyboardEvent) {
    if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "Right" || e.key === "ArrowRight") {
        e.stopImmediatePropagation();
    }
}

abstract class BaseCellEdit {
    declare protected _input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    declare protected _defaultValue: any;
    declare protected _args: EditorOptions;

    constructor(args: EditorOptions) {
        this._args = args;
        this.init();
    }

    abstract init(): void;

    destroy() {
        this._input.remove();
    }

    focus() {
        this._input.focus();
    }

    getValue() {
        return this._input.value;
    }

    setValue(val: string) {
        this._input.value = val ?? '';
    }

    loadValue(item: any) {
        this._defaultValue = item[this._args.column.field] ?? "";
        this._input.value = this._defaultValue;
        if ((this._input as any).select) {
            (this._input as any).defaultValue = this._defaultValue;
            (this._input as any).select();
        }
    }

    serializeValue(): any {
        return this._input.value;
    }

    applyValue(item: any, state: any) {
        item[this._args.column.field] = state;
    }

    isValueChanged() {
        return (!(this._input.value === "" && this._defaultValue == null))
            && (this._input.value != this._defaultValue);
    }

    validate() {
        if (this._args.column.validator) {
            var validationResults = this._args.column.validator(this._input.value, this._args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }

        return {
            valid: true,
            msg: null
        };
    }
}

//Wrapper CellEdit using serentiy widgets
export class CellEditByWidget extends BaseCellEdit {

    declare _input: HTMLInputElement;
    declare editor: Widget<any>;

    init() {
        const input = this._input = this._args.container.appendChild(<input type="text" class="editor-text slick-editor-text" /> as HTMLInputElement);
        input.addEventListener('keydown', this._args.editorCellNavOnLRKeys ? handleKeydownLRNav : handleKeydownLRNoNav);
        input.focus();
        input.select();

        let columnSourceItem = this._args.column.sourceItem;

        if (columnSourceItem.editorType === undefined)
            columnSourceItem.editorType = 'String';

        var editorType = EditorTypeRegistry.get(columnSourceItem.editorType as string);

        if (columnSourceItem.editorType == 'Boolean')
            input.setAttribute('type', 'checkbox');
        //if (columnSourceItem.editorType != 'Boolean')
        //    input.classList.add('editor-text');

        let editorParams = deepClone(columnSourceItem.editorParams);
        if (editorParams && editorParams.cascadeFrom) {
            let cascadeFrom = editorParams.cascadeFrom;
            editorParams.cascadeField = editorParams.cascadeField || cascadeFrom;
            editorParams.cascadeFrom = null;
            editorParams.cascadeValue = this._args.item[cascadeFrom]
        }

        this.editor = new editorType({
            element: input,
            ...editorParams
        });

        addCompositeChangeListener(this, this._args, input);
    }

    override destroy() {
        this.editor.destroy();
        super.destroy();
    }

    override focus() {
        this.editor.element.focus();
    }

    override getValue() {
        return (this.editor as any).value;
    }

    override setValue(val: string) {
        (this.editor as any).value = val ?? '';
    }

    override loadValue(item: any) {
        this._defaultValue = item[this._args.column.field] ?? "";
        (this.editor as any).value = this._defaultValue;
        if ((this._input as any).select) {
            (this._input as any).defaultValue = this._defaultValue;
            (this._input as any).select();
        }
    }

    override serializeValue(): any {
        return (this.editor as any).value;
    }

    override applyValue(item: any, state: any) {
        item[this._args.column.field] = state;
    }

    override isValueChanged() {
        const editorValue = (this.editor as any).value;
        const isValueEmpty = editorValue === "" || editorValue === null || editorValue === undefined;
        const isDefaultValueEmpty = this._defaultValue === "" || this._defaultValue === null || this._defaultValue === undefined;
        return (!(isValueEmpty && isDefaultValueEmpty)) && (editorValue !== this._defaultValue);
    }
}

export function SerenityInlineEditor(args) {
    var $input: Fluent;
    var editor;
    var defaultValue;
    var scope = this;

    this.init = () => {
        if (args.column.sourceItem.editorType === undefined)
            args.column.sourceItem.editorType = 'String';
        var editorType = EditorTypeRegistry.get(args.column.sourceItem.editorType);

        $input = Fluent("input")
            .appendTo(args.container)
            .addClass('editor')
            .on("keydown.nav", function (e: any) {
                if (e.keyCode === keyCode.LEFT || e.keyCode === keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            })
            .focus();

        if (args.column.sourceItem.editorType == 'Boolean')
            $input.attr('type', 'checkbox');

        let editorParams = deepClone(args.column.sourceItem.editorParams);
        if (editorParams && editorParams.cascadeFrom) {
            let cascadeFrom = editorParams.cascadeFrom;
            editorParams.cascadeField = editorParams.cascadeField || cascadeFrom;
            editorParams.cascadeFrom = null;
            editorParams.cascadeValue = args.item[cascadeFrom]
        }

        editor = new editorType({
            element: $input,
            ...editorParams
        });

        if (args.column.sourceItem.editorType != 'Boolean')
            $input.addClass('editor-text');
    }

    this.destroy = () => {
        //$input.removeData();
        $input.remove();
    }

    this.focus = () => {
        $input.focus();
    }

    this.getValue = () => {
        var v = editor.value;
        return v;
    }

    this.setValue = (val) => {
        editor.value = val;
    }

    this.loadValue = (item) => {
        defaultValue = item[args.column.sourceItem.name] || "";
        editor.value = defaultValue;
        if (($input as any).select) {
            ($input as any).defaultValue = this._defaultValue;
            ($input as any).select();
        }
    }

    this.serializeValue = () => {
        var v = editor.value;
        return v;
    }

    this.applyValue = (item, state) => {
        item[args.column.field] = state;
    }

    this.isValueChanged = () => {
        var isValueEmpty = editor.value === "" || editor.value === null || editor.value === undefined;
        var isDefaultValueEmpty = defaultValue === "" || defaultValue === null || defaultValue === undefined;
        return (!(isValueEmpty && isDefaultValueEmpty)) && (editor.value !== defaultValue);
    }

    this.validate = () => {
        return {
            valid: true,
            msg: null
        };
    }

    this.init();
}
