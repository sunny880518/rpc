"use strict";

const zeromq = require('zmq'),
	idGenerator = require('../utils/idGenerator');

const ZmqRequest = function(host, port){
	this.host = host;
	this.port = port;
	this.url = `tcp://${host}:${port}`;

	this.socket = zeromq.socket('req') || null;

	this.flushIdentityId();
};

ZmqRequest.prototype.flushIdentityId = function() {
	this.identity_id = idGenerator.getIdentityId('REQ_RES');
	return this.identity_id;
};

ZmqRequest.prototype.run = function() {
	let self = this;
	if(!self.socket){
		console.error('can not find socket!');
		return;
	}

	self.socket.bind(self.url, function(error){
		if(error){
			console.error('zmqRequest run get error', error);
			return;
		}
		console.log('zmq request running.....');
		self.socket.on('message', function(data){
			console.log('get data from response');
		});
	});
};

ZmqRequest.prototype.send = function(msg) {
	let self = this;
	if(!self.socket){
		console.error('can not find socket!');
		return;
	}

	var msg_id = idGenerator.getMsgId(); 
	let sendObj = {
		identity_id: self.identity_id,
		msg_id: msg_id,
		msg: msg
	};
	self.socket.send(JSON.stringify(sendObj));
};


module.exports = ZmqRequest;