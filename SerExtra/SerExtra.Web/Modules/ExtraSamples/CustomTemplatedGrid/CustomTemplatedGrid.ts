namespace SerExtra.ExtraSamples {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.filterable()
    export class CustomTemplateGrid extends Northwind.CategoryGrid {

        private customHtml: JQuery = $('<div/>');

        constructor(container: JQuery) {
            super(container);

            this.slickContainer.hide();
            this.customHtml.insertAfter(this.slickContainer);
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

            this.customHtml.html(html);
        }
    }
}