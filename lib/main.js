/*
* Creates and injects the object dependencies and starts the application.
*/


var Queue = require('queue-fifo');

var handlers = require('./handlers');
var collectors = require('./collectors');

general_confs = require('../config/index.js');
var confs = {
    bitstamp: require('../config/bitstamp.js')
};


env = general_confs.env;
exchanges = general_confs.exchanges;

exchanges.forEach((exchange) => {
    queue = new Queue();

    handler = handlers[`${exchange}_handler`]();

    collector = collectors[`${exchange}_collector`](confs[exchange], handler, queue);
    collector.start();

    // TODO ingestor
});
