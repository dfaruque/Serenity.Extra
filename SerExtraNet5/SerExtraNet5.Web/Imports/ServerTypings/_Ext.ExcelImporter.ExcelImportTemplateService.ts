namespace _Ext.ExcelImporter {
    export namespace ExcelImportTemplateService {
        export const baseUrl = 'Common/ExcelImportTemplate';

        export declare function Create(request: Serenity.SaveRequest<ExcelImportTemplateRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Update(request: Serenity.SaveRequest<ExcelImportTemplateRow>, onSuccess?: (response: Serenity.SaveResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Delete(request: Serenity.DeleteRequest, onSuccess?: (response: Serenity.DeleteResponse) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function Retrieve(request: Serenity.RetrieveRequest, onSuccess?: (response: Serenity.RetrieveResponse<ExcelImportTemplateRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function List(request: Serenity.ListRequest, onSuccess?: (response: Serenity.ListResponse<ExcelImportTemplateRow>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;
        export declare function GetExcelMetadata(request: ExcelImportRequest, onSuccess?: (response: Serenity.RetrieveResponse<ExcelMetadata>) => void, opt?: Q.ServiceOptions<any>): JQueryXHR;

        export declare const enum Methods {
            Create = "Common/ExcelImportTemplate/Create",
            Update = "Common/ExcelImportTemplate/Update",
            Delete = "Common/ExcelImportTemplate/Delete",
            Retrieve = "Common/ExcelImportTemplate/Retrieve",
            List = "Common/ExcelImportTemplate/List",
            GetExcelMetadata = "Common/ExcelImportTemplate/GetExcelMetadata"
        }

        [
            'Create', 
            'Update', 
            'Delete', 
            'Retrieve', 
            'List', 
            'GetExcelMetadata'
        ].forEach(x => {
            (<any>ExcelImportTemplateService)[x] = function (r, s, o) {
                return Q.serviceRequest(baseUrl + '/' + x, r, s, o);
            };
        });
    }
}
