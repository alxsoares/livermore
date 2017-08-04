/**
* Handles data.
*/


const Handler = (exchange, mappings) => {
    return {
        handle: function(channel_name, event_name, data) {
            const mapping = mappings[channel_name];
            const handled_data = [event_name, [exchange]];

            mapping.forEach((item) => {
                const value = item.raw ? data[item.key] : data;
                const handled_value = item.handling(value);
                handled_data[1].push(handled_value);
            });

            return handled_data;
        }
    };
};


const BitstampHandler = () => {
    return Handler('bitstamp', {
        'live_trades': [
            {
                key: 'id',
                raw: true,
                handling: (value) => value
            },
            {
                key: 'type',
                raw: true,
                handling: (value) => ['BUY', 'SELL'][value]
            },
            {
                key: 'amount',
                raw: true,
                handling: (value) => value
            },
            {
                key: 'price',
                raw: true,
                handling: (value) => value
            },
            {
                key: 'total',
                raw: false,
                handling: (data) => +(data['amount'] * data['price']).toFixed(2)
            },
            {
                key: 'timestamp',
                raw: true,
                handling: (value) => 1000 * value
            }
        ],
        'live_orders': [
            {
                key: 'id',
                raw: true,
                handling: (value) => value
            },
            {
                key: 'order_type',
                raw: true,
                handling: (value) => ['BUY', 'SELL'][value]
            },
            {
                key: 'amount',
                raw: true,
                handling: (value) => value
            },
            {
                key: 'price',
                raw: true,
                handling: (value) => value
            },
            {
                key: 'total',
                raw: false,
                handling: (data) => +(data['amount'] * data['price']).toFixed(2)
            },
            {
                key: 'datetime',
                raw: true,
                handling: (value) => 1000 * value
            }
        ]
    });
}


module.exports = {
    bitstamp_handler: BitstampHandler()
}
