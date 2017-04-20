var Sub = require('../lib/communicator/zmqSub');

var s = new Sub('127.0.0.1', 3010);
s.run('3');

for(var i=1; i<10; i++){
	var s = new Sub('127.0.0.1', 3010);
	s.run(i+'');
}