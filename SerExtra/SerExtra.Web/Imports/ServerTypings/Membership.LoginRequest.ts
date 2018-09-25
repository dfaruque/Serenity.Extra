namespace SerExtra.Membership {
    export interface LoginRequest extends Serenity.ServiceRequest {
        Username?: string;
        Password?: string;
        ReCaptcha?: string;
    }
}

