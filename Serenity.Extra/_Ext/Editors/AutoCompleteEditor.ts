namespace _Ext {
    @Serenity.Decorators.registerEditor()
    export class AutoCompleteEditor extends Serenity.StringEditor {
        constructor(input: JQuery, options: AutoCompleteOptions) {
            super(input, options);
            this.options = options;

            input.bind('change', e => {
                if (!Serenity.WX.hasOriginalEvent(e)) {
                    return;
                }
            });

            setTimeout(() => {
                this.bindAutoComplete(input);
            }, 1000);
        }

        protected bindAutoComplete(input): void {
            let opt = this.options as AutoCompleteOptions;
            let source = opt.sourceArray;
            if (opt.sourceCSV) {
                source = opt.sourceCSV.split(',');
            }
            else if (this.options.lookupKey) {
                let lookup = Q.getLookup(opt.lookupKey);
                source = lookup.items.map(m => m[lookup.textField]);
            }

            input.autocomplete({
                minLength: opt.minSearchLenth || 1,
                autoFocus: true,
                source: source,
                focus: function (event, ui) {

                    $(".ui-helper-hidden-accessible").hide();  //fix issue with the selected data showing up on webpage
                    event.preventDefault();
                    return false;
                },

            });

            input.data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li>")
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
            };
        }
    }

    export interface AutoCompleteOptions {
        lookupKey: string;
        sourceArray: string[];
        sourceCSV: string;
        minSearchLenth: number;
    }
}