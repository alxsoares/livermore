/*
* Creates and injects the object dependencies and starts the application.
*/


var collectors = require('./collectors');

var bitstamp_confs = require('../config/bitstamp.js');


// mock broadcaster
broadcaster = {
    broadcast: function(channel_name, order) {
        console.log(channel_name, order);
    }
};

bitstamp_collector = collectors.BitstampCollector(bitstamp_confs, broadcaster);
bitstamp_collector.start();
