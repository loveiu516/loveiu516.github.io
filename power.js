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
        url:  'http://10.2.8.2:8081',
        dest: '',
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

            if (obj.light3==0) {
            myLed3.dir(m.DIR_OUT_HIGH);
            myLed3.write(1);
            }

            if (obj.light3==1) {
            myLed3.dir(m.DIR_OUT_LOW);
            myLed3.write(0);
            }

            if (obj.light4==0) {
            myLed4.dir(m.DIR_OUT_HIGH);
            myLed4.write(1);
            }

            if (obj.light4==1) {
            myLed4.dir(m.DIR_OUT_LOW);
            myLed4.write(0);
            }

            if (obj.light5==0) {
            myLed5.dir(m.DIR_OUT_HIGH);
            myLed5.write(1);
            }

            if (obj.light5==1) {
            myLed5.dir(m.DIR_OUT_LOW);
            myLed5.write(0);
            }

            if (obj.light6==0) {
            myLed6.dir(m.DIR_OUT_HIGH);
            myLed6.write(1);
            }

            if (obj.light6==1) {
            myLed6.dir(m.DIR_OUT_LOW);
            myLed6.write(0);
            }

            if (obj.light7==0) {
            myLed7.dir(m.DIR_OUT_HIGH);
            myLed7.write(1);
            }

            if (obj.light7==1) {
            myLed7.dir(m.DIR_OUT_LOW);
            myLed7.write(0);
            }

            if (obj.light8==0) {
            myLed8.dir(m.DIR_OUT_HIGH);
            myLed8.write(1);
            }

            if (obj.light8==1) {
            myLed8.dir(m.DIR_OUT_LOW);
            myLed8.write(0);
            }

            // light1 = obj.light1;
            // light2 = obj.light2;
            // light3 = obj.light3;
            // light4 = obj.light4;
            // light5 = obj.light5;
            // light6 = obj.light6;
            // light7 = obj.light7;
            // light8 = obj.light8;
            // console.log ("light is :");
            // console.log (light1 ,light2 ,light3 ,light4 ,light5 ,light6 ,light7 ,light8);
        }
    }
    );
    setTimeout(main,3000);
}
main();