interface JQuery {
    insertStatusAddOn(target: JQuery | any[] | Element | Text | string): JQuery;
}

declare namespace Slick {
    interface Column {
        onChange?: any;
    }
}