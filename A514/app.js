var http = require('http');
var https = require('https');
var mqtt = require('mqtt');
var fs = require('fs');

var DeviceId = "DcOTP6gp";
var DeviceKey = "GBcYRMAaBj2kz8uE";

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyS0", {
    baudrate: 57600
});

serialPort.on("open", function () {
    serialPort.on('data', function (data) {
        // console.log(data.toString());
        if (data.toString().split(',')[1] == "tt") {
            client.publish('mcs/' + DeviceId + '/' + DeviceKey + '/tt', ',tt,' + parseFloat(data.toString().split(',')[2]), { qos: 0 });
        }
        if (data.toString().split(',')[1] == "hh") {
            client.publish('mcs/' + DeviceId + '/' + DeviceKey + '/hh', ',hh,' + parseFloat(data.toString().split(',')[2]), { qos: 0 });
        }
    });
});

function initMQTT() {
    var settings = {
        clientId: 'client-' + new Date().getTime(),
        port: 1883,
        host: 'mqtt.mcs.mediatek.com',
    };
    client = mqtt.connect(settings);
    client.on('connect', function () {
        client.subscribe('mcs/' + DeviceId + '/' + DeviceKey + '/light1');
        client.subscribe('mcs/' + DeviceId + '/' + DeviceKey + '/light2');
    });
    client.on('message', function (topic, message) {
        if (topic == 'mcs/' + DeviceId + '/' + DeviceKey + '/light1') {
            if (message.toString().split(',')[2] == "1") {
                serialPort.write("light1on")
            }
            if (message.toString().split(',')[2] == "0") {
                serialPort.write("light1off")
            }
        }
        if (topic == 'mcs/' + DeviceId + '/' + DeviceKey + '/light2') {
            if (message.toString().split(',')[2] == "1") {
                serialPort.write("light2on")
            }
            if (message.toString().split(',')[2] == "0") {
                serialPort.write("light2off")
            }
        }
    });
    client.on('reconnect', function () {
        // console.log('reconnect');
    });
}
initMQTT();

function getlight1lastdata() {
    const options = {
        hostname: 'api.mediatek.com',
        port: 443,
        path: '/mcs/v2/devices/' + DeviceId + '/datachannels/light1/datapoints',
        method: 'GET',
        headers: { 'deviceKey': DeviceKey }
    };
    const req = https.request(options, function (res) {
        res.on('data', function (d) {
            light1 = JSON.parse(d).dataChannels[0].dataPoints[0].values.value;
            if (light1 == "1") {
                serialPort.write("light1on")
            }
            if (light1 == "0") {
                serialPort.write("light1off")
            }
        });
    });
    req.on('error', function (e) {
        // console.error(e);
    });
    req.end();
}

function getlight2lastdata() {
    const options = {
        hostname: 'api.mediatek.com',
        port: 443,
        path: '/mcs/v2/devices/' + DeviceId + '/datachannels/light2/datapoints',
        method: 'GET',
        headers: { 'deviceKey': DeviceKey }
    };
    const req = https.request(options, function (res) {
        res.on('data', function (d) {
            light2 = JSON.parse(d).dataChannels[0].dataPoints[0].values.value;
            if (light2 == "1") {
                serialPort.write("light2on")
            }
            if (light2 == "0") {
                serialPort.write("light2off")
            }
        });
    });
    req.on('error', function (e) {
        // console.error(e);
    });
    req.end();
}

function getimgfile() {
    var file = fs.createWriteStream("/tmp/123.jpg");
    var request = http.get("http://127.0.0.1:8080/?action=snapshot", function (response) {
        response.pipe(file);
    });

    setTimeout(function () {
        send();
    }, 3000);

    setTimeout(getimgfile, 60000);
}

function send() {
    var img = fs.readFileSync("/tmp/123.jpg");
    var img64 = new Buffer(img).toString('base64');
    client.publish('mcs/' + DeviceId + '/' + DeviceKey + '/img', ',img,' + img64, { qos: 0 });
    fs.unlinkSync("/tmp/123.jpg");
}

function getsensor() {
    serialPort.write("getsensor");
    setTimeout(getsensor, 60000);
}

setTimeout(function () {
    getlight1lastdata();
    getlight2lastdata();
    getsensor();
}, 5000);

setTimeout(function () {
    getimgfile()
}, 10000);
