"use strict";

const ZRequest = require('../lib/communicator/zmqRequest');

var host = '127.0.0.1';
var port = 3010;

var r = new ZRequest(host, port);
r.run();

let i = 0;
setInterval(function(){
	r.send(`hello_${Date.now()}_${i++}`, function(repData){
		console.log('get response data', repData);
	});
}, 1000);