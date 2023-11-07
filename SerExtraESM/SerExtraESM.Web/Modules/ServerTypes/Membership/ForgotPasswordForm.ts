import { EmailAddressEditor, PrefixedContext, initFormType } from "@serenity-is/corelib";

export interface ForgotPasswordForm {
    Email: EmailAddressEditor;
}

export class ForgotPasswordForm extends PrefixedContext {
    static readonly formKey = 'Membership.ForgotPassword';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ForgotPasswordForm.init)  {
            ForgotPasswordForm.init = true;

            var w0 = EmailAddressEditor;

            initFormType(ForgotPasswordForm, [
                'Email', w0
            ]);
        }
    }
}