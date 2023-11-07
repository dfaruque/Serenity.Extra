import { Decorators, Select2Editor } from "@serenity-is/corelib"

@Decorators.registerEditor('_Ext.HardCodedLookupEditor')
export class HardCodedLookupEditor extends Select2Editor<any, any> {

    constructor(container: JQuery, options: HardCodedLookupEditorOptions) {
        super(container, options);

        let source = options.sourceArray;
        if (options.sourceCSV) {
            source = options.sourceCSV.split(',');
        }

        source.forEach(i => this.addOption(i, i));
    }

    protected getSelect2Options() {
        let opt = super.getSelect2Options();



        return opt;
    }
}

export interface HardCodedLookupEditorOptions {
    sourceArray: string[];
    sourceCSV: string;
    allowOtherValue: boolean;
}
