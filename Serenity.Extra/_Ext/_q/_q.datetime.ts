
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
        let fromDate = new Date(pFromDate.getFullYear(), pFromDate.getMonth(), pFromDate.getDate());
        let toDate = new Date(pToDate.getFullYear(), pToDate.getMonth(), pToDate.getDate(), 23, 59, 59);

        let days = q.getHours(fromDate, toDate) / 24;

        days = days <= 0 ? 1 : days;

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
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    export function addMonths(date: Date, months: number): Date {
        var result = new Date(date);
        result.setMonth(result.getMonth() + months);
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
        var result = new Date(date);
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
        });


        setTimeout(() => {
            fromDateEditor.change(onChangeHandler);

            toDateEditor.change(onChangeHandler);
        }, 500);

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
        });


        setTimeout(() => {
            fromDateTimeEditor.change(onChangeHandler);

            toDateTimeEditor.change(onChangeHandler);
        }, 500);

    }
    
}
