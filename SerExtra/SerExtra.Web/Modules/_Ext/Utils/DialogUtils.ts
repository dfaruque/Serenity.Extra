namespace _Ext.DialogUtils {
    export function pendingChangesConfirmation(element: JQuery, hasPendingChanges: () => boolean) {
        element.on('dialogbeforeclose panelbeforeclose', function (e) {
            if (!Serenity.WX.hasOriginalEvent(e) || !hasPendingChanges()) {
                return;
            }

            e.preventDefault();

            Q.confirm(q.text('Controls.EntityDialog.PendingChangesConfirmation', 'You have pending changes. Save them?'),
                () => element.find('div.save-and-close-button').click(),
                {
                    onNo: function () {
                        if (element.hasClass('ui-dialog-content'))
                            element.dialog('close');
                        else if (element.hasClass('s-Panel'))
                            Serenity.TemplatedDialog.closePanel(element);
                    }
                });
        });
    }
}
