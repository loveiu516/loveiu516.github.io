var http = require('http');
var https = require('https');
var timerjson = "";
var url2 = "";
var gastimerurl = "https://script.google.com/macros/s/AKfycbxJP9hdckSwtXlC67csDOW-p-BdU1sRk7TZcLGmcYqjgT0F12XH/exec";

function periodicActivity() {
https.get(gastimerurl, (res) => {
  // console.log('statusCode: ', res.statusCode);
  res.setEncoding('utf8');
  url2 = res.headers.location;
  periodicActivity2();
  res.on('data', (d) => {
  // process.stdout.write(d);
  });
}).on('error', (e) => {
  // console.error(e);
  process.exit(1);
});
setTimeout(periodicActivity, 5000);
}

function periodicActivity2() {
https.get(url2, (res) => {
  //console.log('statusCode: ', res.statusCode);
  res.setEncoding('utf8');
  res.on('data', (d) => {
  timerjson = d;
  //console.log(d)
  });
}).on('error', (e) => {
  //console.error(e);
  process.exit(1);
});
  url2 = "";
}
periodicActivity();

http.createServer(function(request, response) {
  response.writeHead(200);
  response.end(timerjson);
}.bind(this)).listen(8082);
console.log('Listening on port 8082 ...');