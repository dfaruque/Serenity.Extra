import { Culture, Decorators, ISetEditValue, PropertyItem, Widget, WidgetProps, formatDate, localText } from "@serenity-is/corelib";

@Decorators.element("<div/>")
@Decorators.registerEditor('_Ext.StaticTextBlock', [ISetEditValue])
export class StaticTextBlock<P extends StaticTextBlockOptions = StaticTextBlockOptions>
    extends Widget<P>
    implements ISetEditValue {

    declare private _value: string;

    constructor(props: WidgetProps<P>) {
        super(props);

        // hide the caption label for this editor if in a form. ugly hack
        if (this.options.hideLabel) {
            let label = this.domNode.closest('.field')?.querySelector('.caption') as HTMLLabelElement;
            label && (label.style.display = "none");
        }

        this.updateElementContent();
    }

    private updateElementContent() {
        var txt = this.options.text ?? this._value;

        if (this.options.isDate)
            txt = formatDate(txt);

        if (this.options.isDateTime)
            txt = formatDate(txt, Culture.dateTimeFormat);

        // if isLocalText is set, text is actually a local text key
        if (this.options.isLocalText)
            txt = localText(txt);

        // don't html encode if isHtml option is true
        if (this.options.isHtml)
            this.domNode.innerHTML = txt;
        else
            this.domNode.textContent = txt;
    }

    /**
        * By implementing ISetEditValue interface, we allow this editor to display its field value.
        * But only do this when our text content is not explicitly set in options
        */
    public setEditValue(source: any, property: PropertyItem) {
        if (this.options.text == null) {
            this._value = this.options.text ?? source[property.name];
            this.updateElementContent();
        }
    }

    public get value() {
        return this._value;
    }

    public set value(value) {
        this._value = value;
        this.updateElementContent();
    }
}

export interface StaticTextBlockOptions {
    text: string;
    isHtml: boolean;
    isLocalText: boolean;
    hideLabel: boolean;
    isDate: boolean;
    isDateTime: boolean;
}