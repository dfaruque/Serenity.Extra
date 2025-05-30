import { Decorators, IGetEditValue, ISetEditValue, Widget } from "@serenity-is/corelib"

@Decorators.registerEditor('_Ext.JsonViewer', [IGetEditValue, ISetEditValue])
@Decorators.element("<pre/>")
export class JsonViewer extends Widget<any>
    implements IGetEditValue, ISetEditValue {
    public getEditValue(property, target) { target[property.name] = this.value; }
    public setEditValue(source, property) { this.value = source[property.name]; }

    private _value;


    public set value(val) {
        this._value = val;
        if (typeof val == 'string') {
            this.element.text(JSON.stringify(JSON.parse(val), null, '\t'));
        } else {
            this.element.text(JSON.stringify(val, null, '\t'));
        }
    }

    public get value(): string {
        return this._value;
    }
}