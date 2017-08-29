namespace _Ext {

    @Serenity.Decorators.registerClass([Serenity.IGetEditValue, Serenity.ISetEditValue])
    @Serenity.Decorators.editor()
    @Serenity.Decorators.element("<div/>")
    export class TimelineEditor extends Serenity.Widget<any> implements Serenity.IGetEditValue, Serenity.ISetEditValue {
        public getEditValue(property, target) { target[property.name] = this.value; }
        public setEditValue(source, property) { this.value = source[property.name]; }

        public timeline: vis.Timeline;
        public items: vis.DataSet<vis.DataItem>;

        constructor(container: JQuery) {
            super(container);
            usingVisjs();

            // Create a DataSet (allows two way data-binding)
            //var items = new vis.DataSet([
            //    { id: 1, content: 'item 1', start: '2013-04-20' },
            //    { id: 2, content: 'item 2', start: '2013-04-14' },
            //    { id: 3, content: 'item 3', start: '2013-04-18' },
            //    { id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19' },
            //    { id: 5, content: 'item 5', start: '2013-04-25' },
            //    { id: 6, content: 'item 6', start: '2013-04-27' }
            //]);

            // Configuration for the Timeline
            var options : vis.TimelineOptions = { };

            // Create a Timeline
            this.timeline = new vis.Timeline(this.element[0], this.items, options);

        }

        public get value(): vis.DataSet<vis.DataItem> {
            return this.items;
        }

        public set value(val: vis.DataSet<vis.DataItem>) {
            this.items = val;
            this.timeline.setItems(this.items);
        }

        destroy(): void {
            super.destroy();
            this.timeline.destroy();
        }

    }
}