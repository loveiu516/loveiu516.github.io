#include "DHT.h"
DHT dht1(4, DHT22);

const int light1 = 2;
const int light2 = 3;

String light1on = "light1on";
String light1off = "light1off";
String light2on = "light2on";
String light2off = "light2off";
String getsensor = "getsensor";


const int DELAY = 1000;

void setup()
{
  Serial1.begin(57600);
  Serial.begin(9600);

  dht1.begin();

}

void loop()
{

  String command = "";
  while (Serial1.available()) {
    int v = Serial1.read();
    Serial.println(v, DEC);
    if ( v != -1) {

      command += (char)v;

      if (command.equals(getsensor)) {
        thsensor();
        delay(DELAY);
        command = "";
      }

      if (command.equals(light1on)) {
        flight1on();
        delay(DELAY);
        command = "";

      } else if (command.equals(light1off)) {
        flight1off();
        delay(DELAY);
        command = "";

      } else if (command.equals(light2on)) {
        flight2on();
        delay(DELAY);
        command = "";

      } else if (command.equals(light2off)) {
        flight2off();
        delay(DELAY);
        command = "";
        
      }
    }
  }
}


void thsensor()
{
  float h1 = dht1.readHumidity();
  float t1 = dht1.readTemperature();
  String hh = "?hh=" + String(h1);
  String tt = "?tt=" + String(t1);
  Serial1.println(hh);
  delay(1000);
  Serial1.println(tt);
  }


void flight1on()
{
  pinMode(light1, OUTPUT);
  digitalWrite(light1, LOW);
}

void flight1off()
{
  pinMode(light1, OUTPUT);
  digitalWrite(light1, HIGH);
}

void flight2on()
{
  pinMode(light2, OUTPUT);
  digitalWrite(light2, LOW);
}

void flight2off()
{
  pinMode(light2, OUTPUT);
  digitalWrite(light2, HIGH);
}

