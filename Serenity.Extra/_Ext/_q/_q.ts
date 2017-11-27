var isPageRefreshRequired: boolean;
//const nameof = <T>(name: keyof T) => name;
const nameofFactory = <T>() => (name: keyof T) => name;
//usage const nameof = nameofFactory<Edoc.RevenueReportModel>();

namespace q {

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

    //Array utils
    export function groupBy(xs: any[], key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

}

interface GridEditorOptions {
    isReadOnly?: boolean; //false
    height?: number;
    autoHeight?: boolean;//true
    width?: number;
    showCaption?: boolean;//false
    hideToolbar?: boolean;//false
}

interface GridOptions {
    AutoColumnSize: boolean,
    FadeInEffectWhenInit: boolean,
    ShowAnyInEqualityFilterWithTextValue: boolean,
}

interface DialogOptions {
    AutoFitContentArea: boolean,
}


declare namespace LiteDB {
    interface ObjectId {

    }
}