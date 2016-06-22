#include "DHT.h"
DHT dht1(4, DHT22);

const int light1 = 2;
const int light2 = 3;

const int carpin1 = 9;
const int carpin2 = 10;

String carcmd = "0";

String light1on = "light1on";
String light1off = "light1off";
String light2on = "light2on";
String light2off = "light2off";
String getsensor = "getsensor";

String car0 = "0";
String car1 = "1";
String car2 = "2";
String car3 = "3";
String car4 = "4";

const int DELAY = 1000;

void setup()
{
  Serial1.begin(57600);
  Serial.begin(9600);

  pinMode(carpin1, OUTPUT);
  pinMode(carpin2, OUTPUT);
  digitalWrite(carpin1, LOW);
  digitalWrite(carpin2, LOW);

  dht1.begin();
}


void loop()
{
  String command = "";

  //  while (Serial1.available()) {

  int v = Serial1.read();
  command += (char)v;

  Serial.println(carcmd);
  

//  Serial.println(v);
//  Serial.println(v, DEC);

  if (command.equals(car0) || command.equals(car1) || command.equals(car2) || command.equals(car3) || command.equals(car4)) {
    carcmd = command;
  }


  if (command.equals(getsensor)) {
    thsensor();
    command = "";
  }

  if (command.equals(light1on)) {
    flight1on();
    command = "";
  }

  if (command.equals(light1off)) {
    flight1off();
    command = "";
  }

  if (command.equals(light2on)) {
    flight2on();
    command = "";
  }


  if (command.equals(light2off)) {
    flight2off();
    command = "";
  }




  if (carcmd.equals(car0)) {
    car00();
  }

  if (carcmd.equals(car1)) {
    car11();
  }

  if (carcmd.equals(car2)) {
    car55();
  }

  if (carcmd.equals(car3)) {
    car33();
  }

  if (carcmd.equals(car4)) {
    car44();
  }


  //  }
}



void thsensor()
{
  float t1 = dht1.readTemperature();
  String tt = "tt=" + String(t1);
  Serial1.println(tt);

  float h1 = dht1.readHumidity();
  String hh = "hh=" + String(h1);
  Serial1.println(hh);
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




void car00()
{
  Serial.println("STOP");
  digitalWrite(carpin1, LOW);
  digitalWrite(carpin2, LOW);
}

void car11()
{
  Serial.println("GO1");
  digitalWrite(carpin1, LOW);
  digitalWrite(carpin2, HIGH);
  delayMicroseconds(500);
  digitalWrite(carpin1, HIGH);
  digitalWrite(carpin2, LOW);
  delayMicroseconds(2000);
}


void car55()
{
  Serial.println("GO2");
  digitalWrite(carpin1, HIGH);
  digitalWrite(carpin2, LOW);
  delayMicroseconds(500);
  digitalWrite(carpin1, LOW);
  digitalWrite(carpin2, HIGH);
  delayMicroseconds(2000);

}

void car33()
{
  Serial.println("GO3");
  digitalWrite(carpin1, HIGH);
  digitalWrite(carpin2, HIGH);
  delayMicroseconds(500);
  digitalWrite(carpin1, LOW);
  digitalWrite(carpin2, LOW);
  delayMicroseconds(2000);
}

void car44()
{
  Serial.println("GO4");
  digitalWrite(carpin1, LOW);
  digitalWrite(carpin2, LOW);
  delayMicroseconds(500);
  digitalWrite(carpin1, HIGH);
  digitalWrite(carpin2, HIGH);
  delayMicroseconds(2000);
}
