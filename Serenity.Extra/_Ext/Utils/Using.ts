
function loadScriptAsync(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script') as HTMLScriptElement;
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);

}

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

function includeBootstrapColorPickerCss() {
    var style = $("#colorpicker");
    if (style.length > 0) {
        return;
    }

    $("<link/>")
        .attr("type", "text/css")
        .attr("id", "colorpicker")
        .attr("rel", "stylesheet")
        .attr("href", Q.resolveUrl("~/Scripts/colorpicker/bootstrap-colorpicker.min.css"))
        .appendTo(document.head);

}
function usingBootstrapColorPicker() {
    if (window['colorpicker']) {
        return;
    } else {
        includeBootstrapColorPickerCss();
        loadScript(Q.resolveUrl("~/Scripts/colorpicker/bootstrap-colorpicker.min.js"))
    }
}

function includeJqueryUITimepickerAddonCss() {
    var style = $("#datetimepicker");
    if (style.length > 0) {
        return;
    }

    $("<link/>")
        .attr("type", "text/css")
        .attr("id", "datetimepicker")
        .attr("rel", "stylesheet")
        .attr("href", Q.resolveUrl("~/Content/jquery-ui-timepicker-addon.css"))
        .appendTo(document.head);

}
function usingJqueryUITimepickerAddon() {
    if (window['datetimepicker']) {
        return;
    } else {
        includeJqueryUITimepickerAddonCss();
        loadScript(Q.resolveUrl("~/Scripts/jquery-ui-timepicker-addon.js"))
    }
}

function usingBabylonjs() {
    if (window['BABYLON'] && window['BABYLON']['Engine']) {
        return;
    } else {
        loadScript(Q.resolveUrl("~/Scripts/babylonjs/babylon.js"))
    }
}

function usingVuejs() {
    if (window['Vue']) {
        return;
    } else {
        loadScript(Q.resolveUrl("~/Scripts/vue.js"));

        //filters
        window['Vue'].filter('formatDate', function (value) {
            if (value) {
                return Q.formatDate(value)
            }
        });

        window['Vue'].filter('formatDateReadable', function (value) {
            if (value) {
                let date = Q.parseISODateTime(value);
                return date.getDate() + ' ' + _Ext.Months[date.getMonth()] + ' ' + date.getFullYear();
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

        window['Vue'].filter('enumName', function (value) {
            if (value) {
                return Serenity.EnumFormatter.getName(value);
            }
        });

    }
}

function usingChartjs() {
    if (window['Chart']) {
        return;
    } else {
        loadScript(Q.resolveUrl('~/Scripts/chartjs/Chart.js'))
    }
}

function includeCustomMarkerCss() {
    var style = $("#customMarker");
    if (style.length > 0) {
        return;
    }

    $("<link/>")
        .attr("type", "text/css")
        .attr("id", "customMarker")
        .attr("rel", "stylesheet")
        .attr("href", Q.resolveUrl("~/Scripts/googlemap/CustomMarker.css"))
        .appendTo(document.head);

}

function usingCustomMarker() {
    if (window['CustomMarker']) {
        return;
    } else {
        includeCustomMarkerCss();
        loadScript(Q.resolveUrl("~/Scripts/googlemap/CustomMarker.js"))
    }
}


function includeGoogleMap(callback?: Function, callbackFullName?: string) {
    if (window['google']) {
        if (callback) callback();
        return;
    }

    var script = $("#googleScript");
    if (script.length > 0) {
        if (callback) callback();
        return;
    }

    $("<script/>")
        .attr("type", "text/javascript")
        .attr("id", "googleScript")
        .attr("src", 'http://maps.google.com/maps/api/js?v=3.31&key=AIzaSyCRiY7aFA2cI6STbl3YQ3r6m1IpUFmBM98&callback=' + callbackFullName || 'includeGoogleMap')
        .appendTo(document.head);

}

function includeMarkerWithLabel() {
    if (window['MarkerWithLabel']) {
        return;
    }

    var script = $("#MarkerWithLabelScript");
    if (script.length > 0) {
        return;
    }

    $("<script/>")
        .attr("type", "text/javascript")
        .attr("id", "MarkerWithLabelScript")
        .attr("src", Q.resolveUrl("~/Scripts/googlemap/markerwithlabel.js"))
        .appendTo(document.head);

}

function includeVisCss() {
    var style = $("#Vis");
    if (style.length > 0) {
        return;
    }

    $("<link/>")
        .attr("type", "text/css")
        .attr("id", "Vis")
        .attr("rel", "stylesheet")
        .attr("href", Q.resolveUrl("~/Scripts/visjs/vis.min.css"))
        .appendTo(document.head);

}

function usingVisjs() {
    if (window['vis']) {
        return;
    } else {
        includeVisCss()
        loadScript(Q.resolveUrl("~/Scripts/visjs/vis.min.js"))
    }
}



