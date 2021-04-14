namespace _Ext {
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element("<div/>")
    export class HtmlTemplateEditor extends Serenity.HtmlContentEditor {
        constructor(textArea: JQuery, opt?: HtmlTemplateEditorOptions) {
            super(textArea, opt);
        }

        protected getConfig(): Serenity.CKEditorConfig {
            var config = super.getConfig() as any;

            config.extraPlugins = config.extraPlugins || '';

            var placehorders = (this.options as any).placeholders as string;
            if (placehorders) {
                config.placeholder_select = {
                    placeholders: placehorders.split(',')
                }
                config.extraPlugins += ',richcombo,placeholder_select';
            }

            config.allowedContent = true;
            config.enterMode = window['CKEDITOR'].ENTER_BR;
            config.extraPlugins += ',showborders,font,justify';

            config.removeButtons = '';

            return config;
        }
    }

    export interface HtmlTemplateEditorOptions extends Serenity.HtmlContentEditorOptions {
        cols?: any;
        rows?: any;

        placeholders?: any;
    }
}
