import { Decorators, IGetEditValue, IReadOnly, ISetEditValue, parseISODateTime, Widget, WidgetProps } from "@serenity-is/corelib"
import { usingBootstrapDatePicker } from "../Utils/Using"
import { getSelectedLanguage } from "../_q/_q";

@Decorators.registerEditor('_Ext.MonthYearEditor', [IGetEditValue, ISetEditValue, IReadOnly])
@Decorators.element('<input type="text" autocomplete="off"/>')
export class MonthYearEditor extends Widget<any> implements IGetEditValue, ISetEditValue, IReadOnly {
    public getEditValue(property, target) { target[property.name] = this.value; }
    public setEditValue(source, property) { this.value = source[property.name]; }

    constructor(props: WidgetProps<any>) {
        super(props);

        usingBootstrapDatePicker();

        (<any>this.element).BSdatepicker({
            format: "yyyy-mm",
            startView: "months",
            minViewMode: "months",
            language: getSelectedLanguage().substr(0, 2),
            enableOnReadonly: false,
            showOnFocus: false,
            autoclose: true
        });
    }

    public get value(): string {
        return this.element.val();
    }

    public set value(val: string) {
        this.element['BSdatepicker']("update", parseISODateTime(val));
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
        this.element['BSdatepicker']("setStartDate", parseISODateTime(value));
    }
    //get_maxValue(): string { }
    set_maxValue(value: string): void {
        this.element['BSdatepicker']("setEndDate", parseISODateTime(value));
    }
}
