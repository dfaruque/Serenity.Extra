import { Decorators, Formatter, ISlickFormatter, text } from "@serenity-is/corelib"
import { FormatterContext } from "@serenity-is/sleekgrid"

@Decorators.registerFormatter('Ext.YesNoFormatter', [ISlickFormatter])
export class YesNoFormatter implements Formatter {
    static format(val) {
        let valAsBool = Boolean(val);

        return valAsBool ? text('Dialogs.YesButton') : text('Dialogs.NoButton');
    }

    format(ctx: FormatterContext) {
        return YesNoFormatter.format(ctx.value);
    }
}
