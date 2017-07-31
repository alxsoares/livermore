/**
* Broadcasts data to subscribers.
*/


// mock
var broadcaster = () => {
    return {
        broadcast: function(channel_name, order) {
            console.log(channel_name, order);
        }
    };
};


var bitstamp_broadcaster = () => {
    return broadcaster();
}


module.exports = {
    bitstamp_broadcaster: bitstamp_broadcaster
}
