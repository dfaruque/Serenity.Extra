namespace _Ext {

    @Serenity.Decorators.registerFormatter([Serenity.ISlickFormatter])
    export class MonthYearFormatter implements Slick.Formatter {
        static format(ctx: Slick.FormatterContext) {
            if (ctx.value) {
                let val = Q.parseISODateTime(ctx.value);

                return Months[val.getMonth()] + '-' + val.getFullYear();
            } else return '';
        }

        format(ctx: Slick.FormatterContext) {
            return MonthYearFormatter.format(ctx);
        }
    }

}