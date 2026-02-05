import { ComboboxEditor, Decorators, WidgetProps } from "@serenity-is/corelib";

@Decorators.registerEditor('Ext.HardCodedLookupEditor')
export class HardCodedLookupEditor<P extends HardCodedLookupEditorOptions = HardCodedLookupEditorOptions>
    extends ComboboxEditor<P, any> {

    constructor(props: WidgetProps<P>) {
        super(props);

        let source = this.options.sourceArray;
        if (this.options.sourceCSV) {
            source = this.options.sourceCSV.split(',');
        }

        source.forEach(i => this.addOption(i, i));
    }
}

export interface HardCodedLookupEditorOptions {
    sourceArray: string[];
    sourceCSV: string;
    allowOtherValue: boolean;
}
