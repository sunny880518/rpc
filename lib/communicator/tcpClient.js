"use strict";

const net = require('net'),
	idGenerator = require('../utils/idGenerator');

const TcpClient = function(host, port){
	this.host = host;
	this.port = port;
	this.client = new net.Socket();
};

/**
 * 刷新身份ID
 * @return {String} 返回身份ID
 */
TcpClient.prototype.flushIdentityId = function() {
	this.identity_id = idGenerator.getIdentityId('TCP');
	return this.identity_id;
};

/**
 * 发送消息
 * @param  {String} msg 	消息体
 * @return {null}     
 */
TcpClient.prototype.send = function(msg) {
	let self = this;
	if(!self.client){
		console.error('not find client!!');
		return;
	}
	let sendObj = {
		identity_id: self.identity_id,
		msg_id: idGenerator.getMsgId(),
		msg: msg
	};
	self.client.connect(self.port, self.host, function(){
		self.client.write(JSON.stringify(sendObj));
	});

	self.client.on('data', function(data){
		console.log('get res data:', data.toString());
		self.client.destroy();
	});

	self.client.on('close', function(){
		console.log('tcp closed!!');
	});
};

module.exports = TcpClient;