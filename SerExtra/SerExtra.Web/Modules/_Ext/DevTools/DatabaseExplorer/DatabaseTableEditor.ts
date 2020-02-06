/// <reference path="../../Editors/ServiceEditorBase.ts" />

namespace _Ext.DevTools {

    @Serenity.Decorators.registerEditor()
    export class DataTableEditor extends ServiceEditorBase<ServiceEditorOptions, DatabaseExplorerTable> {

        constructor(hidden: JQuery, options: ServiceEditorOptions) {
            super(hidden, options);
        }

        public getItemKey(item: DatabaseExplorerTable): string {
            return item.Name;
        }

        public getItemText(item: DatabaseExplorerTable): string {
            return item.Name;
        }

        public getService() {
            return DatabaseExplorerService.baseUrl;
        }

        public executeQuery(options: Serenity.ServiceOptions<Serenity.ListResponse<DatabaseExplorerTable>>): void {
            options.url = Q.resolveUrl("~/Services/_Ext/DatabaseExplorer/ListTables");
            var connectionKey = this.cascadeValue;

            if (!connectionKey) {
                options.onSuccess({ Entities: [] });
                return;
            }

            (options.request as DatabaseExplorerListTablesRequest).ConnectionKey = connectionKey;
            super.executeQuery(options);
        }

        public executeQueryByKey(options: Serenity.ServiceOptions<Serenity.RetrieveResponse<DatabaseExplorerTable>>): void {
            options.onSuccess({
                Entity: {
                    Name: options.request.EntityId
                }
            });
        }
    }
}