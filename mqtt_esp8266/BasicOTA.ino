#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include <PubSubClient.h>

#include "DHT.h"
#include <ArduinoJson.h>
DHT dht1(5, DHT22);

const char* ssid = "IIU";
const char* password = "12348765";

const char* mqtt_server = "mqtt.mcs.mediatek.com";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;

void setup() {
  Serial.begin(115200);

  pinMode(LED_BUILTIN, OUTPUT);
  dht1.begin();

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Connection Failed! Rebooting...");
    delay(5000);
    ESP.restart();
  }

  // Port defaults to 8266
  // ArduinoOTA.setPort(8266);

  // Hostname defaults to esp8266-[ChipID]
  //  ArduinoOTA.setHostname("8266-1");

  // No authentication by default
  ArduinoOTA.setPassword((const char *)"123456");

  ArduinoOTA.onStart([]() {
    Serial.println("Start");
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  ArduinoOTA.begin();
  Serial.println("Ready");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  ArduinoOTA.handle();

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 15000) {
    lastMsg = now;
    digitalWrite(LED_BUILTIN, LOW);
    tsensor();
    hsensor();
    digitalWrite(LED_BUILTIN, HIGH);
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  String a = "";
  Serial.print("topic:[");
  Serial.print(topic);
  Serial.print("] : ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    a = a + String((char)payload[i]);
  }
  Serial.println();

  int str_len = a.length() + 1;
  char char_array[str_len];
  a.toCharArray(char_array, str_len);

  client.publish("mcs/Dq00zR9a/OnOeJgFO8TtemB0W/tthh003", char_array);
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("client-003")) {
      Serial.println("connected");
      client.subscribe("mcs/Dq00zR9a/OnOeJgFO8TtemB0W/003");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}




void tsensor()
{
  String tthh = "";
  float t1 = dht1.readTemperature();
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["tt"] = String(t1);
  root.printTo(tthh);

  int str_len = tthh.length() + 1;
  char char_array[str_len];
  tthh.toCharArray(char_array, str_len);

  client.publish("mcs/Dq00zR9a/OnOeJgFO8TtemB0W/tthh003", char_array);
}

void hsensor()
{
  String tthh = "";
  float h1 = dht1.readHumidity();
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();
  root["hh"] = String(h1);
  root.printTo(tthh);

  int str_len = tthh.length() + 1;
  char char_array[str_len];
  tthh.toCharArray(char_array, str_len);

  client.publish("mcs/Dq00zR9a/OnOeJgFO8TtemB0W/tthh003", char_array);
}
