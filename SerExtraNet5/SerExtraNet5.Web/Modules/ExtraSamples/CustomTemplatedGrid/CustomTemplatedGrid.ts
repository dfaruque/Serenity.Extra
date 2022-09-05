namespace SerExtraNet5.ExtraSamples {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.filterable()
    export class CustomTemplatedGrid extends Northwind.CategoryGrid {

        private customHtmlDiv: JQuery = $('<div/>');

        constructor(container: JQuery) {
            super(container);
            this.slickContainer.hide();
            this.customHtmlDiv.insertAfter(this.slickContainer);

            setTimeout(() => {
                this.customHtmlDiv.css({
                    'overflow-y': 'auto',
                    height: this.slickContainer.height()
                });
            });
        }

        setItems(items: Northwind.CategoryRow[]) {
            let tr = `<tr>
                        <th>Category Name</th>
                        <th>Description</th>
                      </tr>`;

            items.forEach(item => tr +=
                `<tr>
                    <td>${item.CategoryName}</td>
                    <td>${item.Description}</td>
                </tr>`);

            let html = `<table class="table table-striped table-bordered">
                            ${tr}
                        <table>
                        `;

            this.customHtmlDiv.html(html);
        }
    }
}