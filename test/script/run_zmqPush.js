"use strict";
var Push = require('../lib/communicator/zmqPush');


var host = '127.0.0.1';
var port = 3010;

var s = new Push(host, port);
s.run();

let i = 0;
setInterval(function(){
	s.send(`hello_${Date.now()}_${i++}`);
};, 1000);