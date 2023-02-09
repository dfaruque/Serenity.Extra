import * as Serenity from "@serenity-is/corelib"
import * as Q from "@serenity-is/corelib/q"
import * as Slick from "@serenity-is/sleekgrid"

@Serenity.Decorators.registerFormatter('_Ext.YesNoFormatter', [Serenity.ISlickFormatter])
export class YesNoFormatter implements Serenity.Formatter {
    static format(val) {
        let valAsBool = Boolean(val);

        return valAsBool ? Q.text('Dialogs.YesButton') : Q.text('Dialogs.NoButton');
    }

    format(ctx: Slick.FormatterContext) {
        return YesNoFormatter.format(ctx.value);
    }
}
