import { SaveRequest, SaveResponse, ServiceOptions, DeleteRequest, DeleteResponse, RetrieveRequest, RetrieveResponse, ListRequest, ListResponse, serviceRequest } from "@serenity-is/corelib";
import { AuditLogRow } from "./AuditLogRow";

export namespace AuditLogService {
    export const baseUrl = '_Ext/AuditLog';

    export declare function Create(request: SaveRequest<AuditLogRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Update(request: SaveRequest<AuditLogRow>, onSuccess?: (response: SaveResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Delete(request: DeleteRequest, onSuccess?: (response: DeleteResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function Retrieve(request: RetrieveRequest, onSuccess?: (response: RetrieveResponse<AuditLogRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;
    export declare function List(request: ListRequest, onSuccess?: (response: ListResponse<AuditLogRow>) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        Create: "_Ext/AuditLog/Create",
        Update: "_Ext/AuditLog/Update",
        Delete: "_Ext/AuditLog/Delete",
        Retrieve: "_Ext/AuditLog/Retrieve",
        List: "_Ext/AuditLog/List"
    } as const;

    [
        'Create', 
        'Update', 
        'Delete', 
        'Retrieve', 
        'List'
    ].forEach(x => {
        (<any>AuditLogService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}