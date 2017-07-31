/**
* Collects data from exchanges' APIs.
*/


var Pusher = require('pusher-js/node')


var collector = (confs, broadcaster, get_channel) => {
    return {
        start: () => {
            confs.subscriptions.forEach((subscription) => {
                var channel_name = subscription.channel_name;
                var event = subscription.event;

                var channel = get_channel(channel_name);

                channel.bind(event, (order) => {
                    broadcaster.broadcast(channel_name, order);
                });
            });
        }
    };
};


var bitstamp_collector = (confs, broadcaster) => {
    pusher = new Pusher(confs.pusher_key, {
        encrypted: true
    });

    return collector(confs, broadcaster, (channel_name) => {
        return pusher.channel(channel_name) || pusher.subscribe(channel_name);
    });
};


module.exports = {
    bitstamp_collector: bitstamp_collector
};
