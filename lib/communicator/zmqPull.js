"use strict";

const zeromq = require('zmq');

const ZmqPull = function(host, port){
	this.host = host;
	this.port = port;
	this.url = `tcp://${host}:${port}`;

	this.socket = zeromq.socket('pull') || null;
};

ZmqPull.prototype.run = function() {
	let self = this;
	self.socket.connect(self.url);

	self.socket.on('message',function(msg) {
		console.log(JSON.parse(msg.toString()));
	});
};

module.exports = ZmqPull;