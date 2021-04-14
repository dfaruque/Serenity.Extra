namespace _Ext {
    @Serenity.Decorators.editor()
    @Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue])
    @Serenity.Decorators.element("<div/>")
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
            this.element.text(JSON.stringify(val));
        }

        public get value(): string {
            return this._value;
        }

    }
}