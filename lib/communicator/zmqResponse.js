"use strict";

const zeromq = require('zmq');


const ZmqResponse = function(host, port){
	this.host = host;
	this.port = port;
	this.url = `tcp://${host}:${port}`;

	this.socket = zeromq.socket('rep') || null;
};

ZmqResponse.prototype.run = function() {
	let self = this;

	self.socket.connect(self.url);
	self.socket.on('message',function(msg) {
		msg = JSON.parse(msg);
		console.log(msg);
		self.socket.send('success');
	});
};

module.exports = ZmqResponse;