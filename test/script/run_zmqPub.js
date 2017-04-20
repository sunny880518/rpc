var Pub = require('../lib/communicator/zmqPub');

var p = new Pub('127.0.0.1', 3010);

p.run();

var i = 0;
setInterval(function(){
	p.send(`${i++}_hello`);
}, 1000);