var wget = require('node-wget');
var imgur = require('imgur');

function periodicActivity() {
var toDay = new Date();
var nowtime = toDay.getHours()*60+toDay.getMinutes();
var nowdate = toDay.getDate();
var nowmonth = toDay.getMonth()+1;
var nowyear = toDay.getFullYear();
var photoname = nowyear.toString() +"-"+ nowmonth.toString() +"-"+ nowdate.toString() +"-"+ nowtime.toString() +".jpg";

wget({
        url:  'http://192.168.40.163:8080/?action=snapshot',
        dest: "./photo/"+photoname,
        timeout: 10000
    },
        function (error, response, body) {
        if (error) {
            console.error(error);
        } else {
            console.log("OK");


            imgur.uploadFile("./photo/"+photoname)
            .then(function (json) {
                console.log(json.data.link);
                wget({
                    url:  'https://script.google.com/macros/s/AKfycbyfxrkEGKbZQwOP8-SP4j-04RMGQhOu_an2fmFKeB3ekzB7xng/exec?photo=' + json.data.link,
                    dest: './photogas',
                    timeout: 10000
                },
                    function (error, response, body) {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log("OK");
                    }
                    }
                );

            })
            .catch(function (err) {
                console.error(err.message);
            });
        }
        }
    );
    setTimeout(periodicActivity, 55000);
}
periodicActivity();