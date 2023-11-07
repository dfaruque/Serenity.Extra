import { Decorators, Formatter, ISlickFormatter, parseISODateTime } from "@serenity-is/corelib"
import { FormatterContext } from "@serenity-is/sleekgrid"
import * as q from "../_q/_q"

@Decorators.registerFormatter('_Ext.MonthYearFormatter', [ISlickFormatter])
export class MonthYearFormatter implements Formatter {
    static format(val: string) {
        if (val) {
            if (val.length == 7) val += '-01';
            let valDate = parseISODateTime(val);

            return q.getEnumText('Months', valDate.getMonth()) + '-' + valDate.getFullYear();
        } else return '';
    }

    format(ctx: FormatterContext) {
        return MonthYearFormatter.format(ctx.value);
    }
}
