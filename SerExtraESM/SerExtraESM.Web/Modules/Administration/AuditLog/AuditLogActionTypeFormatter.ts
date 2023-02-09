import * as Serenity from "@serenity-is/corelib"
import * as Slick from "@serenity-is/sleekgrid"
import { AuditLogRow, AuditLogForm, AuditLogService } from "../";
import { AuditActionType } from "../"

@Serenity.Decorators.registerFormatter('_Ext.AuditLogActionTypeFormatter', [Serenity.ISlickFormatter])
export class AuditLogActionTypeFormatter implements Serenity.Formatter {
    static format(ctx: Slick.FormatterContext) {
        let item = ctx.item as AuditLogRow;

        let klass = '';
        if (item.ActionType == AuditActionType.Update) {
            klass = 'warning'
        } else if (item.ActionType == AuditActionType.Delete) {
            klass = 'danger'
        } else {
            klass = 'default'
        }

        return `<span class="label label-${klass}">${AuditActionType[item.ActionType]}</span>`;
    }

    format(ctx: Slick.FormatterContext) {
        return AuditLogActionTypeFormatter.format(ctx);
    }
}
