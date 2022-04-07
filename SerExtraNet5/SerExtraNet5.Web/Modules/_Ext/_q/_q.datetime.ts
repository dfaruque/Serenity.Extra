
namespace q {

    export function nextTick(date) {
        return new Date(date.getTime() + 1);
    }

    export function addMinutes(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes * 60000);
    }

    export function addHours(date: Date, hours: number) {
        return new Date(date.getTime() + hours * 3600000);
    }

    export function getHours(fromDate: Date, toDate: Date): number {
        let hours = 0;
        if (fromDate && toDate) {
            let totalMiliSeconds = toDate.valueOf() - fromDate.valueOf();
            hours = totalMiliSeconds / (1000 * 60 * 60);
        }
        return hours;
    }

    export function getDays24HourPulse(fromDate: Date, toDate: Date): number {

        let days = q.getHours(fromDate, toDate) / 24;

        return Math.ceil(days);
    }

    export function getDays(pFromDate: Date, pToDate: Date): number {
        if (!pFromDate || !pToDate) return 1;

        let fromDate = new Date(pFromDate.getFullYear(), pFromDate.getMonth(), pFromDate.getDate());
        let toDate = new Date(pToDate.getFullYear(), pToDate.getMonth(), pToDate.getDate(), 23, 59, 59);

        let days = q.getHours(fromDate, toDate) / 24;

        return Math.ceil(days);
    }

    export function getMonths(fromDate: Date, toDate: Date): number {
        let months = q.getDays24HourPulse(fromDate, toDate) / 30;
        return Math.ceil(months);
    }

    export function getCalenderMonths(fromDate: Date, toDate: Date): number {
        let months;
        months = (toDate.getFullYear() - fromDate.getFullYear()) * 12;
        months -= fromDate.getMonth();
        months += toDate.getMonth();
        return months <= 0 ? 0 : months;
    }

    export function getCalenderMonthsCeil(fromDate: Date, toDate: Date): number {
        let months = q.getCalenderMonths(fromDate, toDate);
        return months == 0 ? 1 : months;
    }

    export function addDays(date: Date, days: number): Date {
        var result = new Date(date as any);
        result.setDate(result.getDate() + days);
        return result;
    }


    export function addMonths(date: Date, months: number): Date {
        var result = new Date(date as any);
        result.setMonth(result.getMonth() + months);
        return result;
    }

    export function addYear(date: Date, years: number): Date {
        var result = new Date(date as any);
        result.setFullYear(result.getFullYear() + years);
        return result;
    }

    export function getPeriods(fromDate: Date, toDate: Date, periodUnit: _Ext.TimeUoM): number {
        if (periodUnit == _Ext.TimeUoM.Day) {
            let days = q.getDays(fromDate, toDate);
            return days;
        }
        else if (periodUnit == _Ext.TimeUoM.Month) {
            let months = q.getMonths(fromDate, toDate);
            return months == 0 ? 1 : months;
        }
        else if (periodUnit == _Ext.TimeUoM.CalenderMonth) {
            let calenderMonths = q.getCalenderMonths(fromDate, toDate);
            return calenderMonths + 1;
        }
    }

    export function addPeriod(date: Date, period: number, periodUnit: _Ext.TimeUoM): Date {
        var result = new Date(date as any);
        if (periodUnit == _Ext.TimeUoM.Day)
            result.setDate(result.getDate() + period);
        else if (periodUnit == _Ext.TimeUoM.Month)
            result.setMonth(result.getMonth() + period);
        else if (periodUnit == _Ext.TimeUoM.CalenderMonth) {
            result.setDate(1);
            result.setMonth(result.getMonth() + period);
        }
        return result;
    }

    export function formatISODate(date: Date): string {
        if (date) {
            var offset = date.getTimezoneOffset();
            var result = new Date(date.getTime() - offset * 60 * 1000);

            return result.toISOString();
        } else return null
    }

    //editor utils

    export function bindDateTimeEditorChange(editor, handler): void {
        editor.change(handler);
        editor.element.closest('.field').find('.time').change(handler);
        editor.element.closest('.field').find('.inplace-now').click(handler);
    }

    export function setMinDate(editor: Serenity.DateEditor | Serenity.DateTimeEditor, value: Date): void {
        editor.element.datepicker("option", "minDate", value);
        editor.set_minDate(value);
    }

    export function setMaxDate(editor: Serenity.DateEditor | Serenity.DateTimeEditor, value: Date): void {
        let date = new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1);
        date.setMilliseconds(-1);
        editor.element.datepicker("option", "maxDate", date);
        editor.set_maxDate(date);
    }

    export function initDateRangeEditor(fromDateEditor: Serenity.DateEditor, toDateEditor: Serenity.DateEditor, onChangeHandler?: (e: JQueryEventObject) => void): void {

        var startDateTextBox = (<any>fromDateEditor.element);
        var endDateTextBox = (<any>toDateEditor.element);

        startDateTextBox.datepicker('option', 'onClose', function (dateText, inst) {
            if (endDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datepicker('getDate');
                var testEndDate = endDateTextBox.datepicker('getDate');
                if (testStartDate > testEndDate)
                    endDateTextBox.datepicker('setDate', testStartDate);
            }
            else {
                endDateTextBox.val(dateText);
            }
        });

        endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate'));
        startDateTextBox.datepicker('option', 'onSelect', function (selectedDateTime) {
            endDateTextBox.datepicker('option', 'minDate', startDateTextBox.datepicker('getDate'));
            if (onChangeHandler) onChangeHandler(selectedDateTime);
        });


        endDateTextBox.datepicker('option', 'onClose', function (dateText, inst) {
            if (startDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datepicker('getDate');
                var testEndDate = endDateTextBox.datepicker('getDate');
                if (testStartDate > testEndDate)
                    startDateTextBox.datepicker('setDate', testEndDate);
            }
            else {
                startDateTextBox.val(dateText);
            }
        });

        startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate'));
        endDateTextBox.datepicker('option', 'onSelect', function (selectedDateTime) {
            startDateTextBox.datepicker('option', 'maxDate', endDateTextBox.datepicker('getDate'));
            if (onChangeHandler) onChangeHandler(selectedDateTime);
        });

        //to fire change event on keyboard input
        if (onChangeHandler) {
            setTimeout(() => {
                fromDateEditor.change(onChangeHandler);

                toDateEditor.change(onChangeHandler);
            }, 500);
        }
    }

    export function initDateTimeRangeEditor(fromDateTimeEditor: _Ext.DateTimePickerEditor, toDateTimeEditor: _Ext.DateTimePickerEditor, onChangeHandler?: (e: JQueryEventObject) => void): void {
        //fromDateTimeEditor.destroy();
        //toDateTimeEditor.destroy();


        var startDateTextBox = (<any>fromDateTimeEditor.element);
        var endDateTextBox = (<any>toDateTimeEditor.element);

        //startDateTextBox.datetimepicker('option', 'timeFormat', 'HH:mm z')
        startDateTextBox.datetimepicker('option', 'onClose', function (dateText, inst) {
            if (endDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    endDateTextBox.datetimepicker('setDate', testStartDate);
            }
            else {
                endDateTextBox.val(dateText);
            }
        });

        endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
        startDateTextBox.datetimepicker('option', 'onSelect', function (selectedDateTime) {
            endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
            if (onChangeHandler) onChangeHandler(selectedDateTime);
        });


        //endDateTextBox.datetimepicker('option', 'timeFormat', 'HH:mm z')
        endDateTextBox.datetimepicker('option', 'onClose', function (dateText, inst) {
            if (startDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    startDateTextBox.datetimepicker('setDate', testEndDate);
            }
            else {
                startDateTextBox.val(dateText);
            }
        });

        startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate'));
        endDateTextBox.datetimepicker('option', 'onSelect', function (selectedDateTime) {
            startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate'));
            if (onChangeHandler) onChangeHandler(selectedDateTime);
        });

        //to fire change event on keyboard input
        if (onChangeHandler) {
            setTimeout(() => {
                fromDateTimeEditor.change(onChangeHandler);

                toDateTimeEditor.change(onChangeHandler);
            }, 500);
        }
    }

    export function formatDate(d: Date | string, format?: string) {
        if (!d) {
            return '';
        }

        let date: Date;
        if (typeof d == "string") {
            var res = Q.parseDate(d);
            if (!res)
                return d;
            date = res as Date;
        }
        else
            date = d;

        if (format == null || format == "d") {
            format = Q.Culture.dateFormat;
        }
        else {
            switch (format) {
                case "g": format = Q.Culture.dateTimeFormat.replace(":ss", ""); break;
                case "G": format = Q.Culture.dateTimeFormat; break;
                case "s": format = "yyyy-MM-ddTHH:mm:ss"; break;
                case "u": return Q.formatISODateTimeUTC(date);
            }
        }

        let pad = function (i: number) {
            return Q.zeroPad(i, 2);
        };

        return format.replace(new RegExp('dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|fff|zz?z?|\\/', 'g'),
            function (fmt): any {
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                switch (fmt) {
                    case '/': return Q.Culture.dateSeparator;
                    case 'hh': return pad(((date.getHours() < 13) ? date.getHours() : (date.getHours() - 12)));
                    case 'h': return ((date.getHours() < 13) ? date.getHours() : (date.getHours() - 12));
                    case 'HH': return pad(date.getHours());
                    case 'H': return date.getHours();
                    case 'mm': return pad(date.getMinutes());
                    case 'm': return date.getMinutes();
                    case 'ss': return pad(date.getSeconds());
                    case 's': return date.getSeconds();
                    case 'yyyy': return date.getFullYear();
                    case 'yy': return date.getFullYear().toString().substr(2, 4);
                    case 'dddd': return days[date.getDay()];
                    case 'ddd': return days[date.getDay()].substr(0, 3);
                    case 'dd': return pad(date.getDate());
                    case 'd': return date.getDate().toString();
                    case 'MMMM': return months[date.getMonth()];
                    case 'MMM': return months[date.getMonth()].substr(0, 3);
                    case 'MM': return pad(date.getMonth() + 1);
                    case 'M': return date.getMonth() + 1;
                    case 't': return ((date.getHours() < 12) ? 'A' : 'P');
                    case 'tt': return ((date.getHours() < 12) ? 'AM' : 'PM');
                    case 'fff': return Q.zeroPad(date.getMilliseconds(), 3);
                    case 'zzz':
                    case 'zz':
                    case 'z': return '';
                    default: return fmt;
                }
            }
        );
    }

}
