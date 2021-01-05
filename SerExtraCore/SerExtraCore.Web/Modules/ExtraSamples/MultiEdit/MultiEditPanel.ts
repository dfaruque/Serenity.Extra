/// <reference path="MultiEditWidgetBase.ts" />
namespace _Ext {

    @Serenity.Decorators.registerClass('Serenity.MultiEditFieldSelect')
    class MultiEditFieldSelect extends Serenity.Select2Editor<any, Serenity.PropertyItem> {
        constructor(hidden: JQuery, fields: Serenity.PropertyItem[]) {
            super(hidden);

            for (var field of fields) {
                this.addOption(field.name, Q.coalesce(Q.tryGetText(field.title),
                    Q.coalesce(field.title, field.name)), field);
            }
        }

        emptyItemText() {
            if (Q.isEmptyOrNull(this.value)) {
                return Q.text('Controls.FilterPanel.SelectField');
            }

            return null;
        }

        getSelect2Options() {
            var opt = super.getSelect2Options();
            opt.allowClear = false;
            return opt;
        }
    }

    export class MultiEditPanel extends MultiEditWidgetBase<any> {

        private rowsDiv: JQuery;

        constructor(div: JQuery) {
            super(div);

            this.element.addClass('s-MultiEditPanel');
            this.rowsDiv = this.byId('Rows');
            this.initButtons();
            this.updateButtons();
        }

        private showInitialLine: boolean;

        get_showInitialLine() {
            return this.showInitialLine;
        }

        set_showInitialLine(value: boolean) {
            if (this.showInitialLine !== value) {
                this.showInitialLine = value;
                if (this.showInitialLine && this.rowsDiv.children().length === 0) {
                    this.addEmptyRow(false);
                }
            }
        }

        protected filterStoreChanged() {
            super.filterStoreChanged();
        }

        private updateStoreOnReset: boolean;

        get_updateStoreOnReset() {
            return this.updateStoreOnReset;
        }

        set_updateStoreOnReset(value: boolean): void {
            if (this.updateStoreOnReset !== value) {
                this.updateStoreOnReset = value;
            }
        }

        protected getTemplate(): string {
            return "<div id='~_Rows' class='filter-lines'>" +
                "</div>" +
                "<div id='~_Buttons' class='buttons'>" +
                "<button id='~_AddButton' class='btn btn-primary add'></button>" +
                "<button id='~_ResetButton' class='btn btn-danger reset'></button>" +
                "</div>" +
                "<div style='clear: both'>" +
                "</div>"
        }

        protected initButtons(): void {
            this.byId('AddButton').text(Q.text('Controls.FilterPanel.AddFilter'))
                .click((e) => this.addButtonClick(e));

            this.byId('ResetButton').text(Q.text('Controls.FilterPanel.ResetButton'))
                .click((e) => this.resetButtonClick(e));
        }

        get_hasErrors(): boolean {
            return this.rowsDiv.children().children('div.v')
                .children('span.error').length > 0;
        }

        protected addButtonClick(e: JQueryEventObject) {
            this.addEmptyRow(true);
            e.preventDefault();
        }

        protected resetButtonClick(e: JQueryEventObject) {
            e.preventDefault();

            if (this.get_updateStoreOnReset()) {
                if (this.get_store().get_items().length > 0) {
                    Q.clearKeys(this.get_store().get_items());
                    this.get_store().raiseChanged();
                }
            }

            this.rowsDiv.empty();
            this.updateButtons();
            if (this.get_showInitialLine()) {
                this.addEmptyRow(false);
            }
        }

        protected findEmptyRow(): JQuery {
            var result: JQuery = null;

            this.rowsDiv.children().each(function (index, row) {
                var fieldInput = $(row).children('div.f')
                    .children('input.field-select').first();
                if (fieldInput.length === 0) {
                    return true;
                }
                var val = fieldInput.val();
                if (val == null || val.length === 0) {
                    result = $(row);
                    return false;
                }
                return true;
            });

            return result;
        }

        protected addEmptyRow(popupField: boolean) {
            var emptyRow = this.findEmptyRow();

            if (emptyRow != null) {
                emptyRow.find('input.field-select').select2('focus');
                if (popupField) {
                    emptyRow.find('input.field-select').select2('open');
                }
                return emptyRow;
            }

            var row = $(
                "<div class='filter-line'>" +
                "<a class='delete'><span></span></a>" +
                "<div class='f'>" +
                "<input type='hidden' class='field-select'>" +
                "</div>" +
                "<div class='o'></div>" +
                "<div class='v'></div>" +
                "<div style='clear: both'></div>" +
                "</div>").appendTo(this.rowsDiv);


            row.children('a.delete')
                .attr('title', Q.text('Controls.FilterPanel.RemoveField'))
                .click((e) => this.deleteRowClick(e));

            var fieldSel = new MultiEditFieldSelect(row.children('div.f')
                .children('input'), this.get_store().get_fields())
                .changeSelect2(e => this.onRowFieldChange(e));

            this.updateButtons();

            row.find('input.field-select').select2('focus');

            if (popupField) {
                row.find('input.field-select').select2('open');
            }

            return row;
        }

        protected onRowFieldChange(e: JQueryEventObject) {
            var row = $(e.target).closest('div.filter-line');
            this.rowFieldChange(row);
            var opSelect = row.children('div.o').find('input.op-select');
            opSelect.select2('focus');
        }

        protected rowFieldChange(row: JQuery) {
            row.removeData('MultiEditing');
            var select = row.children('div.f').find('input.field-select')
                .getWidget(MultiEditFieldSelect);
            var fieldName = select.get_value();
            var isEmpty = fieldName == null || fieldName === '';
            this.removeMultiEditing(row);
            //this.populateOperatorList(row);
            //this.rowOperatorChange(row);
            this.updateButtons();
        }

        protected removeMultiEditing(row: JQuery): void {
            row.data('MultiEditing', null);
            row.data('MultiEditingField', null);
        }

        protected getFieldFor(row: JQuery) {
            if (row.length === 0) {
                return null;
            }
            var select = row.children('div.f').find('input.field-select')
                .getWidget(MultiEditFieldSelect);

            if (Q.isEmptyOrNull(select.value)) {
                return null;
            }

            return this.get_store().get_fieldByName()[select.get_value()];
        }

        protected getMultiEditingFor(row: JQuery): IMultiEditing {
            var field = this.getFieldFor(row);

            if (field == null)
                return null;

            var filtering = Q.cast(row.data('MultiEditing'), IMultiEditing);

            if (filtering != null)
                return filtering;

            var filteringType = MultiEditingTypeRegistry.get(
                Q.coalesce(field.filteringType, 'String'));

            var editorDiv = row.children('div.v');
            filtering = new (filteringType as any)() as IMultiEditing;
            Serenity.ReflectionOptionsSetter.set(filtering, field.filteringParams);
            filtering.set_container(editorDiv);
            filtering.set_field(field);
            row.data('MultiEditing', filtering);
            return filtering;
        }

        protected deleteRowClick(e: JQueryEventObject): void {
            e.preventDefault();
            var row = $(e.target).closest('div.filter-line');
            row.remove();

            this.updateButtons();
        }

        protected updateButtons(): void {
            this.byId('ResetButton').toggle(
                this.rowsDiv.children().length >= 1);
        }
    }
}