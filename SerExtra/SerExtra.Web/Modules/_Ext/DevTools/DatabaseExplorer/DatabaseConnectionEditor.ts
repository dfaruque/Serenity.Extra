/// <reference path="../../Editors/ServiceEditorBase.ts" />

namespace _Ext.DevTools {

    @Serenity.Decorators.registerEditor()
    export class DataConnectionEditor extends ServiceEditorBase<ServiceEditorOptions, DatabaseExplorerConnection> {

        constructor(hidden: JQuery) {
            super(hidden, null);
        }

        public getItemKey(item: DatabaseExplorerConnection): string {
            return item.Key;
        }

        public getItemText(item: DatabaseExplorerConnection): string {
            return item.Key;
        }

        public getService() {
            return DatabaseExplorerService.baseUrl;
        }

        public executeQuery(options: Serenity.ServiceOptions<Serenity.ListResponse<DatabaseExplorerConnection>>): void {
            options.url = Q.resolveUrl("~/Services/_Ext/DatabaseExplorer/ListConnections");
            super.executeQuery(options);
        }

        public executeQueryByKey(options: Serenity.ServiceOptions<Serenity.RetrieveResponse<DatabaseExplorerConnection>>): void {
            options.onSuccess({
                Entity: {
                    Key: options.request.EntityId
                }
            });
        }
    }
}