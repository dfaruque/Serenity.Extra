/// <reference path="../Bases/DialogBase.ts" />

namespace _Ext {

    @Serenity.Decorators.registerClass()
    @Serenity.Decorators.responsive()
    export class AuditLogDialog extends DialogBase<AuditLogRow, any> {
        protected getFormKey() { return AuditLogForm.formKey; }
        protected getIdProperty() { return AuditLogRow.idProperty; }
        protected getLocalTextPrefix() { return AuditLogRow.localTextPrefix; }
        protected getNameProperty() { return AuditLogRow.nameProperty; }
        protected getService() { return AuditLogService.baseUrl; }

        protected form = new AuditLogForm(this.idPrefix);

        protected afterLoadEntity() {
            super.afterLoadEntity();

            usingJsonDiffPatch();

            //showing diff visually
            var left = JSON.parse(this.entity.OldEntity);
            if (left) {
                if (left.PlantJson) {
                    left.PlantInfo = JSON.parse(left.PlantJson);
                    delete (left.PlantJson);
                }
                delete (left.Id);
                delete (left.IDate);
                delete (left.IUser);
                delete (left.EDate);
                delete (left.EUser);
            }

            var right = JSON.parse(this.entity.NewEntity);
            if (right) {
                if (right.PlantJson) {
                    right.PlantInfo = JSON.parse(right.PlantJson);
                    delete (right.PlantJson);
                }
            }

            var delta = jsondiffpatch.diff(left, right);

            // beautiful html diff
            this.form.Differences.value = jsondiffpatch.formatters.html.format(delta);

        }

    }
}