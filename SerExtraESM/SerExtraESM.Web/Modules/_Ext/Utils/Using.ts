import { resolveUrl } from "@serenity-is/corelib";

export function loadScript(url) {
    $.ajax({
        url: url,
        dataType: "script",
        async: false,           // <-- This is the key
        cache: true,
        success: function () {
            // all good...
        },
        error: function () {
            throw new Error("Could not load script " + url);
        }
    });
}

export function loadCss(url, styleId) {
    var style = $("#" + styleId);
    if (style.length > 0) {
        return;
    }

    $("<link/>")
        .attr("type", "text/css")
        .attr("id", styleId)
        .attr("rel", "stylesheet")
        .attr("href", resolveUrl(url))
        .appendTo(document.head);

    var node = document.createElement("style");
    node.setAttribute("rel", "stylesheet");
    node.innerHTML = ".datepicker.dropdown-menu { font-family: unset; }";
    document.head.appendChild(node);
}

export function usingVuejs() {
    if (window['Vue']) {
        return;
    } else {
        loadScript(resolveUrl("~/Scripts/vue.js"));
    }
}

export function usingBootstrapDatePicker() {
    if ($.fn['BSdatepicker']) {
        return;
    } else {
        loadCss("~/Scripts/datepicker/datepicker3.css", "bootstrapdatepicker");
        loadScript(resolveUrl("~/Scripts/datepicker/bootstrap-datepicker.js"));

        //localization
        $.fn.datepicker['dates'].bn = {
            days: ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"],
            daysShort: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"],
            daysMin: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"],
            months: ["জানুয়ারী", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "অগাস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"],
            monthsShort: ["জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "অগাস্ট", "সেপ্টে", "অক্টো", "নভে", "ডিসে"],
            today: "আজ", monthsTitle: "মাস", clear: "পরিষ্কার",
            weekStart: 0, format: "mm/dd/yyyy"
        }

        //to fix conflic with jQuery datepicker
        if (!$.fn['BSdatepicker'] && $.fn.datepicker && $.fn.datepicker['noConflict']) {
            var datepicker = $.fn.datepicker['noConflict']();
            $.fn['BSdatepicker'] = datepicker;
        }

    }
}

export function usingBootstrapColorPicker() {
    if (window['colorpicker']) {
        return;
    } else {
        loadCss("~/Scripts/colorpicker/bootstrap-colorpicker.min.css", "colorpicker");
        loadScript(resolveUrl("~/Scripts/colorpicker/bootstrap-colorpicker.min.js"))
    }
}

export function usingJqueryUITimepickerAddon() {
    if (window['datetimepicker']) {
        return;
    } else {
        loadCss("~/lib/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.css", "datetimepicker");
        loadScript(resolveUrl("~/lib/jquery-ui-timepicker-addon/jquery-ui-timepicker-addon.js"))
    }
}

export function usingChartjs() {
    if (window['Chart']) {
        return;
    } else {
        loadScript(resolveUrl('~/Scripts/chartjs/Chart.min.js'))
    }

    window['Chart'].defaults.global.defaultFontFamily = $('body').css('font-family');
    window['Chart'].defaults.global.maintainAspectRatio = false;
    window['Chart'].defaults.global.tooltips.mode = 'index';
}


export function usingSlickGridEditors() {
    if (window['Slick'] && window['Slick']['Editors'] && window['Slick']['Editors']['Text']) {
        return;
    } else {
        loadScript(resolveUrl("~/lib/_Ext/Editors/slick.editors.js"))
    }
}

export function usingSlickAutoColumnSize() {
    if (window['Slick'] && window['Slick']['AutoColumnSize']) {
        return;
    } else {
        loadScript(resolveUrl("~/lib/_Ext/CustomSlickGridPlugin/slick.autocolumnsize.js"))
    }
}

export function usingSlickHeaderFilters() {
    if (window['Slick'] && window['Slick']['HeaderFilters']) {
        return;
    } else {
        loadCss("~/lib/_Ext/CustomSlickGridPlugin/slick-headerfilters.css", "slick-headerfilters");
        loadScript(resolveUrl("~/lib/_Ext/CustomSlickGridPlugin/slick.headerfilters.js"));
    }
}