/**
* Handles data.
*/


var handler = (name, mappings) => {
    return {
        handle: function(channel_name, data) {
            mapping = mappings[channel_name];
            handled_data = new Array(name);

            mapping.forEach((item) => {
                var handled_value = item.handling(item.raw ? data[item.key] : data);
                handled_data.push(handled_value);
            });

            return handled_data;
        }
    };
};


var bitstamp_handler = () => {
    mappings = {
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
                handling: (value) => parseInt(value)
            }
        ]
    };

    return handler('bitstamp', mappings);
}


module.exports = {
    bitstamp_handler: bitstamp_handler
}
