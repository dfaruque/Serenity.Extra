function loadScript(url) {
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

function loadCss(url, styleId) {
    var style = $("#" + styleId);
    if (style.length > 0) {
        return;
    }

    $("<link/>")
        .attr("type", "text/css")
        .attr("id", styleId)
        .attr("rel", "stylesheet")
        .attr("href", Q.resolveUrl(url))
        .appendTo(document.head);

    var node = document.createElement("style");
    node.setAttribute("rel", "stylesheet");
    node.innerHTML = ".datepicker.dropdown-menu { font-family: unset; }";
    document.head.appendChild(node);
}

function usingVuejs() {
    if (window['Vue']) {
        return;
    } else {
        loadScript(Q.resolveUrl("~/Scripts/vue.js"));

        //filters
        window['Vue'].filter('formatDate', function (value, format) {
            if (value) {
                return Q.formatDate(value, format)
            }
        });

        window['Vue'].filter('formatDateReadable', function (value) {
            if (value) {
                let date = Q.parseISODateTime(value);
                return date.getDate() + ' ' + _Ext.Months[date.getMonth()].substr(0, 3) + ' ' + date.getFullYear();
            }
        });

        window['Vue'].filter('dayOnly', function (value) {
            if (value) {
                return Q.formatDate(value, 'dd');
            }
        });

        window['Vue'].filter('monthOnly', function (value) {
            if (value) {
                let date = Q.parseISODateTime(value);
                return _Ext.Months[date.getMonth()];
            }
        });
        window['Vue'].filter('monthOnly3', function (value) {
            if (value) {
                let date = Q.parseISODateTime(value);
                return _Ext.Months[date.getMonth()].substr(0, 3);
            }
        });

        window['Vue'].filter('yearOnly', function (value) {
            if (value) {
                let date = Q.parseISODateTime(value);
                return date.getFullYear();
            }
        });

        window['Vue'].filter('timeOnlyHHmm', function (value) {
            if (value) {
                return Q.formatDate(value, 'HH:mm');
            }
        });

        window['Vue'].filter('formatDateTimeReadable', function (value) {
            if (value) {
                let date = Q.parseISODateTime(value);
                return date.getDate() + ' ' + _Ext.Months[date.getMonth()] + ' ' + date.getFullYear()
                    + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            }
        });

        window['Vue'].filter('enumText', function (value, enumKey) {
            if (value) {
                return Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), value);
            }
        });

        window['Vue'].filter('truncate', function (text, length, clamp) {
            clamp = clamp || '...';
            length = length || 30;

            if (text.length <= length) return text;

            var tcText = text.slice(0, length - clamp.length);
            var last = tcText.length - 1;


            while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;

            // Fix for case when text dont have any `space`
            last = last || length - clamp.length;

            tcText = tcText.slice(0, last);

            return tcText + clamp;
        });

        window['Vue'].filter('capitalize', function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1)
        });
    }
}

function usingBootstrapDatePicker() {
    if ($.fn['BSdatepicker']) {
        return;
    } else {
        loadCss("~/Scripts/datepicker/datepicker3.css", "bootstrapdatepicker");
        loadScript(Q.resolveUrl("~/Scripts/datepicker/bootstrap-datepicker.js"));

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

function usingBootstrapColorPicker() {
    if (window['colorpicker']) {
        return;
    } else {
        loadCss("~/Scripts/colorpicker/bootstrap-colorpicker.min.css", "colorpicker");
        loadScript(Q.resolveUrl("~/Scripts/colorpicker/bootstrap-colorpicker.min.js"))
    }
}

function usingJqueryUITimepickerAddon() {
    if (window['datetimepicker']) {
        return;
    } else {
        loadCss("~/Content/jquery-ui-timepicker-addon.css", "datetimepicker");
        loadScript(Q.resolveUrl("~/Scripts/jquery-ui-timepicker-addon.js"))
    }
}

function usingChartjs() {
    if (window['Chart']) {
        return;
    } else {
        loadScript(Q.resolveUrl('~/Scripts/chartjs/Chart.min.js'))
    }

    window['Chart'].defaults.global.defaultFontFamily = $('body').css('font-family');
    window['Chart'].defaults.global.maintainAspectRatio = false;
    window['Chart'].defaults.global.tooltips.mode = 'index';
}


function usingSlickGridEditors() {
    if (window['Slick'] && window['Slick']['Editors'] && window['Slick']['Editors']['Text']) {
        return;
    } else {
        loadScript(Q.resolveUrl("~/Modules/_Ext/Editors/slick.editors.js"))
    }
}

function usingSlickAutoColumnSize() {
    if (window['Slick'] && window['Slick']['AutoColumnSize']) {
        return;
    } else {
        loadScript(Q.resolveUrl("~/Modules/_Ext/CustomSlickGridPlugin/slick.autocolumnsize.js"))
    }
}

function usingSlickHeaderFilters() {
    if (window['Slick'] && window['Slick']['HeaderFilters']) {
        return;
    } else {
        loadCss("~/Modules/_Ext/CustomSlickGridPlugin/slick-headerfilters.css", "slick-headerfilters");
        loadScript(Q.resolveUrl("~/Modules/_Ext/CustomSlickGridPlugin/slick.headerfilters.js"));
    }
}