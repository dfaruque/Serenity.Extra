namespace _Ext {
    export interface AuditLogForm {
        EntityTableName: Serenity.StringEditor;
        VersionNo: Serenity.IntegerEditor;
        UserId: Serenity.LookupEditor;
        ActionType: Serenity.EnumEditor;
        ActionDate: Serenity.DateTimeEditor;
        EntityId: Serenity.IntegerEditor;
        OldEntity: Serenity.StringEditor;
        NewEntity: Serenity.StringEditor;
        Differences: StaticTextBlock;
        IpAddress: Serenity.StringEditor;
        SessionId: Serenity.StringEditor;
    }

    export class AuditLogForm extends Serenity.PrefixedContext {
        static formKey = '_Ext.AuditLog';
        private static init: boolean;

        constructor(prefix: string) {
            super(prefix);

            if (!AuditLogForm.init)  {
                AuditLogForm.init = true;

                var s = Serenity;
                var w0 = s.StringEditor;
                var w1 = s.IntegerEditor;
                var w2 = s.LookupEditor;
                var w3 = s.EnumEditor;
                var w4 = s.DateTimeEditor;
                var w5 = StaticTextBlock;

                Q.initFormType(AuditLogForm, [
                    'EntityTableName', w0,
                    'VersionNo', w1,
                    'UserId', w2,
                    'ActionType', w3,
                    'ActionDate', w4,
                    'EntityId', w1,
                    'OldEntity', w0,
                    'NewEntity', w0,
                    'Differences', w5,
                    'IpAddress', w0,
                    'SessionId', w0
                ]);
            }
        }
    }
}
