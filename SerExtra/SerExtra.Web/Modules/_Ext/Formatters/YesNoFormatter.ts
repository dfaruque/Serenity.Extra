namespace _Ext {

    @Serenity.Decorators.registerFormatter([Serenity.ISlickFormatter])
    export class YesNoFormatter implements Slick.Formatter {
        static format(val) {
            let valAsBool = Boolean(val);

            return valAsBool ? Q.text('Dialogs.YesButton') : Q.text('Dialogs.NoButton');
        }

        format(ctx: Slick.FormatterContext) {
            return YesNoFormatter.format(ctx.value);
        }
    }

}