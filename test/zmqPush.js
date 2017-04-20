var Push = require('../lib/communicator/zmqPush.js'),
	should = require('should');

describe('zmq rpc push test', function(){
	it('create push', function(done){
		var host = '127.0.0.1',
			port = 3010;
		var s = new Push(host, port);
		should.exist(s);
		s.host.should.equal(host);
		s.port.should.equal(port);
		s.url.should.equal(`tcp://${host}:${port}`);
		should.exist(s.socket);
		should.exist(s.identity_id);
		// should.not.exist(s.context);
		done();
	});

	it('two push not equal', function(done){
		var host = '127.0.0.1',
			port1= 3010,
			port2= 3011;

		var s1 = new Push(host, port1);
		var s2 = new Push(host, port2);
		should.exist(s1);
		should.exist(s2);
		s1.host.should.equal(s2.host);
		s1.port.should.not.equal(s2.port);
		s1.url.should.not.equal(s2.url);
		done();
	});

	// it('set context', function(done){
	// 	var s = new Push('127.0.0.1', 3010);
	// 	should.exist(s);
	// 	should.not.exist(s.context);
	// 	s.setContext('hello world');
	// 	should.exist(s.context);
	// 	done();
	// });

	it('flush identity id', function(done){
		var s = new Push('127.0.0.1', 3010);
		should.exist(s);
		var uuid = s.identity_id;		
		s.flushIdentityId();
		s.identity_id.should.not.equal(uuid);
		done();
	});

	// it('Push send', function(done){
	// 	var s = new Push('127.0.0.1', 3010);
	// 	should.exist(s);
	// 	s.setContext('hello world');
	// 	s.send();
	// 	console.log(s.socket);
	// 	done();
	// });

});