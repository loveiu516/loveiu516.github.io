//#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include "DHT.h"

#define AM2302PIN 5
DHT dht1(AM2302PIN, DHT22);

const char *ssid     = "A514";
const char *password = "A514WIFI";
const char* host = "10.2.6.120";
const int httpPort = 8081;

//NTPClient timeClient("time1.google.com", 28800, 10000);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while ( WiFi.status() != WL_CONNECTED ) {
    delay (1000);
    Serial.println ( "." );
  }
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  dht1.begin();

  pinMode(A0, INPUT);
}

void loop() {
  //timeClient.update();
  //int hh = timeClient.getHours().toInt();
  //int mm = timeClient.getMinutes().toInt();
  //int ss = timeClient.getSeconds().toInt();
  //Serial.println (hh * 60 + mm);

  float h1 = dht1.readHumidity();
  float t1 = dht1.readTemperature();
  float hic1 = dht1.computeHeatIndex(t1, h1, false);


  //Serial.print("AM2302 Temperature: ");
  //Serial.print(t1, 1);
  //Serial.print(" C  ");
  //Serial.print("AM2302 Humidity: ");
  //Serial.print(h1, 1);
  //Serial.print("%  ");
  //Serial.print("  //Heat_index: ");
  //Serial.print(hic1, 1);
  //Serial.println(" C");

  String AM2302tt =  String(t1, 2);
  String AM2302hh =  String(h1, 2);
  String urltthh = "/?sensor=AM2302&T=" + AM2302tt + "&H=" + AM2302hh;

  WiFiClient client;
//  const int httpPort = 8081;  
  if (!client.connect(host, httpPort)) {
    //Serial.println("connection failed");
    return;
  }
  client.print(String("GET ") + urltthh + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
  while (client.available()) {
    String line = client.readStringUntil('\r');
    //Serial.print(line);
  }
  delay(10000);


  int s = analogRead(A0);
  String YL69ww =  String(s);
  String urlww = "/?sensor=YL69&W=" + YL69ww;
//  WiFiClient client;
//  const int httpPort = 8081;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  client.print(String("GET ") + urlww + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
  while (client.available()) {
    String line = client.readStringUntil('\r');
    //Serial.print(line);
  }
  delay(10000);

}
