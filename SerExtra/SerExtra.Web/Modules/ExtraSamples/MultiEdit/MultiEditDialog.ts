namespace Serenity {

    @Decorators.registerClass('Serenity.MultiEditDialog')
    export class MultiEditDialog extends TemplatedDialog<any> {

        private filterPanel: MultiEditPanel;

        constructor() {
            super();

            this.filterPanel = new MultiEditPanel(this.byId('MultiEditPanel'));
            this.filterPanel.set_showInitialLine(true);
            this.filterPanel.set_showSearchButton(false);
            this.filterPanel.set_updateStoreOnReset(false);
        }

        get_filterPanel(): MultiEditPanel {
            return this.filterPanel;
        }

        protected getTemplate(): string {
            return '<div id="~_MultiEditPanel"/>';
        }

        protected getDialogOptions() {
            var opt = super.getDialogOptions();

            opt.buttons = [
                {
                    text: Q.text('Dialogs.OkButton'),
                    click: () => {
                        this.filterPanel.search();
                        if (this.filterPanel.get_hasErrors()) {
                            Q.notifyError(Q.text('Controls.MultiEditPanel.FixErrorsMessage'), '', null);
                            return;
                        }

                        this.dialogClose();
                    }
                },
                {
                    text: Q.text('Dialogs.CancelButton'),
                    click: () => this.dialogClose()
                }
            ];

            opt.title = Q.text('Controls.MultiEditPanel.DialogTitle');

            return opt;
        }
    }

}