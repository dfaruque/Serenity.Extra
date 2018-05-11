namespace _Ext {

    @Serenity.Decorators.element("<div/>")
    @Serenity.Decorators.registerEditor([Serenity.ISetEditValue])
    export class StaticTextBlock extends Serenity.Widget<StaticTextBlockOptions>
        implements Serenity.ISetEditValue {

        private _value: string;

        constructor(container: JQuery, options: StaticTextBlockOptions) {
            super(container, options);

            // hide the caption label for this editor if in a form. ugly hack
            if (this.options.hideLabel)
                this.element.closest('.field').find('.caption').hide();

            // remove required asterisk (*)
            this.element.closest('.field').find('sup').hide();

            this.updateElementContent();
        }

        private updateElementContent() {
            var text = Q.coalesce(this.options.text, this._value);

            // if isLocalText is set, text is actually a local text key
            if (this.options.isLocalText)
                text = Q.text(text);

            // don't html encode if isHtml option is true
            if (this.options.isHtml)
                this.element.html(text);
            else
                this.element.text(text);
        }

        /**
         * By implementing ISetEditValue interface, we allow this editor to display its field value.
         * But only do this when our text content is not explicitly set in options
         */
        public setEditValue(source: any, property: Serenity.PropertyItem) {
            if (this.options.text == null) {
                this._value = Q.coalesce(this.options.text, source[property.name]);
                this.updateElementContent();
            }
        }

        public get value() {
            return this._value;
        }

        public set value(value) {
            this._value = value;
            this.updateElementContent();
        }

    }

    export interface StaticTextBlockOptions {
        text: string;
        isHtml: boolean;
        isLocalText: boolean;
        hideLabel: boolean;
    }
    
}