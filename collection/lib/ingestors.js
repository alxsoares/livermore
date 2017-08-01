/*
* Ingests data into a database.
*/


var ingestor = (confs, queue, db_client) => {
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
            }, confs.ingestion.interval);
        }
    };
};


var bitstamp_ingestor = (confs, queue, db_client) => {
    return ingestor(confs, queue, db_client);
};


module.exports = {
    bitstamp_ingestor: bitstamp_ingestor
};
