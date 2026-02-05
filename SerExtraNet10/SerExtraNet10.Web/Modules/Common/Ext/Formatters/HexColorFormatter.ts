import { Decorators, Formatter, ISlickFormatter } from "@serenity-is/corelib"
import { FormatterContext } from "@serenity-is/sleekgrid"

@Decorators.registerFormatter('Ext.HexColorFormatter', [ISlickFormatter])
export class HexColorFormatter implements Formatter {
    static format(val) {
        return `<span class="label" style="background-color: ${val}"> ${val} </span>`;
    }

    format(ctx: FormatterContext) {
        return HexColorFormatter.format(ctx.value);
    }
}
