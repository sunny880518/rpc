var TcpClient = require('../lib/communicator/tcpClient')

var i = 0;
setInterval(function(){
	var tc = new TcpClient('127.0.0.1', 3010);
	tc.send(`${i++}_hello`);
}, 1000);