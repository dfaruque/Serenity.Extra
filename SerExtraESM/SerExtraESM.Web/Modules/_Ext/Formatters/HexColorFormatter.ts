import * as Serenity from "@serenity-is/corelib"
import * as Slick from "@serenity-is/sleekgrid"

@Serenity.Decorators.registerFormatter('_Ext.HexColorFormatter', [Serenity.ISlickFormatter])
export class HexColorFormatter implements Serenity.Formatter {
    static format(val) {
        return `<span class="label" style="background-color: ${val}"> ${val} </span>`;
    }

    format(ctx: Slick.FormatterContext) {
        return HexColorFormatter.format(ctx.value);
    }
}
