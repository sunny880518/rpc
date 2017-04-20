"use strict";

const ZResponse = require('../lib/communicator/zmqResponse');

var host = '127.0.0.1';
var port = 3010;
var r = new ZResponse(host, port);

r.run();