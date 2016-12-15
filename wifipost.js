var http = require('http');

function wifipost() {
  var options = {
    hostname: '10.1.51.253',
    port: 80,
    path: '/cgi-bin/login',
    method: 'POST',
    headers: ''
  };
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (body) {
    console.log(body);
    });
  });
  req.on('error', function(e) {
    console.log(e);
  });
  console.log('user=b09808093&password=983126&cmd=authenticate&Login=Log+In');
  req.end('user=b09808093&password=983126&cmd=authenticate&Login=Log+In');
}

wifipost();