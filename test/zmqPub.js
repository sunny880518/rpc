var should = require('should'),
	Pub = require('../lib/communicator/zmqPub');

describe('zmq rpc pub test', function(){
	it('create pub', function(done){
		var host = '127.0.0.1',
			port = 3010;

		var p = new Pub(host, port);
		should.exist(p);
		p.host.should.equal(host);
		p.port.should.equal(port);
		p.url.should.equal(`tcp://${host}:${port}`);
		should.exist(p.identity_id);
		done();
	});

	it('flush pub identity id', function(done){
		var host = '127.0.0.1',
			port = 3010;

		var p = new Pub(host, port);
		should.exist(p);
		var identity_id = p.identity_id;
		p.flushIdentityId();
		p.identity_id.should.not.equal(identity_id);
		done();
	});

	it('pub run', function(done){
		var host = '127.0.0.1',
			port = 3010;
		
		var p = new Pub(host, port);
		p.socket._zmq.state.should.equal(0);
		p.run();
		p.socket._zmq.state.should.equal(1);
		done();
	});

	it('send message', function(done){
		var host = '127.0.0.1',
			port = 3010;
		
		var p = new Pub(host, port);
		p.run();
		p.send('test', 'hello');
		done();
	});
});