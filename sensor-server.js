var wget = require('node-wget');
var http = require('http');
var https = require('https');
var url = require('url');

var gasurl = "https://script.google.com/macros/s/AKfycbzGVIYncI7zEhyfSejVZUh3MizJOVmemjjj_JABmvaDiNzHRSQ/exec";


http.createServer(function(request, response) {
    var params = url.parse(request.url, true).query;

    try {
        if (params.sensor == 'AM2302') {
            // console.log("AM2302 T:" + params.T);
            // console.log("AM2302 H:" + params.H);
            var AM2302url = gasurl + "?tt=" + params.T + "&hh=" + params.H;

            wget({
            url:  AM2302url,
            dest: "1",
            timeout: 10000
            },

            function (error, response, body) {
                if (error) {
                    // console.log(error);
                } else {
                    // console.log(body);
                }
            }
            );
        }
        
        if (params.sensor == 'YL69') {
            // console.log("YL69 W:" + params.W);
            var YL69url = gasurl + "?ww=" + params.W;
            
            wget({
            url:  YL69url,
            dest: "2",
            timeout: 10000
            },

            function (error, response, body) {
                if (error) {
                    // console.log(error);
                } else {
                    // console.log(body);
                }
            }
            );
        }

        if (params.sensor == 'POWER') {
            // console.log("POWER P:" + params.P);
            var POWERurl = gasurl + "?pp=" + params.P;

            wget({
            url:  POWERurl,
            dest: "3",
            timeout: 10000
            },

            function (error, response, body) {
                if (error) {
                    // console.log(error);
                } else {
                    // console.log(body);
                }
            }
            );
        }
    } catch(e) {
        // console.log(e);
    }
    response.writeHead(200);
    response.write("OK");
    response.end();
}.bind(this)).listen(8080);
console.log('Listening on port 8080 ...');