var exec = require('child_process').exec;
var cmd = exec('curl --data "user=b09808093&password=983126&cmd=authenticate&Login=Log+In" http://10.1.51.253/cgi-bin/login');

cmd.stdout.on('data', function(data) {
  console.log('stdout: ' + data);
});
cmd.stderr.on('data', function(data) {
  console.log('stdout: ' + data);
});
cmd.on('close', function(code) {
  console.log('closing code: ' + code);
});
