var client = require('ssh2').Client;
var conn = new client();
var key = require('fs').readFileSync('/Users/Young/.ssh/id_rsa');
conn.on('ready', function() {
	console.log('client::ready');
	conn.exec('uptime', function(err, stream) {
		if (err) {
			throw err;
		}
		stream.on('close', function(code, signal) {
			console.log('stream :: close :: code :' + code + ',signal: ' + signal);
			conn.end();
		}).on('data', function(data) {
			console.log('STDOUT: ' + data); 
		}).stderr.on('data', function (data) {
			console.log('STDERR: ' + data);
		});
	});
}).connect({
	host: '123.59.138.106', //需要服务器的外网IP
	port: 22,
	username: 'root',
	privateKey : key
});