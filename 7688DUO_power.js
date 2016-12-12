var https = require('https');
var http = require('http');
var timerjson = "";
var url2 = "";
var gastimerurl = "https://script.google.com/macros/s/AKfycbxJP9hdckSwtXlC67csDOW-p-BdU1sRk7TZcLGmcYqjgT0F12XH/exec";
var gassensorurl = "https://script.google.com/macros/s/AKfycbzGVIYncI7zEhyfSejVZUh3MizJOVmemjjj_JABmvaDiNzHRSQ/exec";
var sensordata = "";
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyS0", {
    baudrate: 57600
});

serialPort.on("open", function () {
    serialPort.on('data', function (data) {

        tmpurl = gassensorurl + data.toString();
        https.get(tmpurl, function (res) {
            res.on('data', function (d) {
                sensordata = data.toString();
            });
        }).on('error', function (e) {
            process.exit(1);
        });
    });
});

function periodicActivity() {
    https.get(gastimerurl, function (res) {
        res.setEncoding('utf8');
        url2 = res.headers.location;
        periodicActivity2();
        res.on('data', function (d) {
        });
    }).on('error', function (e) {
        process.exit(1);
    });
    setTimeout(periodicActivity, 5000);
}

function periodicActivity2() {
    https.get(url2, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (d) {
            timerjson = d;
            // console.log(timerjson)
            var obj = JSON.parse(timerjson);
            if (obj.light1 == 0) {
                serialPort.write("light1off")
                // console.log("light1off")
            }
            if (obj.light1 == 1) {
                serialPort.write("light1on")
            //     console.log("light1on")
            }
            if (obj.light2 == 0) {
                serialPort.write("light2off")
                // console.log("light2off")
            }
            if (obj.light2 == 1) {
                serialPort.write("light2on")
                // console.log("light2on")
            }
        });
    }).on('error', function (e) {
        console.error(e);
        process.exit(1);
    });
    url2 = "";
    serialPort.write("getsensor")
}
periodicActivity();
