namespace _Ext {
    export namespace ReplaceRowService {
        export const baseUrl = 'ReplaceRow';

        export declare function Replace(request: ReplaceRowRequest, onSuccess?: (response: ReplaceRowResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Replace = "ReplaceRow/Replace"
        }

        [
            'Replace'
        ].forEach(x => {
            (<any>ReplaceRowService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}

