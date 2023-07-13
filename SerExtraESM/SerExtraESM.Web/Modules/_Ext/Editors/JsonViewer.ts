import * as Serenity from "@serenity-is/corelib"

@Serenity.Decorators.registerEditor('_Ext.JsonViewer', [Serenity.IGetEditValue, Serenity.ISetEditValue])
@Serenity.Decorators.element("<pre/>")
export class JsonViewer extends Serenity.TemplatedWidget<any>
    implements Serenity.IGetEditValue, Serenity.ISetEditValue {
    public getEditValue(property, target) { target[property.name] = this.value; }
    public setEditValue(source, property) { this.value = source[property.name]; }

    protected getTemplate() {
        return ``;
    };

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