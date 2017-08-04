/*
* Creates and injects the object dependencies and starts the application.
*/


const confs = require('./confs.js');

const collectors = require('./collection/collectors');
const handlers = require('./collection/handlers');


exchanges = confs.exchanges;

exchanges.forEach((exchange) => {
    const handler = handlers[`${exchange}_handler`]

    // store = stores[`${exchange}_store`](confs[exchange], queue, db_client);
    // store.start();

    const collector = collectors[`${exchange}_collector`](handler);
    collector.start();
});
