namespace _Ext {
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element("<div/>")
    export class HtmlTemplateEditor extends Serenity.HtmlContentEditor {
        constructor(textArea: JQuery, opt?: HtmlTemplateEditorOptions) {
            super(textArea, opt);
        }

        protected getConfig(): Serenity.CKEditorConfig {
            var config = super.getConfig() as any;

            var placehorders = (this.options as any).placeholders as string;
            if (placehorders) {
                config.placeholder_select = {
                    placeholders: placehorders.split(',')
                }
                config.extraPlugins += ',richcombo,placeholder_select';

            }

            config.allowedContent = true;
            config.enterMode = window['CKEDITOR'].ENTER_BR;
            config.extraPlugins += ',showborders';
            config.removePlugins += ',uploadimage';

            //config.forcePasteAsPlainText = true;

            //config.toolbar = [['placeholder_select']];

            config.removeButtons += ',Cut,Copy,Paste,PasteText,PasteFromWord' +
                ',SpecialChar,Subscript,Superscript,Styles,' +
                'Link,Unlink,CreatePlaceholder,' +
                'Image,Anchor,Blockquote,BGColor,' +
                'Superscript,RemoveFormat';

            return config;
        }
    }

    export interface HtmlTemplateEditorOptions extends Serenity.HtmlContentEditorOptions {
        cols?: any;
        rows?: any;

        placeholders?: any;
    }
}
