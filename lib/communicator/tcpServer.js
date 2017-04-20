"use strict";

const net = require('net');

const TcpServer = function(host, port){
	this.host = host;
	this.port = port;
	this.server = net.createServer();
};

/**
 * 运行接受服务器
 * @return {null} 
 */
TcpServer.prototype.run = function() {
	let self = this;

	self.server.listen(self.port, self.host);

	self.server.on('connection', function(socket){
		console.log(`${self.host}:${self.port} connecting....`);

		socket.on('data', function(data){
			console.log(`${self.host}:${self.port} get: ${data.toString()}`);
			socket.write('hello');
		});

		socket.on('close', function(data){
			console.log(`${self.host}:${self.port} closed....`);
		});
	});
};

module.exports = TcpServer;