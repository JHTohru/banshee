'use strict';

var page = require('webpage').create();
var system = require('system');

if (system.args.length === 1) {
    console.log('Usage: netlog.js <some URL>');
    phantom.exit();
} else {
    var url = system.args[1];

    page.onError = function (msg, trace) {
        // console.log(msg);

        // trace.forEach(function(item) {
        //     console.log('  ', item.file, ':', item.line);
        // });
    };

    page.onResourceRequested = function(request) {
        // console.log('Request ' + JSON.stringify(request, undefined, 4));
    };

    page.onResourceReceived = function(response) {
        // console.log('Receive ' + JSON.stringify(response, undefined, 4));
    };

    page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36';

    page.onLoadFinished = function(status) {
        if (status === 'success') {
            var showcases = JSON.parse(page.evaluate(function() {
                var divs = document.querySelectorAll('div.percycle');
                var widgets = [];

                for (var i = 0; i < divs.length; i += 1) {
                    widgets.push({
                        widget: divs[i].getAttribute('data-widget'),
                        processed: JSON.parse(divs[i].getAttribute('data-processed')),
                        placement: divs[i].getAttribute('data-placement'),
                        hasContent: divs[i].outerHTML.trim() !== '',
                    });
                }

                return JSON.stringify(widgets);
            }));

            var reportObj = {};
            reportObj[url] = showcases;

            console.log(JSON.stringify(reportObj, null, 2));
        } else {
            console.log(url + ' status: ' + status);
        }

        phantom.exit();
    };
}