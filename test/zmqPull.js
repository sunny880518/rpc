var Pull = require('../lib/communicator/zmqPull.js'),
	should = require('should');

describe('zmq rpc pull test', function(){
	it('create pull', function(done){
		var host = '127.0.0.1',
			port = 3010;
		var s = new Pull(host, port);
		should.exist(s);
		s.host.should.equal(host);
		s.port.should.equal(port);
		s.url.should.equal(`tcp://${host}:${port}`);
		should.exist(s.socket);
		done();
	});
});