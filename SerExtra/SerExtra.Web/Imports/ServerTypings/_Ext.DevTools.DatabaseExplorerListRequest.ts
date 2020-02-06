namespace _Ext.DevTools {
    export interface DatabaseExplorerListRequest extends Serenity.ListRequest {
        ConnectionKey?: string;
        TableName?: string;
    }
}

