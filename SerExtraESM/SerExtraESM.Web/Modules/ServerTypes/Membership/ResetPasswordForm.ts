import { PasswordEditor, PrefixedContext, initFormType } from "@serenity-is/corelib";

export interface ResetPasswordForm {
    NewPassword: PasswordEditor;
    ConfirmPassword: PasswordEditor;
}

export class ResetPasswordForm extends PrefixedContext {
    static readonly formKey = 'Membership.ResetPassword';
    private static init: boolean;

    constructor(prefix: string) {
        super(prefix);

        if (!ResetPasswordForm.init)  {
            ResetPasswordForm.init = true;

            var w0 = PasswordEditor;

            initFormType(ResetPasswordForm, [
                'NewPassword', w0,
                'ConfirmPassword', w0
            ]);
        }
    }
}