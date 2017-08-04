/**
* Fetches data from exchanges' APIs.
*/


const Pusher = require('pusher-js/node');
const Queue = require('queue-fifo');


/**
A websocket collector. Given an array of subscriptions, where each subscription
is an object containing the properties `channel_name` and `event_name`, bind the
occurrency of the `event_name` to the channel with the proper `channel_name`.

@confs:
*/
const _WebsocketCollector = (subscriptions, handler, get_channel) => {
    return {
        start: () => {
            subscriptions.forEach((subscription) => {
                const channel_name = subscription.channel_name;
                const event_name = subscription.event_name;
                const sink = subscription.sink;

                const channel = get_channel(channel_name);
                const queue = new Queue();

                channel.bind(event_name, (data) => {
                    const handled_data = handler.handle(channel_name, event_name, data);
                    queue.enqueue(handled_data);

                    const element = queue.dequeue();
                    console.log(element[0], '[', element[1].join(' '), ']');
                });
            })
        }
    };
};


const BitstampCollector = (handler) => {
    const pusher = new Pusher('de504dc5763aeef9ff52', {
        encrypted: true
    });

    const subscriptions = [
        {
            channel_name: 'live_trades',
            event_name: 'trade',
            sink: 'trades'
        },
        {
            channel_name: 'live_orders',
            event_name: 'order_created',
            sink: 'orders'
        },
        {
            channel_name: 'live_orders',
            event_name: 'order_changed',
            sink: 'orders'
        },
        {
            channel_name: 'live_orders',
            event_name: 'order_deleted',
            sink: 'orders'
        }
    ]

    return _WebsocketCollector(subscriptions, handler, (channel_name) => {
        return pusher.channel(channel_name) || pusher.subscribe(channel_name);
    });
};


module.exports = {
    bitstamp_collector: BitstampCollector
};
