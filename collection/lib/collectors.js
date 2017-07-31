/**
* Collects data from exchanges' APIs.
*/


var Pusher = require('pusher-js/node')


var bitstamp_collector = function(confs, broadcaster) {
    pusher = new Pusher(confs.pusher_key, {
        encrypted: true
    });

    return {
        start: function() {
            confs.subscriptions.forEach(function(subscription) {
                var channel_name = subscription.channel_name;
                var event = subscription.event;

                var channel = pusher.channel(channel_name) || pusher.subscribe(channel_name);

                channel.bind(event, function(order) {
                    broadcaster.broadcast(channel_name, order);
                });
            });
        }
    };
};


module.exports = {
    bitstamp_collector: bitstamp_collector
};
