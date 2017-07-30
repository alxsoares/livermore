/**
* Collects data from exchanges' APIs.
*/


var Pusher = require('pusher-js/node')


var BitstampCollector = function(confs, broadcaster) {
    var collector = {
        broadcaster: broadcaster
    };

    pusher_key = confs.websocket.pusher_key;
    collector.pusher = new Pusher(pusher_key, {
        encrypted: true
    });

    collector.start = function() {
        var subscriptions = confs.subscriptions;

        var get_channel = function(channel_name) {
            var pusher = collector.pusher;
            return pusher.channel(channel_name) || pusher.subscribe(channel_name);
        };

        subscriptions.forEach(function(tuple) {
            var channel_name = tuple[0];
            var event = tuple[1];

            var channel = get_channel(channel_name);

            channel.bind(event, function(order) {
                collector.broadcaster.broadcast(channel_name, order);
            });
        });
    };

    return collector;
};


module.exports = {
    BitstampCollector: BitstampCollector
};
