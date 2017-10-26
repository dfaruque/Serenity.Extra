var isPageRefreshRequired: boolean;

namespace _Ext {
    export class q {
        static queryString = {};
        static jsPDFHeaderImageData: string = null
        static jsPDFHeaderTitle: string = 'Report Title';

        //date time
        static nextTick(date) {
            return new Date(date.getTime() + 1);
        }

        static addMinutes(date: Date, minutes: number) {
            return new Date(date.getTime() + minutes * 60000);
        }

        static getHours(fromDate: Date, toDate: Date): number {
            let hours = 0;
            if (fromDate && toDate) {
                let totalMiliSeconds = toDate.valueOf() - fromDate.valueOf();
                hours = totalMiliSeconds / (1000 * 60 * 60);
            }
            return hours;
        }

        static getDays(fromDate: Date, toDate: Date): number {

            let days = q.getHours(fromDate, toDate) / 24;

            return Math.ceil(days);
        }


        static getMonths(fromDate: Date, toDate: Date): number {
            let months = q.getDays(fromDate, toDate) / 30;
            return Math.ceil(months);
        }

        static getCalenderMonths(fromDate: Date, toDate: Date): number {
            let months;
            months = (toDate.getFullYear() - fromDate.getFullYear()) * 12;
            months -= fromDate.getMonth();
            months += toDate.getMonth();
            return months <= 0 ? 0 : months;
        }

        static getCalenderMonthsCeil(fromDate: Date, toDate: Date): number {
            let months = q.getCalenderMonths(fromDate, toDate);
            return months == 0 ? 1 : months;
        }

        static addDays(date: Date, days: number): Date {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }


        static addMonths(date: Date, months: number): Date {
            var result = new Date(date);
            result.setMonth(result.getMonth() + months);
            return result;
        }

        static getPeriods(fromDate: Date, toDate: Date, periodUnit: TimeUoM): number {
            if (periodUnit == _Ext.TimeUoM.Day) {
                let days = q.getDays(fromDate, toDate);
                return days == 0 ? 1 : days;
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

        static addPeriod(date: Date, period: number, periodUnit: TimeUoM): Date {
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

        static formatISODate(date: Date): string {
            if (date) {
                var offset = date.getTimezoneOffset();
                var result = new Date(date.getTime() - offset * 60 * 1000);

                return result.toISOString();
            } else return null
        }

        //editor utils

        static bindDateTimeEditorChange(editor, handler): void {
            editor.change(handler);
            editor.element.closest('.field').find('.time').change(handler);
            editor.element.closest('.field').find('.inplace-now').click(handler);
        }

        static initDetailEditor(dialog: DialogBase<any, any>, editor: GridEditorBase<any>, options: GridEditorOptions = {}): void {

            if (options.showCaption != true) {
                editor.element.siblings('.caption').hide();
            }
            if (options.hideToolbar == true) {
                editor.element.find('.grid-toolbar').hide()
            }

            editor.parentDialog = dialog;

            setTimeout(() => {
                if (options.isReadOnly == true) {
                    editor.set_readOnly(options.isReadOnly);
                }

                let categoriesHeight = editor.element.closest('.categories').height();

                if (options.height) {
                    editor.element.find('.grid-container').height(options.height);

                } else {
                    let editorHeight = (categoriesHeight - editor.element.position().top + 40);

                    editor.element.find('.grid-container').height(editorHeight);
                }

                if (options.width) {
                    editor.element.find('.grid-container').width(options.width);

                } else {

                    editor.element.find('.grid-container').width('100%');
                }

                editor.slickGrid.resizeCanvas();
            }, 200);
        }

        static addNotificationIcon(editor: Serenity.StringEditor, isSuccess: boolean): void {

            let isAddOnInitialized = editor.element.data('isAddOnInitialized');

            if (isAddOnInitialized != true) {
                editor.element.after('<span class="text text-danger" style="padding:3px"><i class="fa fa-times"></i></span>');
                editor.element.data('isAddOnInitialized', true);
            }

            if (isSuccess == true) {
                editor.element.switchClass('bg-danger', 'bg-success')
                    .siblings('.text').switchClass('text-danger', 'text-success')
                    .children().switchClass('fa-times', 'fa-check');
            } else {
                editor.element.switchClass('bg-success', 'bg-danger')
                    .siblings('.text').switchClass('text-success', 'text-danger')
                    .children().switchClass('fa-check', 'fa-times');

            }
        }

        static initDateRangeEditor(fromDateEditor: Serenity.DateEditor, toDateEditor: Serenity.DateEditor, onChangeHandler?: (e: JQueryEventObject) => void): void {

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

        static initDateTimeRangeEditor(fromDateTimeEditor: DateTimePickerEditor, toDateTimeEditor: DateTimePickerEditor, onChangeHandler?: (e: JQueryEventObject) => void): void {
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


        static setEditorLabel(editor: Serenity.Widget<any>, value: string) {

            editor.element.siblings('label').text(value);
        }

        static hideEditorLabel(editor: Serenity.Widget<any>) {

            editor.element.siblings('label').hide();
        }

        static setEditorCategoryLabel(editor: Serenity.Widget<any>, value: string) {
            let categoryAnchor = editor.element.closest('.category').find('.category-anchor');
            categoryAnchor.text(value);

            let categoryAnchorName = categoryAnchor.attr('name');
            categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).text(value);
        }

        static hideEditorCategory(editor: Serenity.Widget<any>) {
            editor.element.closest('.category').hide()
            let categoryAnchor = editor.element.closest('.category').find('.category-anchor');

            let categoryAnchorName = categoryAnchor.attr('name');
            categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).hide();
        }

        static hideField(editor: Serenity.Widget<any>, value: boolean = true) {
            if (value == true)
                editor.element.closest('.field').hide();
            else
                editor.element.closest('.field').show();
        }

        // for select2 lookup editor
        static getSelectedRow<TRow>(e: JQueryEventObject) {
            let selectedItem: Serenity.Select2Item = (e as any).added;
            let selectedRow: TRow = selectedItem.source;

            return selectedRow;
        }

        static getEnumText(enumKey, value) {
            let title = Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), value);
            return title;
        }

        static formatDecimal(value) {
            let title = Serenity.NumberFormatter.format(value, '#,##0.00');
            return title;
        }

        static formatInt(value) {
            let title = Serenity.NumberFormatter.format(value, '#,##0');
            return title;
        }

        // Check numeric or not then return value, if NAN then return zero(0)
        static ToNumber(value) {
            return isNaN(value) ? 0 : value;
        }

        static ToBool(value) {
            return value == 'true' ? true : false;
        }


    }


}
interface GridEditorOptions {
    isReadOnly?: boolean;
    height?: number;
    width?: number;
    showCaption?: boolean;
    hideToolbar?: boolean;
}

declare namespace LiteDB {
    interface ObjectId {

    }
}