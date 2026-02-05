import { Decorators, Formatter, ISlickFormatter, localText } from "@serenity-is/corelib"
import { FormatterContext } from "@serenity-is/sleekgrid"

@Decorators.registerFormatter('Ext.YesNoColoredFormatter', [ISlickFormatter])
export class YesNoColoredFormatter implements Formatter {
    static format(val) {
        let valAsBool = Boolean(val);

        return valAsBool
            ? `<span class="label label-success" style="font-size: unset; padding-bottom: 0.1em;"> ${localText('Dialogs.YesButton', 'Yes')} </span>`
            : `<span class="label label-danger" style="font-size: unset; padding-bottom: 0.1em;"> ${localText('Dialogs.NoButton', 'Yes')} </span>`;
    }

    format(ctx: FormatterContext) {
        return YesNoColoredFormatter.format(ctx.value);
    }
}
