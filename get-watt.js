var request = require('request');
var parseString = require('xml2js').parseString;
var power;
var nowpowerxml = '<?xml version="1.0" encoding="UTF8"?><SMARTPLUG id="edimax"><CMD id="get"><NOW_POWER></NOW_POWER></CMD></SMARTPLUG>';

function periodicActivity() {
    request({
    url: "http://admin:1234@192.168.0.103:10000/smartplug.cgi",
    method: "POST",
    headers: {
        "content-type": "text/xml"
    },
    body: nowpowerxml
    },

    function (error, response, body){
        if (error) {
            // console.log(error);
        } else {
            parseString(body, function (err, result) {
            power = result.SMARTPLUG.CMD[0].NOW_POWER[0]["Device.System.Power.NowPower"][0];
            // console.log(power);
            request({
                url: "http://10.2.6.120:8081/?sensor=POWER&P=" + power,
                method: 'GET',
                headers: {                    
                    'Content-Type': 'application/html'
                }

            }, function(error, response, body){
                if(error) {
                    // console.log(error);
                } else {
                    // console.log(response.statusCode, body);
                }
            });

            });
        }
    });
    setTimeout(periodicActivity, 10000);
}
periodicActivity();