/// <reference path="multieditwidgetbase.ts" />
namespace Serenity {

    @Decorators.registerClass('Serenity.MultiEditDisplayBar')
    export class MultiEditDisplayBar extends MultiEditWidgetBase<any> {

        constructor(div: JQuery) {
            super(div);

            this.element.find('.cap').text(
                Q.text('Controls.MultiEditPanel.EffectiveMultiEdit'));

            this.element.find('.edit').text(
                Q.text('Controls.MultiEditPanel.EditMultiEdit'));

            this.element.find('.reset').attr('title',
                Q.text('Controls.MultiEditPanel.ResetMultiEditHint'));

            var openMultiEditDialog = (e: JQueryEventObject) => {
                e.preventDefault();
                var dialog = new MultiEditDialog();
                dialog.get_filterPanel().set_store(this.get_store());
                dialog.dialogOpen(null);
            };

            this.element.find('.edit').click(openMultiEditDialog);
            this.element.find('.txt').click(openMultiEditDialog);

            this.element.find('.reset').click(e1 => {
                e1.preventDefault();
                (ss as any).clear(this.get_store().get_items());
                this.get_store().raiseChanged();
            });
        }

        protected filterStoreChanged() {
            super.filterStoreChanged();

            var displayText = Q.trimToNull(this.get_store().get_displayText());

            this.element.find('.current').toggle(displayText != null);
            this.element.find('.reset').toggle(displayText != null);

            if (displayText == null)
                displayText = Q.text('Controls.MultiEditPanel.EffectiveEmpty');

            this.element.find('.txt').text('[' + displayText + ']');
        }

        protected getTemplate() {
            return "<div><a class='reset'></a><a class='edit'></a>" + 
                "<div class='current'><span class='cap'></span>" +
                "<a class='txt'></a></div></div>";
        }
    }
}