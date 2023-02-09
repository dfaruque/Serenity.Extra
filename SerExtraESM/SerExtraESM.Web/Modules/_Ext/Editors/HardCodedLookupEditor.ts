import * as Serenity from "@serenity-is/corelib"

@Serenity.Decorators.registerEditor('_Ext.HardCodedLookupEditor')
export class HardCodedLookupEditor extends Serenity.Select2Editor<any, any> {

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
