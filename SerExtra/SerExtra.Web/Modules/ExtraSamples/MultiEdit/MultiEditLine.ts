declare namespace _Ext {

    interface MultiEditLine {
        field?: string;
        operator?: string;
        isOr?: boolean;
        leftParen?: boolean;
        rightParen?: boolean;
        validationError?: string;
        criteria?: any[];
        displayText?: string;
        state?: any;
    }

}