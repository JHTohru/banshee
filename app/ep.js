'use strict';

var page = require('webpage').create();
var system = require('system');

if (system.args.length === 1) {
    console.log('Usage: netlog.js <some URL>');
    phantom.exit(1);
} else {
    var address = system.args[1];

    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('FAIL to load the address');
        }

        console.log(page.evaluate(function() {
            var divs = document.querySelectorAll('div.percycle');
            var showcases = [];
            for (var i = 0; i < divs.length; i += 1) {
                showcases.push({
                    class: divs[i].className,
                    widget: divs[i].getAttribute('data-widget'),
                    placement: divs[i].getAttribute('data-placement'),
                    processed: divs[i].getAttribute('data-processed'),
                });
            }

            if (showcases.length > 0) {
                return JSON.stringify(showcases, null, 2);
            }

            return false;
        }));

        phantom.exit();
    });
}