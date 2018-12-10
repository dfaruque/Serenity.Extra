namespace Serenity {

    @Decorators.registerClass('Serenity.MultiEditWidgetBase')
    export class MultiEditWidgetBase<TOptions> extends TemplatedWidget<TOptions> {
        private store: Serenity.MultiEditStore;

        private onMultiEditStoreChanged: () => void;

        constructor(div: JQuery, opt?: TOptions) {
            super(div, opt);

            this.store = new MultiEditStore([]);
            this.onMultiEditStoreChanged = () => this.filterStoreChanged();
            this.store.add_changed(this.onMultiEditStoreChanged);
        }

        destroy() {

            if (this.store) {
                this.store.remove_changed(this.onMultiEditStoreChanged);
                this.onMultiEditStoreChanged = null;
                this.store = null;
            }

            super.destroy();
        }

        protected filterStoreChanged() {
        }

        get_store(): MultiEditStore {
            return this.store;
        }

        set_store(value: MultiEditStore): void {
            if (this.store !== value) {
                if (this.store != null) 
                    this.store.remove_changed(this.onMultiEditStoreChanged);

                this.store = value || new MultiEditStore([]);
                this.store.add_changed(this.onMultiEditStoreChanged);
                this.filterStoreChanged();
            }
        }
    }
}