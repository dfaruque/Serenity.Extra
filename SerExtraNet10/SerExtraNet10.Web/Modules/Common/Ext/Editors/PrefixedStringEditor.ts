import { Decorators, Fluent, getType, IGetEditValue, IReadOnly, ISetEditValue, Widget, WidgetProps } from "@serenity-is/corelib"

@Decorators.registerEditor('Ext.PrefixedStringEditor', [IGetEditValue, ISetEditValue, IReadOnly])
@Decorators.element('<input type="text"/>')
export class PrefixedStringEditor<P extends PrefixedStringEditorOptions = PrefixedStringEditorOptions>
    extends Widget<P>
    implements IGetEditValue, ISetEditValue, IReadOnly {
    public getEditValue(property, target) { target[property.name] = this.value; }
    public setEditValue(source, property) { this.value = source[property.name]; }

    private prefixInput: Fluent<HTMLInputElement>;

    constructor(props: WidgetProps<P>) {
        super(props);

        let fontSize = parseFloat(window.getComputedStyle(this.element[0]).fontSize);
        let prefixInputWidth = this.options.prefixLength * fontSize;

        this.prefixInput = Fluent('input')
            .attr('type', "text")
            .addClass('prefix readonly')
            .attr('style', `width:${prefixInputWidth}px;`)
            .attr('disabled', 'disabled')
            .insertBefore(this.element);

        this.element.addClass('has-inplace-button');

        if (this.options.inputMaxLength) {
            setTimeout(() => { this.element.attr('maxlength', this.options.inputMaxLength); }, 1000);

        }
    }

    public get value(): string {
        let inputVal = this.element.val();
        return this.prefix + inputVal;
    }

    public set value(val: string) {
        if (val) {
            val = val.replace(' ', '');

            let prefix = val.substr(0, this.options.prefixLength);
            let inputVal = val.substr(this.options.prefixLength);

            this.prefix = prefix;
            this.element.val(inputVal);
        } else {
            this.element.val(val);
        }
    }

    private _prefix = '';
    public get prefix(): string {
        return this._prefix;
    }

    public set prefix(val: string) {
        this._prefix = val;
        if (this.options.prefixFormatterType) {
            let formatterType = getType(this.options.prefixFormatterType);
            if (formatterType)
                this.prefixInput.val((formatterType as any).format(val));
            else
                this.prefixInput.val(val);
        } else {
            this.prefixInput.val(val);
        }
    }

    get_readOnly(): boolean {
        return this.element.hasClass('readonly');
    }

    set_readOnly(value: boolean): void {
        if (value == true) {
            this.element.addClass('readonly');
            this.element.attr("readonly", "readonly");
        } else {
            this.element.removeClass('readonly');
            this.element.removeAttr("readonly");
        }
    }
}

export interface PrefixedStringEditorOptions {
    prefixLength: number;
    inputMaxLength: number;
    prefixFormatterType?: string;
}
