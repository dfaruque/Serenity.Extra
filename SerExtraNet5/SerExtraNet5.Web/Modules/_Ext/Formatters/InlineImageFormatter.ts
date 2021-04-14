namespace _Ext {

    @Serenity.Decorators.registerFormatter()
    export class InlineImageFormatter
        implements Slick.Formatter, Serenity.IInitializeColumn {

        format(ctx: Slick.FormatterContext): string {

            var file = (this.fileProperty ? ctx.item[this.fileProperty] : ctx.value) as string;

            let href = '';
            let src = '';

            if (!file || !file.length) {
                href = Q.resolveUrl(this.defaultImage)
                src = href
            } else {
                href = Q.resolveUrl("~/upload/" + file);

                if (this.thumb) {
                    var parts = file.split('.');
                    file = parts.slice(0, parts.length - 1).join('.') + '_t.jpg';
                }

                src = Q.resolveUrl('~/upload/' + file);
            }

            return `<a class="inline-image" target='_blank' href="${href}">` +
                `<img src="${src}" style='max-height: ${this.maxHeight}; max-width: ${this.maxWidth};' /></a>`;
        }

        initializeColumn(column: Slick.Column): void {
            if (this.fileProperty) {
                column.referencedFields = column.referencedFields || [];
                column.referencedFields.push(this.fileProperty);
            }
        }

        @Serenity.Decorators.option()
        public fileProperty: string;

        @Serenity.Decorators.option()
        public thumb: boolean;

        @Serenity.Decorators.option()
        public defaultImage: string;

        @Serenity.Decorators.option()
        public maxHeight: string = '144px';

        @Serenity.Decorators.option()
        public maxWidth: string = '100%';
    }
}