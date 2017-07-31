/*
* Creates and injects the object dependencies and starts the application.
*/


var broadcasters = require('./broadcasters');
var collectors = require('./collectors');

var bitstamp_confs = require('../config/bitstamp.js');


collectors.bitstamp_collector(bitstamp_confs, broadcasters.bitstamp_broadcaster())
          .start();
