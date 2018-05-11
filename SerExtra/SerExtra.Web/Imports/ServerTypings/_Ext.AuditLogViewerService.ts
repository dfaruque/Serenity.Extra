namespace _Ext {
    export namespace AuditLogViewerService {
        export const baseUrl = 'AuditLogViewer';

        export declare function List(request: AuditLogViewerRequest, onSuccess?: (response: AuditLogViewerResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            List = "AuditLogViewer/List"
        }

        [
            'List'
        ].forEach(x => {
            (<any>AuditLogViewerService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

