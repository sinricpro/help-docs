---
title: Füllstandsanzeige (Wassertank) mit Ultraschallsensor (HC-SR04) für ESP8266, ESP32, Raspberry Pi Pico W für Alexa
layout: post
lang: de
description: Baue eine Füllstandsanzeige für den Wassertank mit einem HC-SR04 Ultraschallsensor und einem ESP32, ESP8266 oder Raspberry Pi Pico W. Verdrahtung, Code und Alexa.
---
 
In diesem Teil zeigen wir dir, wie du eine **Füllstandsanzeige (auch Wassertankanzeige genannt)** mit einem **Ultraschallsensor** baust, der an einen **ESP32, ESP8266 oder Raspberry Pi Pico W** angeschlossen werden kann. Sobald alles eingerichtet ist, kannst du den Wasserstand mit Amazon Alexa messen, Alexa danach fragen, ihn in der Sinric Pro App überwachen und *eine Push-Benachrichtigung erhalten, wenn der Wasserstand niedrig ist*.


![Sinric Pro HC-SR04 Ultrasonic Sensor ]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-intro.png)

### Voraussetzungen : 

1. ESP32, ESP8266 oder Raspberry Pi Pico W x 1.
2. Ultraschallsensor (HC-SR04) x 1.
3. Pflanze mit Topf x 1.
4. Jumperkabel.

 

### Kurze Einführung in den Ultraschallsensor
Ultraschallsensoren sind günstige, einfach zu verwendende Sensoren, die Entfernungen messen können. Sie senden einen kurzen Ultraschallimpuls aus und **messen dann die Zeit, bis das Echo zurückkommt**. Die Entfernung zum Objekt wird anschließend anhand der Schallgeschwindigkeit berechnet.  

Der Sensor wird mit 5 V Gleichspannung versorgt und hat vier Pins: **VCC, GND, TRIG und ECHO**. Sobald der Sensor angeschlossen ist, kannst du damit Entfernungen messen, indem du einen Impuls an den TRIG-Pin sendest und dann die Zeit misst, bis der ECHO-Pin auf HIGH geht. Die Entfernung zum Objekt lässt sich dann mit der folgenden Formel berechnen:

> Entfernung = (Zeit * Schallgeschwindigkeit) / 2

wobei:

- `distance` in Zentimetern angegeben wird.
- `time` in Mikrosekunden angegeben wird.
- `speed of sound` 343 Meter pro Sekunde beträgt. 
 
Laut Herstellerangaben **funktioniert** der HC-SR04 Sensor **am besten** zwischen 2 cm und 400 cm (1" - 13ft) innerhalb eines Kegels von 30 Grad.  

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-practical-test.png) 

### Verdrahtung des Ultraschallsensors

![Sinric Pro HC-SR04 esp8266 ultrasonic sensor wiring]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-wiring.png) 


| HC-SR04 Pin | ESP8266 | ESP32    | Pico W |
| --------- | ------- | -------    | -------    |
| VCC       |    5V   | 5V         | 5V         |
| GND       |    GND  | GND        | GND        |
| TRIG      |    12 (D6)  | GPIO 5  | 15        |
| ECHO      |    14 (D5)  | GPIO 18 | 14        |


Prüfen wir, ob der Sensor richtig verdrahtet ist und funktioniert. 
 

```cpp
#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif
 
long duration;
float distanceInCm; 

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);

  // convert duration to CM 
  distanceInCm = duration/29 / 2;

  // inches 
  // distanceInInches = duration / 74 / 2;

  Serial.print("Distance (cm): ");
  Serial.println(distanceInCm); 
  
  delay(1000);
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/83febb46592b067c79a0dd55136405a6)


![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-test-readings.png) 

Versuchen wir nun, den Wasserstand in Prozent zu messen. 
 

```cpp
#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif
 
long duration;
float distanceInCm; 
int waterLevelAsPer;

const int EMPTY_TANK_HEIGHT = 150; // Height when the tank is empty
const int FULL_TANK_HEIGHT  =  25; // Height when the tank is full

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);   // Take a measurement
  distanceInCm = duration/29 / 2; // Convert to CM
  waterLevelAsPer = map((int)distanceInCm ,EMPTY_TANK_HEIGHT, FULL_TANK_HEIGHT, 0, 100); // Convert to precentage value based on tank height
 
  // In inches ?
  // distanceInInches = duration / 74 / 2;

  Serial.print("As a precentage: ");
  Serial.println(waterLevelAsPer); 
  
  delay(1000);
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/175f772413b433241acaca6234257cf2)


![Sinric Pro HC-SR04 readings]({{ site.github.url }}/public/img/HC-SR04-ultrasonic-sensor-water-tank-measurements-as-precentage.png) 
 
### Schritt 1 : Mit Sinric Pro verbinden 

#### Schritt 1.1 : Einen eigenen Gerätetyp für die Füllstandsanzeige anlegen.

Sinric Pro hat keinen eingebauten Gerätetyp für eine Füllstandsanzeige, deshalb legen wir mit der Funktion Device Template einen eigenen Gerätetyp an, der den Füllstand anzeigen kann.

**Hinweis**: Mit der unten beschriebenen Importfunktion für Gerätevorlagen kannst du dir das Anlegen der kompletten Vorlage sparen.

* [Melde dich](https://portal.sinric.pro/devicetemplates/new) bei deinem Sinric Pro Konto an und gehe zu **Device Templates**

* Klicke auf **Add Device Template**. Gib als Name und Beschreibung **Water Level Indicator** ein und wähle **Water Tank** als Gerätetyp

![sinricpro water tank new device template basic info]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-basic-info.png) 

* Klicke auf **Capabilities**. 

Hier müssen wir die Funktionen unseres Sensors auswählen. Wir möchten den *Wasserstand* in Prozent kennen. Ziehen wir also eine **Range** und eine **Push Notification** Capability hinein.

![sinricpro water tank new device template capabilities]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-capabilities.png) 

- Was ist die Range Capability?

  Mit der Range Capability lässt sich eine Zahl darstellen, z. B. die aktuelle Geschwindigkeit eines Mixers.

- Was ist die Push Notification Capability?

  Die Notification Capability ermöglicht es, aus dem Code heraus eine Push-Benachrichtigung zu senden.

Klicke auf die Schaltfläche **Configure** und richte die beiden Capabilities wie unten gezeigt ein.

![sinricpro water tank device template range capability]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-template-range-capability.png)  

Klicke zum Speichern auf **Save**.

Klicke auf **Save**, um die Vorlage zu speichern.

Jetzt siehst du die Vorlage, die wir gerade angelegt haben.


## Eine vorhandene Vorlage importieren?

Wenn du es dir einfach machen willst, kannst du die Importfunktion verwenden.

![Sinric Pro import template json]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Füge diese Vorlage ein:

```json
{
  "name": "Water Level Indicator",
  "description": "Water Level Indicator",
  "deviceTypeId": "621b9648f728ec974aac62f2",
  "capabilities": [
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance1",
        "locale": "en-US",
        "rangeName": "Water Level",
        "minimumValue": 1,
        "maximumValue": 100,
        "precision": 1,
        "unitOfMeasure": "5ffbeefbfaa11451974c6bbd",
        "presets": [],
        "nonControllable": true
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    }
  ]
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/a04eef3577a55be6df4ad098ec8df031)


* Öffne links das Menü **Devices** und klicke auf die Schaltfläche **Add Device** (oben links).

* Gib als Gerätenamen **Water Tank** und als Beschreibung **Water Tank** ein und wähle den Gerätetyp **Water Level Indicator**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-from-template.png)

* Klicke auf den Tab Others und dann auf **Save**

* Die nächste Seite zeigt die Zugangsdaten, die das eben angelegte Gerät für die Verbindung braucht.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Kopiere **Device Id**, **App Key** und **App Secret** ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN !***

* Klicke auf **Code Generator**, um den Code zu erzeugen. Klicke auf **Download**, um den Code herunterzuladen.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinricpro-water-tank-new-device-code-download.png)
 

### Schritt 2 : Mit Sinric Pro verbinden 

#### Schritt 2.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Vollständiger Code


**sinricpro-water-level-monitor.ino**

```cpp
//#define ENABLE_DEBUG

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif

#include <Arduino.h>
#ifdef ESP8266
  #include <ESP8266WiFi.h>
#endif
#ifdef ESP32
  #include <WiFi.h>
#endif

#include <SinricPro.h>
#include "WaterLevelIndicator.h"

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DEVICE_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password

#define BAUD_RATE  115200
#define EVENT_WAIT_TIME   60000 // send event every 60 seconds

#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif

const int EMPTY_TANK_HEIGHT = 150; // Height when the tank is empty
const int FULL_TANK_HEIGHT  =  25; // Height when the tank is full

WaterLevelIndicator &waterLevelIndicator = SinricPro[DEVICE_ID];

long duration;
float distanceInCm; 
int waterLevelAsPer;
int lastWaterLevelAsPer;
float lastDistanceInCm;

// RangeController
void updateRangeValue(int value) {
  waterLevelIndicator.sendRangeValueEvent("rangeInstance1", value);
}

// PushNotificationController
void sendPushNotification(String notification) {
  waterLevelIndicator.sendPushNotification(notification);
}

void handleSensor() {
   if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return; // Wait untill 1 min
  last_millis = current_millis;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);   
  distanceInCm = duration/29 / 2;
  
  if(distanceInCm <= 0) { 
    Serial.printf("Invalid reading: %f..\r\n", distanceInCm); 
    return;
  }
  
  if(lastDistanceInCm == distanceInCm) { 
    Serial.printf("Water level did not changed. do nothing...!\r\n");
    return;
  }
  
  int change = abs(lastDistanceInCm - distanceInCm);
  if(change < 2) {
    Serial.println("Too small change in water level (waves?). Ignore...");
    return;
  }
  
  lastDistanceInCm = distanceInCm;
  waterLevelAsPer = map((int)distanceInCm ,EMPTY_TANK_HEIGHT, FULL_TANK_HEIGHT, 0, 100); 
  waterLevelAsPer = constrain(waterLevelAsPer, 1, 100);
  
  Serial.printf("Distance (cm): %f. %d%%\r\n", distanceInCm, waterLevelAsPer); 
  
  /* Update water level on server */  
  updateRangeValue(waterLevelAsPer);  

  /* Send a push notification if the water level is too low! */
  if(waterLevelAsPer < 5) { 
    sendPushNotification("Water level is too low!");
  } 
}

 

/********* 
 * Setup *
 *********/

void setupSensor() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void setupSinricPro() {
  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setupWiFi() {
  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(SSID, PASS);
  Serial.printf("[WiFi]: Connecting to %s", SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }
  Serial.printf("connected\r\n");
}

void setup() {
  Serial.begin(BAUD_RATE);
  setupSensor();
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleSensor();
  SinricPro.handle();
}
```

**WaterLevelIndicator.h**

```cpp
#ifndef _WATERLEVELINDICATOR_H_
#define _WATERLEVELINDICATOR_H_

#include <SinricProDevice.h>
#include <Capabilities/RangeController.h>
#include <Capabilities/PushNotification.h>

class WaterLevelIndicator 
: public SinricProDevice
, public RangeController<WaterLevelIndicator>
, public PushNotification<WaterLevelIndicator> {
  friend class RangeController<WaterLevelIndicator>;
  friend class PushNotification<WaterLevelIndicator>;
public:
  WaterLevelIndicator(const String &deviceId) : SinricProDevice(deviceId, "WaterLevelIndicator") {};
};

#endif
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/206044afbcaa9aca36fc6538f639688a)


 
Jetzt solltest du den Wasserstand des Tanks über Alexa und die Sinric Pro App abfragen können

Alexa, wie ist der Wasserstand (Name der Range) im Wassertank (Gerätename)

![Sinric Pro Alexa HC-SR04 sensor]({{ site.github.url }}/public/img/sinricpro-water-tank-alexa.jpg)
 
![Sinric Pro Alexa HC-SR04 portal]({{ site.github.url }}/public/img/sinricpro-water-tank-HC-SR04-portal.png)

![Sinric Pro water tank app]({{ site.github.url }}/public/img/sinricpro-water-tank-hc-sr04.png)

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-tank.mp4" type="video/mp4">
</video>

### Schritt 3 : Höhen für vollen und leeren Tank über die Oberfläche einstellbar machen

#### 3.1 Gerätevorlage aktualisieren

Damit sich die Höhen für den vollen und den leeren Tank über die Oberfläche einstellen lassen, müssen wir zur eigenen Gerätevorlage zurückgehen und wie unten gezeigt zwei weitere Range Controller für **Full Tank Height** und **Empty Tank Height** hinzufügen.

![Full Empty ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-empty-tank-height.png)

Die vollständige Gerätevorlage sieht dann so aus

![Full Template ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-template.png)

Hier ist die Vorlage mit den Höhen für vollen und leeren Tank. Du kannst sie im Bereich Device Template importieren.


```json
{
  "name": "Water Level Indicator",
  "description": "Water Level Indicator",
  "deviceTypeId": "621b9648f728ec974aac62f2",
  "capabilities": [
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance1",
        "locale": "en-US",
        "rangeName": "Water Level",
        "minimumValue": 1,
        "maximumValue": 100,
        "precision": 1,
        "unitOfMeasure": "5ffbeefbfaa11451974c6bbd",
        "presets": [],
        "nonControllable": true
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    },
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance2",
        "locale": "en-US",
        "rangeName": "Empty Tank Height",
        "minimumValue": 1,
        "maximumValue": 200,
        "precision": 1,
        "unitOfMeasure": "600e7937a7a09c3f3230f8ed",
        "presets": [],
        "nonControllable": false
      }
    },
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance3",
        "locale": "en-US",
        "rangeName": "Full Tank Height",
        "minimumValue": 1,
        "maximumValue": 200,
        "precision": 1,
        "unitOfMeasure": "600e7937a7a09c3f3230f8ed",
        "presets": [],
        "nonControllable": false
      }
    }
  ]
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/0ca54644b4abbd05c164e2bdd3dcf052)


#### 3.2 Vollständiger Code


```cpp
//#define ENABLE_DEBUG

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif

#include <Arduino.h>
#ifdef ESP8266
  #include <ESP8266WiFi.h>
#endif
#ifdef ESP32
  #include <WiFi.h>
#endif

#include <SinricPro.h>
#include "WaterLevelIndicator.h"

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DEVICE_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password

#define BAUD_RATE  115200
#define EVENT_WAIT_TIME   60000 // send event every 60 seconds

#if defined(ESP8266)
  const int trigPin = 12;
  const int echoPin = 14;
#elif defined(ESP32) 
  const int trigPin = 5;
  const int echoPin = 18;
#elif defined(ARDUINO_ARCH_RP2040)
  const int trigPin = 15;
  const int echoPin = 14;
#endif

int EMPTY_TANK_HEIGHT = 150; // Variable for height when the tank is empty
int FULL_TANK_HEIGHT  =  25; // Variable for height when the tank is full

WaterLevelIndicator &waterLevelIndicator = SinricPro[DEVICE_ID];

long duration;
float distanceInCm; 
int waterLevelAsPer;
int lastWaterLevelAsPer;
float lastDistanceInCm;

// RangeController
void updateRangeValue(int value) {
  waterLevelIndicator.sendRangeValueEvent("rangeInstance1", value);
}

// PushNotificationController
void sendPushNotification(String notification) {
  waterLevelIndicator.sendPushNotification(notification);
}

// RangeController

// Below function will trigger when you change the sliders
bool onRangeValue(const String &deviceId, const String& instance, int &rangeValue) {
  if(instance == "rangeInstance2") {
    EMPTY_TANK_HEIGHT = rangeValue;
    Serial.printf("Empty tank height changed to %d\r\n", rangeValue);
  } else if(instance == "rangeInstance3") { 
    FULL_TANK_HEIGHT = rangeValue;
    Serial.printf("Full tank height changed to %d\r\n", rangeValue);
  }
  
  return true;
}

bool onAdjustRangeValue(const String &deviceId, const String& instance, int &valueDelta) {
  if(instance == "rangeInstance2") {
    EMPTY_TANK_HEIGHT += valueDelta;
    Serial.printf("Empty tank height adjusted by %d\r\n", valueDelta);
  } else if(instance == "rangeInstance3") { 
    FULL_TANK_HEIGHT += valueDelta;
    Serial.printf("Full tank height adjusted by %d\r\n", valueDelta);
  }
  
  return true;
}

void handleSensor() {
   if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return; // Wait untill 1 min
  last_millis = current_millis;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);   
  distanceInCm = duration/29 / 2;
  
  if(distanceInCm <= 0) { 
    Serial.printf("Invalid reading: %f..\r\n", distanceInCm); 
    return;
  }
  
  if(lastDistanceInCm == distanceInCm) { 
    Serial.printf("Water level did not changed. do nothing...!\r\n");
    return;
  }
  
  int change = abs(lastDistanceInCm - distanceInCm);
  if(change < 2) {
    Serial.println("Too small change in water level (waves?). Ignore...");
    return;
  }
  
  lastDistanceInCm = distanceInCm;
  waterLevelAsPer = map((int)distanceInCm ,EMPTY_TANK_HEIGHT, FULL_TANK_HEIGHT, 0, 100); 
  waterLevelAsPer = constrain(waterLevelAsPer, 1, 100);
  
  Serial.printf("Distance (cm): %f. %d%%\r\n", distanceInCm, waterLevelAsPer); 
  
  /* Update water level on server */  
  updateRangeValue(waterLevelAsPer);  

  /* Send a push notification if the water level is too low! */
  if(waterLevelAsPer < 5) { 
    sendPushNotification("Water level is too low!");
  } 
}

 

/********* 
 * Setup *
 *********/

void setupSensor() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void setupSinricPro() {
  // RangeController
  
  // setup Empty tank slider
  waterLevelIndicator.onRangeValue("rangeInstance2", onRangeValue);
  waterLevelIndicator.onAdjustRangeValue("rangeInstance2", onAdjustRangeValue);

  // Setup Full tank slider.
  waterLevelIndicator.onRangeValue("rangeInstance3", onRangeValue);
  waterLevelIndicator.onAdjustRangeValue("rangeInstance3", onAdjustRangeValue);

  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setupWiFi() {
  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(SSID, PASS);
  Serial.printf("[WiFi]: Connecting to %s", SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }
  Serial.printf("connected\r\n");
}

void setup() {
  Serial.begin(BAUD_RATE);
  setupSensor();
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleSensor();
  SinricPro.handle();
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/2b20b0086bb0a6de500c08407acd3943)


![Tank control with Alexa and SinricPro App ]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-full-alexa-sinricpro.jpg)

Das war's.

### Fehlerbehebung
1. Google Home und SmartThings werden nicht unterstützt.

2. Weitere Details findest du auf unserer Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html).
 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Wasserleck-, Überschwemmungs- und Regensensor]({{ site.github.url }}/de/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.de.html)
- [Kapazitiver Bodenfeuchtesensor (HW-390)]({{ site.github.url }}/de/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.de.html)

> Dieses Dokument ist Open Source. Tippfehler entdeckt? Bitte erstelle ein [Issue](https://github.com/sinricpro/help-docs)