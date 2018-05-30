namespace _Ext {

    @Serenity.Decorators.registerEditor()
    export class TemplatedLookupEditor extends Serenity.Select2Editor<any, any> {

        constructor(container: JQuery) {
            super(container, null);

        }


        getSelect2Options() {
            let opt = super.getSelect2Options();

            opt.escapeMarkup = (m) => {
                return m;
            }

            opt.data = [{
                id: 0,
                text: 'enhancement',
                html: '<div style="color:green">enhancement</div>'
            }, {
                id: 1,
                text: 'bug',
                html: '<div style="color:red">bug</div><div><small>This is some small text on a new line</small></div>'
            }];

            (opt as any).templateResult = (data) => {
                return data.html;
            }

            return opt;
        }
    }
}