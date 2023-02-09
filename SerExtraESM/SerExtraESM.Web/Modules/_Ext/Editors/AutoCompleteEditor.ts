import * as Serenity from "@serenity-is/corelib"
import * as Q from "@serenity-is/corelib/q"

@Serenity.Decorators.registerEditor('_Ext.AutoCompleteEditor')
export class AutoCompleteEditor extends Serenity.StringEditor {
    constructor(input: JQuery, options: AutoCompleteOptions) {
        super(input);
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
            minLength: opt.minSearchLength || 0,
            autoFocus: true,
            source: source,
            focus: function (event, ui) {

                //$(".ui-helper-hidden-accessible").hide();  //fix issue with the selected data showing up on webpage
                //event.preventDefault();
                //return false;
            },

        });

        input.data("ui-autocomplete")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<a>" + item.label + "</a>")
                .appendTo(ul);
        };

        input.bind('click', e => {
            var wasOpen = input.autocomplete("widget").is(":visible");
            // Close if already visible
            if (wasOpen) {
                return;
            }

            // Pass empty string as value to search for, displaying all results
            input.autocomplete("search", "");

        });
    }
}

export interface AutoCompleteOptions {
    lookupKey: string;
    sourceArray: string[];
    sourceCSV: string;
    minSearchLength: number;
}
