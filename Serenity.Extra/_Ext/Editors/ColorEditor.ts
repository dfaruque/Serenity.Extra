namespace _Ext {

    export class ColorEditor extends Serenity.TemplatedWidget<any>
        implements Serenity.IGetEditValue, Serenity.ISetEditValue {
        protected getTemplate() {

            return `<div class="input-group colorpicker-component">
                        <input type="text" value="#00AABB" class="form-control" />
                        <span class="input-group-addon"><i></i></span>
                    </div>`;
        };


        constructor(container: JQuery) {
            super(container);
            try {
                (<any>this.element).colorpicker({ format: "hex" });
            } catch (e) { }
        }

        public getEditValue(property, target) {
            try {
                let editVal = (<any>this.element).colorpicker().data().color;
                target[property.name] = editVal;
            } catch (e) { }
        }

        public setEditValue(source, property) {
            let val = source[property.name];
            //this.element.children('input').val(val);
            try {
            this.element.data('colorpicker').setValue(val);
            } catch (e) { }
        }

    }
}