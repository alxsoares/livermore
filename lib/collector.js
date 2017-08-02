/*
* Creates and injects the object dependencies and starts the application.
*/


var Queue = require('queue-fifo');

var fetchers = require('./collector/fetchers');
var handlers = require('./collector/handlers');
var broadcasters = require('./collector/broadcasters');

var confs = {
    index: require('./confs/index.js'),
    bitstamp: require('./confs/bitstamp.js')
};


exchanges = confs.index.exchanges;

exchanges.forEach((exchange) => {
    queue = new Queue();

    handler = handlers[`${exchange}_handler`]();

    fetcher = fetchers[`${exchange}_fetcher`](confs[exchange], handler, queue);
    fetcher.start();

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

    broadcaster = broadcasters[`${exchange}_broadcaster`](confs[exchange], queue, db_client);
    broadcaster.start();
});
