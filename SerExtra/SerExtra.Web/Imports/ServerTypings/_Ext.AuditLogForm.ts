namespace _Ext {
    export interface AuditLogForm {
        EntityTableName: Serenity.StringEditor;
        ActionType: Serenity.EnumEditor;
        ActionDate: Serenity.DateTimeEditor;
        EntityId: Serenity.IntegerEditor;
        Changes: StaticTextBlock;
        UserId: Serenity.LookupEditor;
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
                var w1 = s.EnumEditor;
                var w2 = s.DateTimeEditor;
                var w3 = s.IntegerEditor;
                var w4 = StaticTextBlock;
                var w5 = s.LookupEditor;

                Q.initFormType(AuditLogForm, [
                    'EntityTableName', w0,
                    'ActionType', w1,
                    'ActionDate', w2,
                    'EntityId', w3,
                    'Changes', w4,
                    'UserId', w5,
                    'IpAddress', w0,
                    'SessionId', w0
                ]);
            }
        }
    }
}

