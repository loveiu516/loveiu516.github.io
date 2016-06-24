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
  serialPort.on('data', function(data) {
    // console.log(data.toString());

    tmpurl = gassensorurl + data.toString();

    https.get(tmpurl, function(res)  {
      res.on('data', function(d) {
        sensordata = data.toString();
        sensorpost();
        // process.stdout.write(d);
      });
    }).on('error', function(e) {
      // console.error(e);
      process.exit(1);
    });
  });
});

function sensorpost() {
  var t1 = {};
  t1.devid = "A514-1";
  t1.value = sensordata;

  var options = {
    hostname: '10.2.8.159',
    port: 80,
    path: '/MCUSensorValueController',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (body) {
    //console.log(body);
    });
  });
  req.on('error', function(e) {
    //console.log(e);
  });
  req.write(JSON.stringify(t1));
  req.end();
}

function periodicActivity() {
https.get(gastimerurl, function(res)  {
  // console.log('statusCode: ', res.statusCode);
  res.setEncoding('utf8');
  url2 = res.headers.location;
  periodicActivity2();
  res.on('data', function(d) {
  // process.stdout.write(d);
  });
}).on('error', function(e) {
  // console.error(e);
  process.exit(1);
});
setTimeout(periodicActivity, 15000);
}

function periodicActivity2() {
https.get(url2, function(res) {
  //console.log('statusCode: ', res.statusCode);
  res.setEncoding('utf8');
  res.on('data', function(d) {
  timerjson = d;
  // console.log(timerjson)

  var obj = JSON.parse(timerjson);

  if (obj.light1==0) {
  serialPort.write("light1off")
  }

  if (obj.light1==1) {
  serialPort.write("light1on")
  }

  if (obj.light2==0) {
  serialPort.write("light2off")
  }

  if (obj.light2==1) {
  serialPort.write("light2on")
  }

  if (obj.light3==0) {

  }

  if (obj.light3==1) {

  }

  if (obj.light4==0) {

  }

  if (obj.light4==1) {

  }

  if (obj.light5==0) {

  }

  if (obj.light5==1) {

  }

  if (obj.light6==0) {

  }

  if (obj.light6==1) {

  }

  if (obj.light7==0) {

  }

  if (obj.light7==1) {

  }

  if (obj.light8==0) {

  }

  if (obj.light8==1) {

  }
});

}).on('error', function(e) {
  // console.error(e);
  process.exit(1);
});
  url2 = "";
  serialPort.write("getsensor")
}

periodicActivity();