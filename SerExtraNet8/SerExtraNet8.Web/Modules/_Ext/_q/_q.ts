import { NumberFormatter } from "@serenity-is/corelib"

export * from "./_q.array"
export * from "./_q.datetime"
export * from "./_q.editor-utils"
export * from "./_q.enum"
export * from "./_q.keyboard-layout"
export * from "./_q.var"

export function getSelectedLanguage(): string {
    var lang = document.getElementsByTagName('html')[0].getAttribute('lang');
    return lang;
}

export function isBanglaMode(): boolean {
    var lang = document.getElementsByTagName('html')[0].getAttribute('lang');
    if (lang) return lang.toLowerCase().indexOf('bn') >= 0;
    return false;
}

export function formatDecimal(value) {
    let title = NumberFormatter.format(value, '#,##0.00');
    return title;
}

export function formatInt(value) {
    let title = NumberFormatter.format(value, '#,##0');
    return title;
}

// Check numeric or not then return value, if NAN then return zero(0)
export function toNumber(value): number {
    return isNaN(value) ? 0 : Number(value);
}

export function toFixed(value, fractionDigits = 2): string {
    return toNumber(value).toFixed(fractionDigits);
}

export function toBool(value) {
    if (value == true || value == 'true' || value == 1 || value == "1") return true;
    else if (value == false || value == 'false' || value == 0 || value == "0") return false;
    else return null;
}

//colorDepth should be within '0123456789ABCDEF'
export function getRandomColor(hexLetters) {
    var letters = hexLetters// '0123456789ABCDEF';

    var color = '#';
    for (var i = 0; i < 6; i++) {
        var letterIndex = Math.floor((Math.random()) * letters.length);
        if (letterIndex > 15) letterIndex = 15;
        if (letterIndex < 0) letterIndex = 0;
        color += letters[letterIndex];
    }
    return color;
}

