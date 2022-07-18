namespace SerExtraNet5.Common {
    export namespace ExcelImportService {
        export const baseUrl = 'Common/ExcelImport';

        export declare function Create(request: Serenity.SaveRequest<ExcelImportRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<ExcelImportRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<ExcelImportRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<ExcelImportRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function GetExcelData(request: ExcelImportRequest, onSuccess?: (response: Serenity.ListResponse<{ [key: string]: any }>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function ImportExcelData(request: Serenity.SaveRequest<ExcelImportRow>, onSuccess?: (response: ExcelImportResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Common/ExcelImport/Create",
            Update = "Common/ExcelImport/Update",
            Delete = "Common/ExcelImport/Delete",
            Retrieve = "Common/ExcelImport/Retrieve",
            List = "Common/ExcelImport/List",
            GetExcelData = "Common/ExcelImport/GetExcelData",
            ImportExcelData = "Common/ExcelImport/ImportExcelData"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List', 
            'GetExcelData', 
            'ImportExcelData'
        ].forEach(x => {
            (<any>ExcelImportService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
