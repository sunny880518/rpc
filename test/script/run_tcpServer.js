var tcpServer = require('../lib/communicator/tcpServer')


var ts = new tcpServer('127.0.0.1', 3010);

ts.run();