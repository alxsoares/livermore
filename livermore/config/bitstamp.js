/*
* All configurations for Bitstamp.
*/


module.exports = {
    pusher_key: 'de504dc5763aeef9ff52',
    subscriptions: [
        {
            channel_name: 'live_trades',
            event: 'trade'
        }
    ],
    ingestion: {
        interval: parseInt(process.env.BITSTAMP_INGESTION_INTERVAL) || 1000
    }
};
