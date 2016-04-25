var http = require('http');
var https = require('https');
var timerjson = "";
var url2;

function periodicActivity() {
https.get('https://script.google.com/macros/s/AKfycbxJP9hdckSwtXlC67csDOW-p-BdU1sRk7TZcLGmcYqjgT0F12XH/exec', (res) => {
  // console.log('statusCode: ', res.statusCode);
  url2 = res.headers.location;

  res.on('data', (d) => {
    // process.stdout.write(d);
  });
}).on('error', (e) => {
  // console.error(e);
});
periodicActivity2();
setTimeout(periodicActivity, 3000);    
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
});
}

periodicActivity();


http.createServer(function(request, response) {
  response.writeHead(200);
  response.end(timerjson);
}.bind(this)).listen(8081);
console.log('Listening on port 8081 ...');