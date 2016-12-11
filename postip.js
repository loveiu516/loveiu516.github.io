var exec = require('child_process').exec;
var inf = {};

inf.hostname=require('os').hostname();
inf.mac=require('os').networkInterfaces().apcli0[0].mac;
inf.address=require('os').networkInterfaces().apcli0[0].address;
//console.log(JSON.stringify(inf));
var cmdpost = exec('curl --data ' +JSON.stringify(inf)+ ' http://10.2.8.33:8081');

cmdpost.stdout.on('data', function(data) {
  console.log('stdout: ' + data);
});
cmdpost.stderr.on('data', function(data) {
  console.log('stdout: ' + data);
});
cmdpost.on('close', function(code) {
  console.log('closing code: ' + code);
});
