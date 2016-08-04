var wget = require('node-wget');
var http = require('http');
var https = require('https');
var url = require('url');
var gasurl = "https://script.google.com/macros/s/AKfycbx4E2ubZx64Zf2-uLruwzi5-kdvaIe0nAVbIhCQJ4BxprSt21U/exec";

var nodemcuurl = "http://192.168.2.32/tthh";

function periodicActivity() {
wget({
url:  nodemcuurl,
dest: "1",
timeout: 10000
},

function (error, response, body) {
    if (error) {
        // console.log(error);
    } else {
        var AM2302url = gasurl + "?tt=" + JSON.parse(body).tt + "&hh=" + JSON.parse(body).hh;

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
}
);

setTimeout(periodicActivity, 15000);
}

periodicActivity();
