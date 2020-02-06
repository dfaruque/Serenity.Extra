
namespace _Ext {

    export interface ServiceEditorOptions {
        cascadeFrom?: string;
        cascadeField?: string;
        cascadeValue?: any;
    }

    @Serenity.Decorators.registerClass()
    export class ServiceEditorBase<TOptions extends ServiceEditorOptions, TRow> extends Serenity.Select2AjaxEditor<TOptions, TRow> {
        private cascadeLink: Serenity.CascadedWidgetLink<Serenity.Widget<any>>;

        constructor(hidden: JQuery, options: TOptions) {
            super(hidden, options);

            this.setCascadeFrom(this.options.cascadeFrom);
        }

        private setCascadeFrom(value: string): void {
            if (Q.isEmptyOrNull(value)) {
                if (this.cascadeLink) {
                    this.cascadeLink.set_parentID(null);
                    this.cascadeLink = null;
                }

                this.options.cascadeFrom = null;
                return;
            }

            this.cascadeLink = new Serenity.CascadedWidgetLink(Serenity.Widget, this,
                p => this.cascadeValue = this.getCascadeFromValue(p));

            this.cascadeLink.set_parentID(value);
            this.options.cascadeFrom = value;
        }

        public get cascadeValue(): any {
            return this.options.cascadeValue;
        }

        public set cascadeValue(value: any) {
            if (value !== this.options.cascadeValue) {
                this.options.cascadeValue = value;
                this.value = null;
            }
        }

        public get cascadeField(): any {
            return this.options.cascadeField || this.options.cascadeFrom;
        }

        public set cascadeField(value: any) {
            this.options.cascadeField = value;
        }

        public get cascadeFrom(): any {
            return this.options.cascadeFrom;
        }

        public set cascadeFrom(value: any) {
            if (value !== this.options.cascadeFrom) {
                this.setCascadeFrom(value);
            }
        }

        private getCascadeFromValue(parent: Serenity.Widget<any>) {
            return Serenity.EditorUtils.getValue(parent);
        }

        protected getIncludeColumns(): string[] {
            return [];
        }

        protected getSort(): string[] {
            return [];
        }

        public getTypeDelay(): number {
            return 500;
        }

        private lastRequest: JQueryXHR;

        public executeQueryByKey(options: Serenity.ServiceOptions<Serenity.RetrieveResponse<TRow>>): void {
            var request = <Serenity.RetrieveRequest>options.request;
            request.ColumnSelection = Serenity.RetrieveColumnSelection.keyOnly;
            request.IncludeColumns = this.getIncludeColumns();
            super.executeQueryByKey(options);
        }

        public executeQuery(options: Serenity.ServiceOptions<Serenity.ListResponse<TRow>>): void {

            var request = <Serenity.ListRequest>options.request;

            request.ColumnSelection = Serenity.ColumnSelection.KeyOnly;
            request.IncludeColumns = this.getIncludeColumns();
            request.Sort = this.getSort();
            request.ExcludeTotalCount = true;

            if (this.cascadeField) {
                request.EqualityFilter = request.EqualityFilter || {};
                request.EqualityFilter[this.cascadeField] = this.cascadeValue;
            }

            options.blockUI = false;
            options.error = () => {};

            if (this.lastRequest != null && this.lastRequest.readyState != XMLHttpRequest.DONE)
                this.lastRequest.abort();

            this.lastRequest = Q.serviceCall(options);
            this.lastRequest.then(() => this.lastRequest = null, () => this.lastRequest = null);
        }
    }
}