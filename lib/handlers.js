/**
* Handles data.
*/


var handler = (name, mappings) => {
    return {
        handle: function(channel_name, data) {
            mapping = mappings[channel_name];
            handled_data = new Array(name);

            mapping.forEach((item) => {
                var handled_value = undefined;

                if (item.composition) {
                    var values = new Array();
                    item.composition.forEach( (key) => values.push(data[key]) );
                    handled_value = item.handling(values);
                }
                else {
                    var value = data[item.key];
                    handled_value = item.handling(value);
                }

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
                handling: (value) => value
            },
            {
                key: 'type',
                handling: (value) => ['BUY', 'SELL'][value]
            },
            {
                key: 'amount',
                handling: (value) => value
            },
            {
                key: 'price',
                handling: (value) => value
            },
            {
                key: 'total',
                composition: ['amount', 'price'],
                handling: (values) => values.reduce((x, y) => x * y)
            },
            {
                key: 'timestamp',
                handling: (value) => parseInt(value)
            }
        ]
    };

    return handler('bitstamp', mappings);
}


module.exports = {
    bitstamp_handler: bitstamp_handler
}
