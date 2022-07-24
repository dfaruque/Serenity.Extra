using Serenity.Services;
using Serenity.Web;
using System;
using System.Collections.Generic;

namespace _Ext.ExcelImporter
{
    public class ExcelImportRequest : ServiceRequest
    {
        public Int64 ExcelImportTemplateId { get; set; }
        public String FileName { get; set; }

        public static bool Validate(ExcelImportRequest request, IUploadStorage uploadStorage)
        {
            if (request == null)
                throw new ArgumentNullException(nameof(request));

            if (string.IsNullOrWhiteSpace(request.FileName))
                throw new ArgumentNullException(nameof(request.FileName));

            if (!uploadStorage.FileExists(request.FileName))
                throw new ArgumentException("File not found in the server!");

            if (!request.FileName.EndsWith(".xlsx", StringComparison.OrdinalIgnoreCase))
                throw new ArgumentException("The file type not supported! Please save as the file type as .xlsx");

            return true;
        }
    }

    public class ExcelImportResponse : ServiceResponse
    {
        public int Inserted { get; set; }
        public int Updated { get; set; }
        public List<string> ErrorList { get; set; }
    }
}