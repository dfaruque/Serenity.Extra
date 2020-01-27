namespace q {
    export function text(key: string, fallback: string): string {
        var result = Q.text(key);

        if (result == key) return fallback;
        else return result;
    }

    export function isCosmicThemeApplied(): boolean {
        return document.body.className.indexOf('cosmic') >= 0;
    }

    export function getSelectedLanguage(): string {
        var lang = (document.getElementById('LanguageSelect') as HTMLSelectElement).value || document.getElementsByTagName('html')[0].getAttribute('lang');
        return lang;
    }

    export function formatDecimal(value) {
        let title = Serenity.NumberFormatter.format(value, '#,##0.00');
        return title;
    }

    export function formatInt(value) {
        let title = Serenity.NumberFormatter.format(value, '#,##0');
        return title;
    }

    // Check numeric or not then return value, if NAN then return zero(0)
    export function ToNumber(value) {
        return isNaN(value) ? 0 : value;
    }

    export function ToBool(value) {
        return value == 'true' ? true : false;
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

}

