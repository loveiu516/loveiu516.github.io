#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

#include <NTPClient.h>
#include <WiFiUdp.h>

#include <ESP8266WiFi.h>
#include "DHT.h"

#define AM2302PIN 5
DHT dht1(AM2302PIN, DHT22);

#include <ArduinoJson.h>

unsigned long previousMillis = 0;
const long interval = 1000;

String tthh =  "";
int ntptime = 0;

const char* ssid = "IU";
const char* password = "12348765";

ESP8266WebServer server(80);

const int led = LED_BUILTIN;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "time1.google.com", 28800, 10000);

void handleRoot() {
  digitalWrite(led, 1);
  server.send(200, "text/plain", "hello from esp8266!");
  digitalWrite(led, 0);
}

void th() {
  digitalWrite(led, 1);
  server.send(200, "text/plain", tthh);
  digitalWrite(led, 0);
}

void handleNotFound() {
  digitalWrite(led, 1);
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  digitalWrite(led, 0);
}

void setup(void) {
  pinMode(led, OUTPUT);
  digitalWrite(led, 0);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);

  server.on("/tthh", th);

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");

  dht1.begin();
  timeClient.begin();
}

void loop(void) {
  server.handleClient();


  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();

    timeClient.update();
    int hh = timeClient.getHours();
    int mm = timeClient.getMinutes();
    ntptime = (hh * 60 + mm);

    float h1 = dht1.readHumidity();
    float t1 = dht1.readTemperature();

    root["time"] = ntptime;
    root["tt"] = String(t1, 2);
    root["hh"] = String(h1, 2);

    tthh="";
    root.prettyPrintTo(tthh);
  }
}
