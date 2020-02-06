namespace _Ext.DevTools {
    export namespace DatabaseExplorerService {
        export const baseUrl = '_Ext/DatabaseExplorer';

        export declare function ListConnections(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<DatabaseExplorerConnection>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function ListTables(request: DatabaseExplorerListTablesRequest, onSuccess?: (response: Serenity.ListResponse<DatabaseExplorerTable>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function ListColumns(request: DatabaseExplorerListRequest, onSuccess?: (response: Serenity.ListResponse<Serenity.PropertyItem>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: DatabaseExplorerListRequest, onSuccess?: (response: Serenity.ListResponse<{ [key: string]: any }>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            ListConnections = "_Ext/DatabaseExplorer/ListConnections",
            ListTables = "_Ext/DatabaseExplorer/ListTables",
            ListColumns = "_Ext/DatabaseExplorer/ListColumns",
            List = "_Ext/DatabaseExplorer/List"
        }

        [
            'ListConnections', 
            'ListTables', 
            'ListColumns', 
            'List'
        ].forEach(x => {
            (<any>DatabaseExplorerService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

