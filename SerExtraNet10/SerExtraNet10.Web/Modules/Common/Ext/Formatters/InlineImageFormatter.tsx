import { Decorators, Formatter, IInitializeColumn, resolveUrl } from "@serenity-is/corelib";
import { Column, FormatterContext, FormatterResult } from "@serenity-is/sleekgrid";

@Decorators.registerFormatter('Ext.InlineImageFormatter')
export class InlineImageFormatter
    implements Formatter, IInitializeColumn {

    constructor(public readonly props: { fileProperty?: string, thumb?: boolean } = {}) {
    }

    format(ctx: FormatterContext): FormatterResult {

        var file = (this.props?.fileProperty ? ctx.item[this.props.fileProperty] : ctx.value) as string;
        if (!file || !file.length)
            return "";

        if (this.props?.thumb) {
            var parts = file.split('.');
            file = parts.slice(0, parts.length - 1).join('.') + '_t.jpg';
        }

        return <a class="inline-image" target="_blank" href={resolveUrl("~/upload/" + file)}>
            <img src={resolveUrl('~/upload/' + file)} style="max-height: 145px; max-width: 100%" />
        </a>;
    }

    initializeColumn(column: Column): void {
        if (this.props?.fileProperty) {
            column.referencedFields = column.referencedFields || [];
            column.referencedFields.push(this.props.fileProperty);
        }
    }
}