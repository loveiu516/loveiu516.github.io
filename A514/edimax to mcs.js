var request = require('request');
var parseString = require('xml2js').parseString;
var mqtt = require('mqtt');

var DeviceId = "DcOTP6gp";
var DeviceKey = "GBcYRMAaBj2kz8uE";

var nowpowerxml = '<?xml version="1.0" encoding="UTF8"?><SMARTPLUG id="edimax"><CMD id="get"><NOW_POWER></NOW_POWER></CMD></SMARTPLUG>';

function periodicActivity() {
    request({
        url: "http://admin:1234@10.2.8.129:10000/smartplug.cgi",
        method: "POST",
        headers: {},
        body: nowpowerxml
    },

        function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                parseString(body, function (err, result) {
                    power = result.SMARTPLUG.CMD[0].NOW_POWER[0]["Device.System.Power.NowPower"][0];
                    console.log(power);
                    client.publish('mcs/' + DeviceId + '/' + DeviceKey + '/ww', ',ww,' + parseFloat(power), { qos: 0 });
                });
            }
        });
    setTimeout(periodicActivity, 60000);
}
periodicActivity();

function initMQTT() {
    var settings = {
        clientId: 'client-' + new Date().getTime(),
        port: 1883,
        host: 'mqtt.mcs.mediatek.com',
    };
    client = mqtt.connect(settings);
    client.on('connect', function () {

    });
    client.on('message', function (topic, message) {

    });
    client.on('reconnect', function () {
        // console.log('reconnect');
    });
}
initMQTT();