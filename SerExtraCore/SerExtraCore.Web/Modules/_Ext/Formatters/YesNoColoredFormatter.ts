namespace _Ext {

    @Serenity.Decorators.registerFormatter([Serenity.ISlickFormatter])
    export class YesNoColoredFormatter implements Slick.Formatter {
        static format(val) {
            let valAsBool = Boolean(val);

            return valAsBool
                ? `<span class="label label-success" style="font-size: unset; padding-bottom: 0.1em;"> ${Q.text('Dialogs.YesButton')} </span>`
                : `<span class="label label-danger" style="font-size: unset; padding-bottom: 0.1em;"> ${Q.text('Dialogs.NoButton')} </span>`;
        }

        format(ctx: Slick.FormatterContext) {
            return YesNoColoredFormatter.format(ctx.value);
        }
    }

}