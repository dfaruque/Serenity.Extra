namespace _Ext {
    @Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element('<input type="text" autocomplete="off"/>')
    export class MonthYearEditor extends Serenity.Widget<any> implements Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly {
        public getEditValue(property, target) { target[property.name] = this.value; }
        public setEditValue(source, property) { this.value = source[property.name]; }

        constructor(container: JQuery) {
            super(container);

            usingBootstrapDatePicker();

            (<any>this.element).BSdatepicker({
                format: "yyyy-mm",
                startView: "months",
                minViewMode: "months",
                language: q.getSelectedLanguage().substr(0, 2),
                enableOnReadonly: false,
                showOnFocus: false,
                autoclose: true
            });
        }

        public get value(): string {
            return this.element.val();
        }

        public set value(val: string) {
            this.element['BSdatepicker']("update", Q.parseISODateTime(val));
        }

        get_readOnly(): boolean {
            return this.element.hasClass('readonly');
        }

        set_readOnly(value: boolean): void {
            if (value == true) {
                this.element.addClass('readonly')
                    .attr("disabled", "disabled");
            } else {
                this.element.removeClass('readonly')
                    .removeAttr("disabled");
            }
        }

        //get_minValue(): string { }
        set_minValue(value: string): void {
            this.element['BSdatepicker']("setStartDate", Q.parseISODateTime(value));
        }
        //get_maxValue(): string { }
        set_maxValue(value: string): void {
            this.element['BSdatepicker']("setEndDate", Q.parseISODateTime(value));
        }

    }
}