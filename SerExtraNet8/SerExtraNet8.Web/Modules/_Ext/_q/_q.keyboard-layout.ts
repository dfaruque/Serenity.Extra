import { Fluent } from "@serenity-is/corelib";

export function switchKeybordLayout($container, layout) {
    let writing_fields = $container.find('.bangla-only, .s-QuickSearchInput, .s-StringEditor, .s-TextAreaEditor, .select2-input').filter(function () {
        return Fluent(this).closest('.english-only,.do-not-change-ANSI-font').length == 0;
    });

    if (layout == 'phonetic') {
        writing_fields.bnKb({
            'switchkey': {
                'webkit': '7',
                'mozilla': '7',
                'msie': '7'
            },
            'driver': window['phonetic']
        });
    } else if (layout == 'probhat') {
        writing_fields.bnKb({
            'switchkey': {
                'webkit': '8',
                'mozilla': '8',
                'msie': '8'
            },
            'driver': window['probhat']
        });
    } else if (layout == 'unijoy') {
        writing_fields.bnKb({
            'switchkey': {
                'webkit': '9',
                'mozilla': '9',
                'msie': '9'
            },
            'driver': window['unijoy']
        });
    } else if (layout == 'english') {
        writing_fields.bnKb.toggle();
    } else {
        writing_fields.bnKb({
            'switchkey': {
                'webkit': '7',
                'mozilla': '7',
                'msie': '7'
            },
            'driver': window['phonetic']
        });
    }
}

