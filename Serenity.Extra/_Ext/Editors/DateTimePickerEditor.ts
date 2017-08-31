namespace _Ext {

    export class DateTimePickerEditor extends Serenity.Widget<any> implements Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly {
        public getEditValue(property, target) { target[property.name] = this.value; }
        public setEditValue(source, property) { this.value = source[property.name]; }

        constructor(container: JQuery) {
            super(container);
            (<any>this.element).datetimepicker({
                timeInput: true,
                controlType: 'select',
                oneLine: true,
                timeFormat: "HH:mm",
                showOn: "button"
            });

        }
        //http://trentrichardson.com/examples/timepicker

        public get value(): string {
            return Q.formatDate(this.valueAsDate, 'yyyy-MM-ddTHH:mm');
        }

        public set value(val: string) {
            this.valueAsDate = Q.parseISODateTime(val);
        }

        public get valueAsDate(): Date {
            let val = (<any>this.element).datetimepicker('getDate');

            return val;
        }

        public set valueAsDate(val: Date) {
            (<any>this.element).datetimepicker('setDate', val);
        }

        get_readOnly(): boolean {
            return this.element.hasClass('readonly');
        }

        set_readOnly(value: boolean): void {
            if (value == true) {
                (<any>this.element).datetimepicker("option", "disabled", true);
                this.element.addClass('readonly');
                this.element.attr("disabled");
            } else {
                (<any>this.element).datetimepicker("option", "disabled", false);
                this.element.removeClass('readonly');
                this.element.removeAttr("disabled");
            }
        }

        set_minDate(date: Date) {
            (<any>this.element).datetimepicker('option', 'minDate', date);
        }
        set_maxDate(date: Date) {
            (<any>this.element).datetimepicker('option', 'maxDate', date);
        }

        set_minDateTime(date: Date) {
            (<any>this.element).datetimepicker('option', 'minDateTime', date);
        }
        set_maxDateTime(date: Date) {
            (<any>this.element).datetimepicker('option', 'maxDateTime', date);
        }


    }
}