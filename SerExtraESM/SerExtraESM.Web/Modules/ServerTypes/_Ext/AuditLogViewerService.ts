import { ServiceOptions, serviceRequest } from "@serenity-is/corelib";
import { AuditLogViewerRequest } from "./AuditLogViewerRequest";
import { AuditLogViewerResponse } from "./AuditLogViewerResponse";

export namespace AuditLogViewerService {
    export const baseUrl = 'AuditLogViewer';

    export declare function List(request: AuditLogViewerRequest, onSuccess?: (response: AuditLogViewerResponse) => void, opt?: ServiceOptions<any>): JQueryXHR;

    export const Methods = {
        List: "AuditLogViewer/List"
    } as const;

    [
        'List'
    ].forEach(x => {
        (<any>AuditLogViewerService)[x] = function (r, s, o) {
            return serviceRequest(baseUrl + '/' + x, r, s, o);
        };
    });
}