"use strict";

const zeromq = require('zmq');

const ZmqSub = function(host, port){
	this.host = host;
	this.port = port;
	this.url = `tcp://${host}:${port}`;

	this.socket = zeromq.socket('sub') || null;
};

ZmqSub.prototype.run = function(channel) {
	let self = this;
	// subscribe with channel 订阅channel匹配msg开头
	self.socket.subscribe(channel);
	self.socket.on('message',function(msg) {
		console.log(channel+':', msg.toString());
	});
	self.socket.connect(self.url);

};

module.exports = ZmqSub;