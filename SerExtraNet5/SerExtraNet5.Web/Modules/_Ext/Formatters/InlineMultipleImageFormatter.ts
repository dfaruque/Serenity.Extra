namespace _Ext {

    @Serenity.Decorators.registerFormatter()
    export class InlineMultipleImageFormatter implements Slick.Formatter, Serenity.IInitializeColumn {

        format(ctx: Slick.FormatterContext): string {

            var uploadButton = `<a class="inline-action inline-image-upload" href="javascript:;">` +
                `<i class="fa fa-upload inline-action inline-image-upload" style="font-size:25px;"></i></a>`;

            var defaultImageReturn = `<a class="inline-action inline-image-upload" href="javascript:;">` +
                `<img class="inline-action inline-image-upload" src="${Q.resolveUrl(this.defaultImage)}" style='max-height: 20px; max-width: ${this.maxWidth};' /></a>`;

            let result = '';

            if (ctx.value) {
                var uploadedFiles = JSON.parse(ctx.value) as Serenity.UploadedFile[];
                var files = uploadedFiles.map(m => m.Filename);

                let href = 'javascript:;';
                let src = '';

                if (!files || !files.length) {
                    href = Q.resolveUrl(this.defaultImage)
                    src = href

                    result = defaultImageReturn;

                } else {

                    files.forEach(file => {
                        let fileType = file.substr(file.lastIndexOf('.') + 1);

                        href = Q.resolveUrl("~/upload/" + file);

                        if (fileType.toLowerCase() == 'pdf') {
                            result += `<a class="inline-image" target='_blank' href="${href}">` +
                                `<i class="fa fa-file-pdf-o" style="font-size:33px;"></i></a>`;

                        } else {

                            if (this.thumb) {
                                var parts = file.split('.');
                                file = parts.slice(0, parts.length - 1).join('.') + '_t.jpg';
                            }

                            src = Q.resolveUrl('~/upload/' + file);

                            result += `<a class="inline-image thumb cboxElement" target='_blank' href="${href}">` +
                                `<img src="${src}" style='max-height: ${this.maxHeight}; max-width: ${this.maxWidth};' /></a>`;
                        }
                    });
                }
            }
            return result + (this.inlineUpload ? uploadButton : '');
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
        public inlineUpload: boolean;

        @Serenity.Decorators.option()
        public defaultImage: string;

        @Serenity.Decorators.option()
        public maxHeight: string = '144px';

        @Serenity.Decorators.option()
        public maxWidth: string = '100%';
    }
}