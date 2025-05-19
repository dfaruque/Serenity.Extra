import { Decorators, Formatter, IInitializeColumn, resolveUrl, UploadedFile } from "@serenity-is/corelib"
import { Column, FormatterContext } from "@serenity-is/sleekgrid"

@Decorators.registerFormatter('_Ext.InlineMultipleImageFormatter')
export class InlineMultipleImageFormatter
    implements Formatter, IInitializeColumn {

    constructor(public readonly props: {
        fileProperty?: string,
        thumb?: boolean,
        inlineUpload?: boolean,
        defaultImage?: string
    } = {}) {
    }

    format(ctx: FormatterContext): string {

        var uploadButton = `<a class="inline-action inline-image-upload" href="javascript:;">` +
            `<i class="fa fa-upload inline-action inline-image-upload" style="font-size:25px;"></i></a>`;

        var defaultImageReturn = `<a class="inline-action inline-image-upload" href="javascript:;">` +
            `<img class="inline-action inline-image-upload" src="${resolveUrl(this.props.defaultImage)}" style='max-height: 20px; max-width: 100%;' /></a>`;

        let result = '';

        if (ctx.value) {
            var uploadedFiles = JSON.parse(ctx.value) as UploadedFile[];
            var files = uploadedFiles.map(m => m.Filename);

            let href = 'javascript:;';
            let src = '';

            if (!files || !files.length) {
                href = resolveUrl(this.props.defaultImage)
                src = href

                result = defaultImageReturn;

            } else {

                files.forEach(file => {
                    let fileType = file.substr(file.lastIndexOf('.') + 1);

                    href = resolveUrl("~/upload/" + file);

                    if (fileType.toLowerCase() == 'pdf') {
                        result += `<a class="inline-image" target='_blank' href="${href}">` +
                            `<i class="fa fa-file-pdf-o" style="font-size:33px;"></i></a>`;

                    } else {

                        if (this.props.thumb) {
                            var parts = file.split('.');
                            file = parts.slice(0, parts.length - 1).join('.') + '_t.jpg';
                        }

                        src = resolveUrl('~/upload/' + file);

                        result += `<a class="inline-image thumb cboxElement" target='_blank' href="${href}">` +
                            `<img src="${src}" style='max-height: 144px; max-width: 100%;' /></a>`;
                    }
                });
            }
        }
        return result + (this.props.inlineUpload ? uploadButton : '');
    }

    initializeColumn(column: Column): void {
        if (this.props.fileProperty) {
            column.referencedFields = column.referencedFields || [];
            column.referencedFields.push(this.props.fileProperty);
        }
    }
}
