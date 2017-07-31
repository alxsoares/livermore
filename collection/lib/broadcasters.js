/**
* Broadcasts data to subscribers.
*/


// mock
var broadcaster = (env, name) => {
    return {
        broadcast: function(channel_name, data) {
            console.log(`${env.name}_${name}_${channel_name}`, data);
        }
    };
};


var bitstamp_broadcaster = (env) => {
    return broadcaster(env, 'bitstamp');
}


module.exports = {
    bitstamp_broadcaster: bitstamp_broadcaster
}
