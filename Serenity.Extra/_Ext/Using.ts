
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


function usingVisjs() {
    if (typeof vis !== "undefined") {
        return;
    } else {
        loadScript(Q.resolveUrl("~/Scripts/visjs/vis.min.js"))
    }
}
