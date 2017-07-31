/*
* Creates and injects the object dependencies and starts the application.
*/


var handlers = require('./handlers');
var collectors = require('./collectors');

general_confs = require('../config/index.js');
var confs = {
    bitstamp: require('../config/bitstamp.js')
};


env = general_confs.env;
exchanges = general_confs.exchanges;

exchanges.forEach((exchange) => {
    handler = handlers[`${exchange}_handler`]();
    collector = collectors[`${exchange}_collector`](confs[exchange], handler);
    collector.start();
});
