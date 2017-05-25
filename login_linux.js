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
			//conn.end();
		}).on('data', function(data) {
			console.log('STDOUT: ' + data);
		}).stderr.on('data', function (data) {
			console.log('STDERR: ' + data);
		});
	});

	var livestring = './live/ffmpeg-3.0.2/ffmpeg -re -analyzeduration 5000000 -probesize 5000000 -i http://61.55.145.199/live/hls/1002.m3u8 -strict -2 -bsf:a aac_adtstoasc -c copy -flvflags aac_seq_header_detect -f flv rtmp://test-xunlei-rtmp.dongqiudi.com/live/football1';
	conn.exec(livestring, function(err, stream) {
		if (err) {
			throw err;
		}
		stream.on('close', function(code, signal) {
			console.log('close--1');
			//conn.end();
		}).on('data', function(data) {
			console.log('stdout--:\n' + data);
			//执行命令
			// conn.exec('ls', function(err, stream) {
			// 	if (err) {
			// 		throw err;
			// 	}
			// 	stream.on('close', function(code, signal) {
			// 		console.log('close--2');
			// 	}).on('data', function(data) {
			// 		console.log('stdout--2:\n' + data);
			// 	}).stderr.on('data',function(data) {
			// 		console.log('stderr--:' + data);
			// 	});
			// });
		}).stderr.on('data', function (data) {
			console.log('STDERR: ' + data);
		});;
	});
}).connect({
	host: '123.59.138.106', //需要服务器的外网IP
	port: 22,
	username: 'root',
	privateKey : key
});