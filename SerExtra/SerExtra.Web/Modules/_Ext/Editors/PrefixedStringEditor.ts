namespace _Ext {
    @Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element('<input type="text"/>')
    export class PrefixedStringEditor extends Serenity.Widget<PrefixedStringEditorOptions> implements Serenity.IGetEditValue, Serenity.ISetEditValue, Serenity.IReadOnly {
        public getEditValue(property, target) { target[property.name] = this.value; }
        public setEditValue(source, property) { this.value = source[property.name]; }

        private prefixInput: JQuery;

        constructor(container: JQuery, options: PrefixedStringEditorOptions) {
            super(container, options);
            this.options = options;

            let fontSize = parseFloat(window.getComputedStyle(this.element[0]).fontSize);
            let prefixInputWidth = options.prefixLength * fontSize;

            this.prefixInput = $('<input type="text"/>')
                .addClass('readonly')
                .attr('style', `width:${prefixInputWidth}px;`)
                .attr('disabled', 'disabled')
                .insertBefore(this.element);

            this.element.addClass('has-inplace-button');

            if (options.inputMaxLength) {
                setTimeout(() => { this.element.attr('maxlength', options.inputMaxLength); }, 1000);

            }
        }

        public get value(): string {
            let inputVal = this.element.val();
            return this.prefix + inputVal;
        }

        public set value(val: string) {
            if (val) {
                val = val.replace(' ', '');

                let prefix = val.substr(0, this.options.prefixLength);
                let inputVal = val.substr(this.options.prefixLength);

                this.prefix = prefix;
                this.element.val(inputVal);
            } else {
                this.element.val(val);
            }
        }

        private _prefix;
        public get prefix(): string {
            return this._prefix;
        }

        public set prefix(val: string) {
            this._prefix = val;
            if (this.options.prefixFormatterType) {
                let formatterType = Q.typeByFullName(this.options.prefixFormatterType);
                if (formatterType)
                    this.prefixInput.val(formatterType.format(val));
                else
                    this.prefixInput.val(val);
            } else {
                this.prefixInput.val(val);
            }
        }

        get_readOnly(): boolean {
            return this.element.hasClass('readonly');
        }

        set_readOnly(value: boolean): void {
            if (value == true) {
                this.element.addClass('readonly');
                this.element.attr("readonly", "readonly");
            } else {
                this.element.removeClass('readonly');
                this.element.removeAttr("readonly");
            }
        }


    }

    export interface PrefixedStringEditorOptions {
        prefixLength: number;
        inputMaxLength: number;
        prefixFormatterType?: string;
    }

}