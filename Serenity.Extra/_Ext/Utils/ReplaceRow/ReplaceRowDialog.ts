
namespace _Ext {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.maximizable()
    export class ReplaceRowDialog extends Serenity.EntityDialog<any, any> {
        protected getFormKey() { return ReplaceRowForm.formKey; }

        protected form = new ReplaceRowForm(this.idPrefix);

        constructor(public request: ReplaceRowRequest, public entityList: Array<any>) {
            super();

            this.dialogTitle = 'Replace Row'

            this.form.DeletedEntityName.value = request.DeletedEntityName
            this.form.ReplaceWithEntityId.items = entityList.map<Serenity.Select2Item>(m => { return { id: String(m[request.IdProperty]), text: m[request.NameProperty], source: m } });
        }

        protected getToolbarButtons(): Serenity.ToolButton[] {
            let buttons = []; super.getToolbarButtons();

            buttons.push({
                title: 'Replace',
                icon: 'fa fa fa-trash-o',
                onClick: () => {
                    if (this.validateForm() == false)
                        return

                    Q.confirm(`Are you sure? 

${this.request.EntityTypeTitle}: "${this.request.DeletedEntityName}" will be deleted 
and all references will be replaced with "${this.form.ReplaceWithEntityId.text}". 

This action cannot be undone!

`, () => {
                            this.request.ReplaceWithEntityId = Q.toId(this.form.ReplaceWithEntityId.value);

                            Q.serviceRequest(Q.resolveUrl('~/Services/ReplaceRow/Replace'), this.request, response => {
                                this.dialogClose()

                                if (window['lastGrid']) //for single paged apps
                                    window['lastGrid'].refresh()

                            })

                        })

                }
            })

            return buttons;
        }


    }

}
