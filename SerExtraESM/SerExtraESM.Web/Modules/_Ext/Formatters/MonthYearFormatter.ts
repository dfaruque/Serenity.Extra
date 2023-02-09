import * as Serenity from "@serenity-is/corelib"
import * as Q from "@serenity-is/corelib/q"
import * as Slick from "@serenity-is/sleekgrid"
import * as q from "../_q/_q"

@Serenity.Decorators.registerFormatter('_Ext.MonthYearFormatter', [Serenity.ISlickFormatter])
export class MonthYearFormatter implements Serenity.Formatter {
    static format(val: string) {
        if (val) {
            if (val.length == 7) val += '-01';
            let valDate = Q.parseISODateTime(val);

            return q.getEnumText('Months', valDate.getMonth()) + '-' + valDate.getFullYear();
        } else return '';
    }

    format(ctx: Slick.FormatterContext) {
        return MonthYearFormatter.format(ctx.value);
    }
}
