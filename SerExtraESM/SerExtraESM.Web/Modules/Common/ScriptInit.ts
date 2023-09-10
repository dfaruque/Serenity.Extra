import { EntityDialog, HtmlContentEditor } from "@serenity-is/corelib";
import { Authorization, Config, ErrorHandling } from "@serenity-is/corelib/q";
import { siteLanguageList } from "./Helpers/LanguageList";

Config.rootNamespaces.push('SerExtraESM');
Config.rootNamespaces.push('_Ext');
EntityDialog.defaultLanguageList = siteLanguageList;
HtmlContentEditor.CKEditorBasePath = "~/Serenity.Assets/Scripts/ckeditor/";

if ($.fn['colorbox']) {
    $.fn['colorbox'].settings.maxWidth = "95%";
    $.fn['colorbox'].settings.maxHeight = "95%";
}

window.onerror = ErrorHandling.runtimeErrorHandler;