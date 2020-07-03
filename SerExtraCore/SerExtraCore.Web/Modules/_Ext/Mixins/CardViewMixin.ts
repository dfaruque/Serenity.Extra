namespace _Ext {
    export class CardViewMixin<TItem>  {
        private dataGrid: Serenity.DataGrid<TItem, any>;
        private getId: (item: TItem) => any;
        private vm;
        private cardContainer;
        public viewType: ('list' | 'card');


        constructor(private options: CardViewMixinOptions<TItem>) {
            var u, f;
            var dg: any = this.dataGrid = options.grid;
            var idProperty = (dg as any).getIdProperty();
            var getId = this.getId = (item: TItem) => (item as any)[idProperty];
            options.defaultViewType = options.defaultViewType || 'list';
            this.viewType = options.defaultViewType;

            var divViewSwitch = $('\n<div class="btn-group view-switch" data-toggle="buttons" style="float: right">\n    <label class="btn btn-default active" title="List View">\n        <i class="fa fa-th-list text-purple"><\/i>\n        <input type="radio" name="' + dg.element.attr("id") + '_ViewType" value="list" checked />\n    <\/label>\n    <label class="btn btn-default" title="Card View">\n        <i class="fa fa-th-large text-purple"><\/i>\n        <input type="radio" name="' + dg.element.attr("id") + '_ViewType" value="card" />    \n    <\/label>\n<\/div>')
                .prependTo(dg.element.find(".grid-title"));

            this.cardContainer = $('<div class="card-container" style="display: none;"><div class="card-items"><\/div><\/div>').insertAfter(dg.element.children(".grid-container"));

            divViewSwitch.find("input").change((e) => {
                return this.switchView($(e.target).val())
            });

            this.resizeCardView();

            dg.element.bind("layout", () => {
                return this.resizeCardView()
            });

            dg.view.onDataChanged.subscribe(() => {
                this.vm && this.updateCardItems()
            });

            u = dg.getCurrentSettings;
            dg.getCurrentSettings = (n) => {
                var i = u.apply(dg, [n]);
                return i.viewType = divViewSwitch.find("input:checked").val(), i
            };

            f = dg.restoreSettings;
            dg.restoreSettings = function (n, i) {
                var u, e, o, s;
                if (f.apply(dg, [n, i]),
                    n == null) {
                    if (u = this.getPersistanceStorage(),
                        u == null)
                        return;
                    if (e = Q.trimToNull(u.getItem(this.getPersistanceKey())),
                        !e)
                        return;
                    n = JSON.parse(e)
                }
                o = n.viewType || options.defaultViewType;
                s = divViewSwitch.find("input:checked").val() || options.defaultViewType;
                o != s && divViewSwitch.find("input").eq(o == "card" ? 1 : 0).click()
            }
        }

        switchView(viewType: ('grid' | 'card')) {
            this.resizeCardView();
            var isCardView = viewType == "card";
            this.dataGrid.element.children(".card-container").toggle(isCardView);
            this.dataGrid.element.children(".grid-container").toggle(!isCardView);
            isCardView && this.updateCardItems();
            (this.dataGrid as any).persistSettings()
        }

        updateCardItems() {
            if (this.vm)
                this.vm.items = this.dataGrid.getItems()
            else {
                usingVuejs();
                this.vm = new Vue({
                    el: this.cardContainer.children()[0],
                    template: this.options.containerTemplate ? `<div> ${this.options.containerTemplate} </div>`
                        : `<div class="card-items">
    <div v-for="(item, index) in items" class="${(this.options.itemCssClass || 'col-sm-12 col-md-6 col-lg-4')}">
        <div class="card-item" style="${this.options.itemCssStyle}">
        ${this.options.itemTemplate}
        </div>
    </div>
</div>`,
                    data: {
                        items: this.dataGrid.getItems()
                    },
                    methods: this.options.methods
                })
            }
        }
        resizeCardView() {
            var gridContainer = this.dataGrid.element.children(".grid-container")
                , width = this.dataGrid.element.width()
                , height = gridContainer.height();
            this.dataGrid.element.children(".card-container").css({
                width: width + "px",
                height: height + "px"
            })
        }
    }

    export interface CardViewMixinOptions<TItem> {
        // data grid object
        grid: Serenity.DataGrid<TItem, any>;
        containerTemplate?: string;
        itemTemplate?: string;
        methods?: any;
        itemCssClass?: string;
        defaultViewType?: ('list' | 'card');
        itemsCssStyle?: string;
        itemCssStyle?: string;
    }
}
