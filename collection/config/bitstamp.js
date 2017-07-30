/*
* All configurations for Bitstamp.
*/


var websocket = {
    pusher_key: 'de504dc5763aeef9ff52'
}

var subscriptions = [
    ['live_trades', 'trade']
];


module.exports = {
    websocket: websocket,
    subscriptions: subscriptions
};
