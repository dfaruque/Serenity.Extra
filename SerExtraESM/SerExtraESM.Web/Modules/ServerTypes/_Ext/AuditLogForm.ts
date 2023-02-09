import { StringEditor, EnumEditor, DateTimeEditor, IntegerEditor, LookupEditor, PrefixedContext } from "@serenity-is/corelib";
import { AuditActionType } from "./AuditActionType";
import { StaticTextBlock } from "@/_Ext/Editors/StaticTextBlock";
import { initFormType } from "@serenity-is/corelib/q";

export interface AuditLogForm {
    EntityTableName: StringEditor;
    ActionType: EnumEditor;
    ActionDate: DateTimeEditor;
    EntityId: IntegerEditor;
    Changes: StaticTextBlock;
    UserId: LookupEditor;
    IpAddress: StringEditor;
    SessionId: StringEditor;
    RequestedURI: StringEditor;
}

export class AuditLogForm extends PrefixedContext {
    static formKey = '_Ext.AuditLog';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!AuditLogForm.init)  {
            AuditLogForm.init = true;

            var w0 = StringEditor;
            var w1 = EnumEditor;
            var w2 = DateTimeEditor;
            var w3 = IntegerEditor;
            var w4 = StaticTextBlock;
            var w5 = LookupEditor;

            initFormType(AuditLogForm, [
                'EntityTableName', w0,
                'ActionType', w1,
                'ActionDate', w2,
                'EntityId', w3,
                'Changes', w4,
                'UserId', w5,
                'IpAddress', w0,
                'SessionId', w0,
                'RequestedURI', w0
            ]);
        }
    }
}

[AuditActionType]; // referenced types
