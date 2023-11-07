import { Decorators, Formatter, ISlickFormatter, text } from "@serenity-is/corelib"
import { FormatterContext } from "@serenity-is/sleekgrid"

@Decorators.registerFormatter('_Ext.YesNoColoredFormatter', [ISlickFormatter])
export class YesNoColoredFormatter implements Formatter {
    static format(val) {
        let valAsBool = Boolean(val);

        return valAsBool
            ? `<span class="label label-success" style="font-size: unset; padding-bottom: 0.1em;"> ${text('Dialogs.YesButton')} </span>`
            : `<span class="label label-danger" style="font-size: unset; padding-bottom: 0.1em;"> ${text('Dialogs.NoButton')} </span>`;
    }

    format(ctx: FormatterContext) {
        return YesNoColoredFormatter.format(ctx.value);
    }
}
