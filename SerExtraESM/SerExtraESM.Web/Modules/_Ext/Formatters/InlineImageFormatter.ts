import { Decorators, Formatter, IInitializeColumn, resolveUrl } from "@serenity-is/corelib"
import { Column, FormatterContext } from "@serenity-is/sleekgrid"

@Decorators.registerFormatter('_Ext.InlineImageFormatter')
export class InlineImageFormatter
    implements Formatter, IInitializeColumn {

    format(ctx: FormatterContext): string {

        var file = (this.fileProperty ? ctx.item[this.fileProperty] : ctx.value) as string;

        let href = '';
        let src = '';

        if (!file || !file.length) {
            href = resolveUrl(this.defaultImage)
            src = href
        } else {
            href = resolveUrl("~/upload/" + file);

            if (this.thumb) {
                var parts = file.split('.');
                file = parts.slice(0, parts.length - 1).join('.') + '_t.jpg';
            }

            src = resolveUrl('~/upload/' + file);
        }

        return `<a class="inline-image" target='_blank' href="${href}">` +
            `<img src="${src}" style='max-height: ${this.maxHeight}; max-width: ${this.maxWidth};' /></a>`;
    }

    initializeColumn(column: Column): void {
        if (this.fileProperty) {
            column.referencedFields = column.referencedFields || [];
            column.referencedFields.push(this.fileProperty);
        }
    }

    @Decorators.option()
    public fileProperty: string;

    @Decorators.option()
    public thumb: boolean;

    @Decorators.option()
    public defaultImage: string;

    @Decorators.option()
    public maxHeight: string = '144px';

    @Decorators.option()
    public maxWidth: string = '100%';
}
