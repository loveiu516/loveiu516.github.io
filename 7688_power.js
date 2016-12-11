var m = require('mraa');
var wget = require('node-wget');

//p19 p20
var myLed1 = new m.Gpio(5);
var myLed2 = new m.Gpio(4);

var myLed3 = new m.Gpio(6);
var myLed4 = new m.Gpio(6);
var myLed5 = new m.Gpio(6);
var myLed6 = new m.Gpio(6);
var myLed7 = new m.Gpio(6);
var myLed8 = new m.Gpio(6);

var json = "";
var light1 = "";
var light2 = "";
var light3 = "";
var light4 = "";
var light5 = "";
var light6 = "";
var light7 = "";
var light8 = "";

function main() {
    wget(
        {
        //url:  'https://script.google.com/macros/s/AKfycbxJP9hdckSwtXlC67csDOW-p-BdU1sRk7TZcLGmcYqjgT0F12XH/exec',
        url:  'http://10.2.6.120:8082',
        dest: '/tmp/timer',
        timeout: 10000
        },

    function (error, response, body) {
        if (error) {
            //console.log (error);
            process.exit(1);

        } else {
            //console.log (body);
            json = body;
            var obj = JSON.parse(json);

            if (obj.light1==0) {
            myLed1.dir(m.DIR_OUT_HIGH);
            myLed1.write(1);
            }

            if (obj.light1==1) {
            myLed1.dir(m.DIR_OUT_LOW);
            myLed1.write(0);
            }

            if (obj.light2==0) {
            myLed2.dir(m.DIR_OUT_HIGH);
            myLed2.write(1);
            }

            if (obj.light2==1) {
            myLed2.dir(m.DIR_OUT_LOW);
            myLed2.write(0);
            }
        }
    }
    );
    setTimeout(main,3000);
}
main();