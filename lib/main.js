/*
* Creates and injects the object dependencies and starts the application.
*/


var Queue = require('queue-fifo');

var collectors = require('./collectors');
var handlers = require('./handlers');
var ingestors = require('./ingestors');

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

    // mock
    var db_client = {
        connect: () => {
            console.log('connecting...');
        },
        query: (values) => {
            console.log(values.join(' '));
        },
        end: () => {
            console.log('finishing...');
        }
    };

    ingestor = ingestors[`${exchange}_ingestor`](confs[exchange], queue, db_client);
    ingestor.start();
});
