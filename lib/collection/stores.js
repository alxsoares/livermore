/*
* Broadcasts data to various destinations (e.g., a database).
*/


var store = (confs, queue, db_client) => {
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
            }, confs.saving.interval);
        }
    };
};


var bitstamp_store = (confs, queue, db_client) => {
    return store(confs, queue, db_client);
};


module.exports = {
    bitstamp_store: bitstamp_store
};
