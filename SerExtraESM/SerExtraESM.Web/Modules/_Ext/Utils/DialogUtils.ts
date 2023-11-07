import { confirmDialog, TemplatedDialog, WX } from "@serenity-is/corelib"
import * as q from "../_q/_q"

export function pendingChangesConfirmation(element: JQuery, hasPendingChanges: () => boolean) {
    element.on('dialogbeforeclose panelbeforeclose', function (e) {
        if (!WX.hasOriginalEvent(e) || !hasPendingChanges()) {
            return;
        }

        e.preventDefault();

        confirmDialog(q.text('Controls.EntityDialog.PendingChangesConfirmation', 'You have pending changes. Save them?'),
            () => element.find('div.save-and-close-button').click(),
            {
                onNo: function () {
                    if (element.hasClass('ui-dialog-content'))
                        element.dialog('close');
                    else if (element.hasClass('s-Panel'))
                        TemplatedDialog.closePanel(element);
                }
            });
    });
}
