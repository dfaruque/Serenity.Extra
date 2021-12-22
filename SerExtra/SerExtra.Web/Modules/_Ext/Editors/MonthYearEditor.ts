namespace _Ext {
    @Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element('<input type="month"/>')
    export class MonthYearEditor extends Serenity.Widget<any> implements Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly {
        public getEditValue(property, target) { target[property.name] = this.value; }
        public setEditValue(source, property) { this.value = source[property.name]; }

        constructor(container: JQuery) {
            super(container);
        }


        public get value(): string {
            return this.element.val();
        }

        public set value(val: string) {
            this.element.val(Q.formatDate(val, 'yyyy-MM'));
        }

        get_readOnly(): boolean {
            return this.element.hasClass('readonly');
        }

        set_readOnly(value: boolean): void {
            if (value == true) {
                this.element.addClass('readonly').attr('readonly', 'readonly');
                this.element.attr("disabled");
            } else {
                this.element.removeClass('readonly');
                this.element.removeAttr("readonly");
                this.element.removeAttr("disabled");
            }
        }


    }
}