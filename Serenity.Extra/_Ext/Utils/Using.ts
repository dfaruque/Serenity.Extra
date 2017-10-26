
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

