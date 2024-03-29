﻿namespace _Ext.ExcelImporter {
    export interface ExcelImportFieldMappingRow {
        Id?: number;
        ExcelColumnName?: string;
        TableColumnName?: string;
        Remarks?: string;
    }

    export namespace ExcelImportFieldMappingRow {
        export const idProperty = 'Id';
        export const localTextPrefix = 'ExcelImporter.ExcelImportFieldMapping';
        export const deletePermission = null;
        export const insertPermission = null;
        export const readPermission = '';
        export const updatePermission = null;

        export declare const enum Fields {
            Id = "Id",
            ExcelColumnName = "ExcelColumnName",
            TableColumnName = "TableColumnName",
            Remarks = "Remarks"
        }
    }
}
