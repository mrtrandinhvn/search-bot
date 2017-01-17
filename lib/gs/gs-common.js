const $ = {};
$.ajax = (options) => {
    let defaultOptions = {
        type: "GET"
    };
    options = {
        ...defaultOptions,
        ...options
    };
    var request = new XMLHttpRequest();
    request.open(options.type, options.url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            if (typeof (options.success) === "function") {
                options.success(request.responseText);
            }
        } else if (request.status === 503) {
            // We reached our target server, but it returned an error
            alert("Request blocked by Google, please abort process");
            if (typeof (options.error) === "function") {
                options.error(arguments);
            }
        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
        if (typeof (options.error) === "function") {
            options.error(arguments);
        }
    };
    request.send();
};
export default $;