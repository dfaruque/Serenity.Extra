import { Decorators, formatDate, IGetEditValue, IReadOnly, ISetEditValue, parseISODateTime, Widget } from "@serenity-is/corelib"
//import { usingJqueryUITimepickerAddon } from "../Utils/Using"

@Decorators.registerEditor('_Ext.DateTimePickerEditor', [IGetEditValue, ISetEditValue, IReadOnly])
@Decorators.element("<input/>")
export class DateTimePickerEditor extends Widget<any> implements IGetEditValue, ISetEditValue, IReadOnly {
    public getEditValue(property, target) { target[property.name] = this.value; }
    public setEditValue(source, property) { this.value = source[property.name]; }

    constructor(props: any) {
        super(props);

        //usingJqueryUITimepickerAddon();

        (<any>this.element).datetimepicker({
            timeInput: true,
            controlType: 'select',
            oneLine: true,
            timeFormat: "hh:mm TT",
            showOn: "button"
        });

    }
    //http://trentrichardson.com/examples/timepicker

    public get value(): string {
        return formatDate(this.valueAsDate, 'yyyy-MM-ddTHH:mm');
    }

    public set value(val: string) {
        this.valueAsDate = parseISODateTime(val);
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
