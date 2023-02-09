import { initFullHeightGridPage } from "@serenity-is/corelib/q"
import { AuditLogGrid } from "./AuditLogGrid";

$(function() {
    initFullHeightGridPage(new AuditLogGrid($('#GridDiv')).element);
});