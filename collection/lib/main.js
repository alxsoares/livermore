/*
* Creates and injects the object dependencies and starts the application.
*/


var broadcasters = require('./broadcasters');
var collectors = require('./collectors');

general_confs = require('../config/index.js');
var confs = {
    bitstamp: require('../config/bitstamp.js')
};


env = general_confs.env;
exchanges = general_confs.exchanges;

exchanges.forEach((exchange) => {
    broadcaster = broadcasters[`${exchange}_broadcaster`](env);
    collector = collectors[`${exchange}_collector`](confs[exchange], broadcaster);
    collector.start();
});
