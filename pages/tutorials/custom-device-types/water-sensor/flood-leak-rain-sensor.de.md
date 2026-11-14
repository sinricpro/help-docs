---
title:  Wassersensor (auch als Wasserleck-, Flut- oder Regendetektor bekannt) für ESP8266, ESP32, Raspberry Pi Pico W für Alexa
layout: post
lang: de
description: Baue einen Wasserleck-, Flut- oder Regensensor mit einem ESP32, ESP8266 oder Raspberry Pi Pico W. Prüfe den Status mit Alexa und erhalte Push-Benachrichtigungen.
---
 
In diesem Tutorial bauen wir einen Wassersensor, der an einen **ESP32**, **ESP8266** oder **Raspberry Pi Pico W** angeschlossen werden kann, um auf Wasserlecks, Fluten oder Regen zu überwachen. Mit **Amazon Alexa** kannst du den Status deines Wassersensors abfragen, Informationen dazu erhalten und **Push-Benachrichtigungen erhalten, wenn Wasser erkannt wird**.

![Sinric Pro water leak sensor]({{ site.github.url }}/public/img/sinricpro-water-sensor-intro.png)

### Voraussetzungen : 

1. ESP32, ESP8266 oder Raspberry Pi Pico W x 1.
2. Wassersensor x 1.
3. Jumper-Kabel.

### Kurze Einführung in den Wassersensor

Ein Wasserdetektor, auch Wassersensor genannt, ist ein Gerät, das die Anwesenheit von Wasser erkennt. Wasserdetektoren funktionieren auf verschiedene Weisen. Einige gängige Arten von Wasserdetektoren sind:

- **Leitfähigkeitsdetektoren**: Leitfähigkeitsdetektoren messen die elektrische Leitfähigkeit des Wassers. Wenn der Sensor mit Wasser in Kontakt kommt, steigt die elektrische Leitfähigkeit.

- **Kapazitätsdetektoren**: Kapazitätsdetektoren messen die Kapazität des Wassers. Wenn der Sensor mit Wasser in Kontakt kommt, steigt die Kapazität.

- **Optische Detektoren**: Optische Detektoren erkennen die Änderungen des Brechungsindex von Wasser. Wenn der Sensor mit Wasser in Kontakt kommt, ändert sich der Brechungsindex.
 
**Hinweis:** Wassersensoren haben eine kürzere Lebensdauer, weil sie dem Wasser ausgesetzt sind. Das kann dazu führen, dass der Sensor schnell korrodiert, wenn er eingeschaltet ist, während er in Wasser getaucht ist. Um das zu vermeiden, schalten wir den Sensor nur zum Messen ein.
  
### Verdrahtung des Wassersensors

Lass uns den Wasserstandssensor anschließen.

![Sinric Pro water sensor sensor wiring]({{ site.github.url }}/public/img/sinricpro_water_sensor_wiring.png) 

| MCU       | S Pin                     |  VCC Pin  |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analog ADC1_CH6)   |   17      |
| ESP8266   |    A0                     |   D2      |
| Pico W    |    GP26 (ADC0)            |   6       |
 


**Hinweis:** Am ESP32 ist ADC2 (GPIO04, GPIO02, GPIO15) instabil, wenn WLAN verwendet wird.

### Werte vom Wassersensor auslesen

Lass uns prüfen, ob der Sensor richtig verdrahtet ist und funktioniert. 


```cpp
#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

void setup() {
  Serial.begin(9600);
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void loop() {
  digitalWrite(vccPin, HIGH);         // turn on the power for sensor.
  delay(100);                           // wait 100ms
  int value = analogRead(SIGNAL_PIN);   // make a reading from sensor
  digitalWrite(POWER_PIN, LOW);         // turn off the sensor
  Serial.printf("value: %d\n", value);  // print reading
  delay(1000);
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/7d45a826ba02203ab8571b735add45c9)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-water-sensor-demo.mp4" type="video/mp4">
</video>

![sinric pro water sensor arduino readings]({{ site.github.url }}/public/img/sinricpro-water-sensor-test-readings.png) 

### Überschwemmung erkennen


```cpp
#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

const int FLOOD_THRESHOLD = 100;

void setup() {
  Serial.begin(9600);
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void loop() {
  digitalWrite(vccPin, HIGH);         // turn on the power for sensor.
  delay(100);                           // wait 100ms
  int value = analogRead(sPin);   // make a reading from sensor
  digitalWrite(vccPin, LOW);         // turn off the sensor
  
  if (value > FLOOD_THRESHOLD) {
    Serial.print("Flooding detected");
  }

  delay(1000);
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/aff71487783487cbfbdef4006eaab809)


### Wasserstand erkennen


```cpp
#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

const int SENSOR_MAX = 560;
const int SENSOR_MIN = 1;

void setup() {
  Serial.begin(9600);
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void loop() {
  digitalWrite(vccPin, HIGH);         // turn on the power for sensor.
  delay(100);                           // wait 100ms
  int value = analogRead(sPin);   // make a reading from sensor
  digitalWrite(vccPin, LOW);         // turn off the sensor
  
  int waterLevelHeightInCm = map(value, SENSOR_MIN, SENSOR_MAX, 0, 5); // Map sensor value between 0..5 levels (1 cm = 1 level)
  Serial.printf("Water level: %d\n", waterLevelHeightInCm);  // print reading

  delay(1000);
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/a2dffb0f0c46585ed0b35aa902c2447e)


 
### Schritt 1 : Mit Sinric Pro verbinden 

#### Schritt 1.1 : Einen benutzerdefinierten Gerätetyp für den Wassersensor erstellen.

Sinric Pro hat keinen integrierten Gerätetyp für einen Wasser-/Flutsensor, daher erstellen wir mit der Device Template Funktion einen eigenen Gerätetyp für den Wassersensor.

1. Überschwemmung im Keller oder nicht.

2. Wasserstand.

**Hinweis**: Du kannst die unten beschriebene Import-Funktion für Gerätevorlagen nutzen, um das Erstellen der vollständigen Vorlage zu überspringen.

* [Melde dich an](https://portal.sinric.pro/devicetemplates/new) bei deinem Sinric Pro Konto und gehe zu **Device Templates**

* Klicke auf **Add Device Template**. Gib als Name und Beschreibung **Flood Sensor** ein und wähle **Flood Sensor** als Gerätetyp

![Sinric Pro water sensor device template basic info]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-basic-info.png) 

* Klicke auf **Capabilities**. 

Hier müssen wir die Funktionen unseres Bodenfeuchtesensors festlegen. Wir wollen wissen, ob *Soil is Wet or Dry* ist und den *Moisture level*. Dazu ziehen wir eine **Range**, eine **Mode** und eine **Push Notification** Capability hinein.

![Sinric Pro custom device type for capacitive soil moisture sensor]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-set-template-drop-range-mode.png) 

- Was ist die Range Capability?

  Die Range Capability kann eine Zahl darstellen. Z. B.: die aktuelle Geschwindigkeit eines Mixers.

- Was ist die Mode Capability?

  Die Mode Capability kann einen Wert aus einer Liste vordefinierter Werte darstellen. Z. B.: den aktuellen Waschgang einer Waschmaschine.

- Was ist die Push Notification Capability?

  Die Notification Capability ermöglicht es, aus dem Code eine Push-Benachrichtigung zu senden.

Klicke auf **Configure** und richte die beiden Capabilities wie unten gezeigt ein.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode.png)  

Klicke auf **Save**, um zu speichern.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-range-and-mode-configured.png)  

Klicke auf **Save**, um die Vorlage zu speichern.

![Sinric Pro moisture saved template]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-template-saved.png)  

Jetzt siehst du die soeben erstellte Vorlage.


## Eine vorhandene Vorlage importieren?

Wenn du zu bequem bist, um alle Mode- und Range-Werte selbst einzurichten, kannst du die Import-Funktion nutzen.

![Sinric Pro capacitive soil moisture sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Füge diese Vorlage ein:


```json
{
  "name": "Flood Sensor",
  "description": "Flood Sensor",
  "deviceTypeId": "65335c897dc29736db4272d2",
  "capabilities": [
    {
      "id": "5ff0b41b994fd31b7d5e8961",
      "mode": {
        "instanceId": "modeInstance1",
        "locale": "en-US",
        "modeName": "Flooding",
        "nonControllable": true,
        "modeValues": [
          "Yes",
          "No"
        ]
      }
    },
    {
      "id": "5ff0b45f994fd31b7d5e89c2",
      "range": {
        "instanceId": "rangeInstance1",
        "locale": "en-US",
        "rangeName": "Water Level",
        "minimumValue": 0,
        "maximumValue": 10,
        "precision": 1,
        "unitOfMeasure": "600e7937a7a09c3f3230f8ed",
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

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/48649129dbed3021cda75a4d8ce94515)


* [Melde dich an](http://portal.sinric.pro) bei deinem Sinric Pro Konto, gehe links zum Menü **Devices** und klicke oben links auf **Add Device**.

* Gib den Gerätenamen **Flood Sensor**, die Beschreibung **My Flood Sensor** ein und wähle als Gerätetyp **Flood Sensor** aus.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-new-device-info.png)

* Klicke auf den Tab Others und dann auf **Save**

* Der nächste Bildschirm zeigt die Zugangsdaten, die du benötigst, um das gerade erstellte Gerät zu verbinden.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Kopiere die **Device Id**, den **App Key** und das **App Secret** ***Bewahre diese Werte sicher auf. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN !***

* Klicke auf **Code Generator**, um den Code zu generieren. Klicke auf **Download**, um den Code herunterzuladen.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-code-download.png)
 

### Schritt 2 : Mit Sinric Pro verbinden 

#### Schritt 2.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Vollständiger Code


**FloodSensor.h**

```cpp
#ifndef _FLOODSENSOR_H_
#define _FLOODSENSOR_H_

#include <SinricProDevice.h>
#include <Capabilities/ModeController.h>
#include <Capabilities/RangeController.h>
#include <Capabilities/PushNotification.h>

class FloodSensor 
: public SinricProDevice
, public ModeController<FloodSensor>
, public RangeController<FloodSensor>
, public PushNotification<FloodSensor> {
  friend class ModeController<FloodSensor>;
  friend class RangeController<FloodSensor>;
  friend class PushNotification<FloodSensor>;
public:
  FloodSensor(const String &deviceId) : SinricProDevice(deviceId, "FloodSensor") {};
};

#endif
```

**sinricpro-flood-sensor.ino**

```cpp
// Uncomment the following line to enable serial debug output
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
#include "FloodSensor.h"
#include <math.h>

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DEVICE_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password

#define BAUD_RATE         115200
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

#if defined(ESP8266)
  const int sPin = A0;  
  const int vccPin = D2;
#elif defined(ESP32) 
  const int sPin = 34;  
  const int vccPin = 17;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int sPin = 26;  
  const int vccPin = 6;  
#endif

FloodSensor &floodSensor = SinricPro[DEVICE_ID];

const int FLOOD_THRESHOLD = 100;
const int SENSOR_MAX = 560;
const int SENSOR_MIN = 1;

int waterSensorValue = 0;
int lastWaterSensorValue = 0;
String lastIsFloodingStr = "";

// ModeController
void updateMode(String mode) {
  floodSensor.sendModeEvent("modeInstance1", mode, "PHYSICAL_INTERACTION");
}

// RangeController
void updateRangeValue(float value) {
  floodSensor.sendRangeValueEvent("rangeInstance1", value);
}

// PushNotificationController
void sendPushNotification(String notification) {
  floodSensor.sendPushNotification(notification);
}

float floatMap(float x, float a, float b, float c, float d) {
  float f=x/(b-a)*(d-c)+c;
  return f;
} 

float floatRound(float in_value, int decimal_place) {
 float multiplier = powf( 10.0f, decimal_place );
 in_value = roundf( in_value * multiplier ) / multiplier;
 return in_value;
}

void handleWaterSensor() {
  if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return;
  last_millis = current_millis;
    
  digitalWrite(vccPin, HIGH);     // turn on the power for sensor.
  delay(100);                     // wait 100ms
  waterSensorValue = analogRead(sPin); // make a reading from sensor
  digitalWrite(vccPin, LOW);      // turn off the sensor

  Serial.printf("Water sensor value: %d\r\n", waterSensorValue); 
  
  if (waterSensorValue == lastWaterSensorValue) {
    Serial.printf("Water sensor did not changed. do nothing...!\r\n");
    return; 
  }

  /* determine whether flooding */
  String isFloodingStr = "";
  if(waterSensorValue > FLOOD_THRESHOLD) {
    isFloodingStr = "Yes"; // NOTE: must be Yes, No. This is from modes list in template.
  } else {
    isFloodingStr = "No";
  }

  /* Update Flooding label if changed */
  if(lastIsFloodingStr != isFloodingStr) {
    lastIsFloodingStr = isFloodingStr;
    updateMode(isFloodingStr);
  }
  
  delay(500);

  /* update Water Level label */
  float sensorValueToInches = floatMap(waterSensorValue, SENSOR_MIN, SENSOR_MAX, 0, 1.9); /* map the sensor value to inches */
  float roundedSensorValueToInches = floatRound(sensorValueToInches, 2); /* round the sensor value to 1 decimal point */
  Serial.printf("Water level height in inches: %f\r\n", roundedSensorValueToInches);
  updateRangeValue(roundedSensorValueToInches); 


  /* send a push notification when flooding is detected! */
  if(waterSensorValue > FLOOD_THRESHOLD) {
    sendPushNotification("Flooding detected in the basement!");
  } 

  lastWaterSensorValue = waterSensorValue;  // save to compare next time.
}


/********* 
 * Setup *
 *********/
void setupWaterSensor() {
  pinMode(sPin, INPUT);
  pinMode(vccPin, OUTPUT);
  digitalWrite(vccPin, LOW); // turn off the sensor at the begining.
}

void setupSinricPro() {
  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
};

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
  setupWaterSensor();
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleWaterSensor();
  SinricPro.handle();  
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/6657119c2750c4cc662b674dba04a651)

 
Jetzt solltest du den Überschwemmungsstatus und den Wasserstand über Alexa und die Sinric Pro App sehen können

Alexa, wie ist die Flooding (Modusname) bei Flood Sensor (Gerätename)

Alexa, wie ist der Water Level (Range-Name) bei Flood Sensor (Gerätename)


![Sinric Pro water sensor in the Alexa app]({{ site.github.url }}/public/img/sinricpro-water-sensor-alexa.jpg)
 
![Sinric Pro water sensor in the Portal]({{ site.github.url }}/public/img/sinricpro-water-sensor-device-portal.png)
 
### Schritt 3 : Sprachansagen!

✅ So funktioniert's:

1️⃣ Füge in SinricPro einen Switch hinzu (dein geheimer Auslöser!)

2️⃣ Erstelle eine Alexa Routine, die deine Nachricht ausspricht, wenn „Basement is flooding!“, wenn der Switch eingeschaltet wird

3️⃣ Sende aus deinem Code ein Power-State-Event, um diesen Switch einzuschalten

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
``` 

### Fehlerbehebung
1. Google Home oder SmartThings werden nicht unterstützt.

2. Weitere Details findest du auf unserer Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html).
 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Wasserstand mit einem HC-SR04 Ultraschallsensor]({{ site.github.url }}/de/pages/tutorials/custom-device-types/ultrasonic-sensor/HC-SR04.de.html)
- [Kapazitiver Bodenfeuchtesensor (HW-390)]({{ site.github.url }}/de/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.de.html)
- [MQ135 Luftqualitätssensor]({{ site.github.url }}/de/pages/tutorials/air-quality-sensors/mq135.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
