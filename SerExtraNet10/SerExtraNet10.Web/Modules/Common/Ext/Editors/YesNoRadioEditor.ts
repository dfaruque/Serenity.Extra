import { Decorators, IGetEditValue, ISetEditValue, RadioButtonEditor, localText, WidgetProps } from "@serenity-is/corelib"

@Decorators.registerEditor('Ext.YesNoRadioEditor', [IGetEditValue, ISetEditValue])
export class YesNoRadioEditor extends RadioButtonEditor implements ISetEditValue, IGetEditValue {
    public getEditValue(property, target) { target[property.name] = this.valueAsBoolean; }
    public setEditValue(source, property) { this.valueAsBoolean = source[property.name]; }

    constructor(props: WidgetProps<any>) {
        super(props);

        this.element.addClass('s-RadioButtonEditor');

        this.addRadio("1", localText('Dialogs.YesButton', 'Yes'));
        this.addRadio("0", localText('Dialogs.NoButton', 'No'));
    }

    public get valueAsBoolean(): boolean {
        let val = this.get_value();
        if (val == "1") return true
        else if (val == "0") return false
        else return null
    }

    public set valueAsBoolean(val: boolean) {
        if (val == true) this.set_value("1");
        else if (val == false) this.set_value("0");
        else this.set_value(null);
    }
}