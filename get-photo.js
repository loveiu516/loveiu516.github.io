var wget = require('node-wget');

function periodicActivity() {
var toDay = new Date();
var nowtime = toDay.getHours()*60+toDay.getMinutes();
var nowdate = toDay.getDate();
var nowmonth = toDay.getMonth()+1;
var nowyear = toDay.getFullYear();
var photoname = nowyear.toString() +"-"+ nowmonth.toString() +"-"+ nowdate.toString() +"-"+ nowtime.toString() +".jpg";

wget({
        url:  'http://192.168.0.104:8080/?action=snapshot',
        dest: "./photo/"+photoname,
        timeout: 10000
    },
        function (error, response, body) {
        if (error) {
            // console.log(error);
        } else {
            // console.log("OK");
        }
        }
    );
    setTimeout(periodicActivity, 30000);
}
periodicActivity();