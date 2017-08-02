/*
* Broadcasts data to various destinations (e.g., a database).
*/


var broadcaster = (confs, queue, db_client) => {
    return {
        start: () => {
            setInterval(() => {
                var size = queue.size();
                if(size > 0) {
                    db_client.connect();

                    for(var i = 0; i < size; i++) {
                        data = queue.dequeue();
                        db_client.query(data);
                    }

                    db_client.end();
                }
            }, confs.broadcasting.interval);
        }
    };
};


var bitstamp_broadcaster = (confs, queue, db_client) => {
    return broadcaster(confs, queue, db_client);
};


module.exports = {
    bitstamp_broadcaster: bitstamp_broadcaster
};
