var wget = require('node-wget');
var timerjson = "";
var gastimerurl = "https://script.google.com/macros/s/AKfycbwe3rdtb74pdRUd_xjm3QNBqM1_Mad5dTEbThE5NUQp6TZJc7A/exec";

function periodicActivity() {
wget({
        url:  gastimerurl,
        dest: "./timerjson",
        timeout: 10000
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
          } else {
            timerjson = body;
          }
        }
        );
setTimeout(periodicActivity, 20000);
}
periodicActivity();

http.createServer(function(request, response) {
  response.writeHead(200);
  response.end(timerjson);
}.bind(this)).listen(8082);
console.log('Listening on port 8082 ...');