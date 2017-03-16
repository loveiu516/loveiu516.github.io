var mqtt = require('mqtt');

function initMQTTMethod() {

    var settings = {
        clientId: 'client-' + new Date().getTime(),
        port: 1883,
        host: 'mqtt.mcs.mediatek.com',
    };

    client = mqtt.connect(settings);

    client.on('connect', function () {
        client.subscribe('mcs/Dq00zR9a/OnOeJgFO8TtemB0W/+');
        console.log('subscribe : mcs/Dq00zR9a/OnOeJgFO8TtemB0W/+');
    });

    client.on('message', function (topic, message) {
        console.log(topic + " " + message.toString());
        
        if (topic == "mcs/Dq00zR9a/OnOeJgFO8TtemB0W/text1") {
            client.publish('mcs/Dq00zR9a/OnOeJgFO8TtemB0W/text2', ',text2,2', { qos: 0 });
        }

    });

    client.on('reconnect', function () {
        console.log('reconnect');
    });

}
initMQTTMethod();
