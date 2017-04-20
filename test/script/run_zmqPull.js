var Pull = require('../lib/communicator/zmqPull');


var host = '127.0.0.1';
var port = 3010;

var r = new Pull(host, port);

r.run();