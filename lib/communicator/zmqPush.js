"use strict";

const zeromq = require('zmq'),
	idGenerator = require('../utils/idGenerator');
/**
 * zmq push create
 * @param {string} host zmq服务器地址
 * @param {number} port zmq服务器端口
 */
const ZmqPush = function(host, port){
	this.host = host;
	this.port = port;
	this.url = `tcp://${host}:${port}`;

	this.socket = zeromq.socket('push') || null;

	// this.context = null;
	this.flushIdentityId();
};

/**
 * zmq push set context for sending to server
 * @param {string} context  zmq发送内容
 * @return {string} context zmq发送内容
 */
// ZmqPush.prototype.setContext = function(context){
// 	this.context = context;
// 	return this.context;
// };

/**
 * zmq push flush identity id
 * @return {string} identity_id 身份id
 */
ZmqPush.prototype.flushIdentityId = function(){
	this.identity_id = idGenerator.getIdentityId('PUSH_PULL');
	return this.identity_id;
};

/**
 * zmq run server
 * @return {null} 
 */
ZmqPush.prototype.run = function() {
	let self = this;
	if(!self.socket){
		console.error('can not find socket!');
		return;
	}
	self.socket.bind(self.url, function(error){
		if(error){
			console.error('zmqPush run get error', error);
			return;
		}
		console.log('zmq pusher running.....');
	});
};

/**
 * zmq push send message to receiver
 * @return {null}
 */
ZmqPush.prototype.send = function(msg){
	let self = this;
	if(!self.socket){
		console.error('can not find socket!');
		return;
	}
	// TODO: need deal
	let sendObj = {
		identity_id: self.identity_id,
		msg_id: idGenerator.getMsgId(),
		msg: msg
	};
	self.socket.send(JSON.stringify(sendObj));
};

module.exports = ZmqPush;