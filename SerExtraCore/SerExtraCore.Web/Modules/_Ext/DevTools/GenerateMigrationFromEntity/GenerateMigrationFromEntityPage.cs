
namespace _Ext.DevTools.Pages
{
    using Serenity;
    using Serenity.Data;
    using System;
    using System.Linq;
    using System.Reflection;
    using Serenity.Data.Mapping;
    using Serenity.Web;
    using System.IO;
    using System.Web.Hosting;
#if COREFX
    using Microsoft.AspNetCore.Mvc;
#else
    using System.Web.Mvc;
    [RoutePrefix("GenerateMigrationFromEntity"), Route("{action=index}")]
#endif
    [PageAuthorize("DevTools:GenerateMigrationFromEntity")]
    public class GenerateMigrationFromEntityController : Controller
    {
#if COREFX
        [Route("GenerateMigrationFromEntity")]
#endif
        [HttpGet]
        public ActionResult Index()
        {
            return View("~/Modules/_Ext/DevTools/GenerateMigrationFromEntity/GenerateMigrationFromEntityIndex.cshtml");
        }

#if COREFX
        [Route("GenerateMigrationFromEntity/MigrationViewer")]
#endif
        [HttpGet]
        public ActionResult MigrationViewer()
        {
            var model = new Model.GenerateMigrationFromEntityPageModel();

            return View("~/Modules/_Ext/DevTools/GenerateMigrationFromEntity/GenerateMigrationFromEntityMigrationViewer.cshtml", model);
        }

#if COREFX
        [Route("GenerateMigrationFromEntity/GenerateSingleFile")]
#endif
        public ActionResult GenerateSingleFile()
        {
            var model = new Model.GenerateMigrationFromEntityPageModel();

            ////write a cs file
            var filePath = HostingEnvironment.MapPath("~/App_Data/GeneratedMigrations/InitialMigration.cs");
            Directory.CreateDirectory(Path.GetDirectoryName(filePath));
            System.IO.File.Delete(filePath);
            foreach (var migration in model.Migrations)
            {
                if (!string.IsNullOrWhiteSpace(migration.Remarks))
                    System.IO.File.AppendAllText(filePath, migration.Remarks + Environment.NewLine);
                System.IO.File.AppendAllText(filePath, migration.Migration);
            }


            return View("~/Modules/_Ext/DevTools/GenerateMigrationFromEntity/GenerateMigrationFromEntitySuccessMsg.cshtml", model);
        }

#if COREFX
        [Route("GenerateMigrationFromEntity/GenerateFileForEachTable")]
#endif
        public ActionResult GenerateFileForEachTable()
        {
            var model = new Model.GenerateMigrationFromEntityPageModel();

            foreach (var migration in model.Migrations)
            {
                ////write a cs file
                var migrationFileName = $"{migration.PaddedMigrationNumber}_{migration.TableName}";
                var filePath = HostingEnvironment.MapPath($"~/App_Data/GeneratedMigrations/{migrationFileName}.cs");
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));
                System.IO.File.Delete(filePath);
                if (!string.IsNullOrWhiteSpace(migration.Remarks))
                    System.IO.File.AppendAllText(filePath, migration.Remarks + Environment.NewLine);

                string migrationClass = $@"using FluentMigrator;

namespace DBMigration.Migrations
{{

    [Migration({migration.PaddedMigrationNumber})]
    public class {migration.TableName} : Migration
    {{
        public override void Up()
        {{
           {migration.Migration}
        }}

        public override void Down()
        {{
            Delete.Table(""{migration.TableName}"");
        }}
    }}

}}";

                System.IO.File.AppendAllText(filePath, migrationClass);
            }


            return View("~/Modules/_Ext/DevTools/GenerateMigrationFromEntity/GenerateMigrationFromEntitySuccessMsg.cshtml", model);
        }
    }
}
