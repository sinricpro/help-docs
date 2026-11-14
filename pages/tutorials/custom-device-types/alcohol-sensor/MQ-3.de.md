---
title:  Wie du mit einem MQ-3 einen Gassensor baust, um Alkohol, Ethanol und Rauch in der Luft zu erkennen – mit ESP32, ESP8266 oder Raspberry Pi Pico W für Alexa
layout: post
lang: de
description: Baue einen MQ-3 Gassensor mit einem ESP32, ESP8266 oder Raspberry Pi Pico W, um Alkohol, Ethanol und Rauch zu erkennen, mit Alexa und Push-Benachrichtigungen.
---

In diesem Abschnitt zeigen wir dir, wie du mit einem **ESP32**, **Raspberry Pi Pico W** oder **ESP8266** einen Gassensor baust. Anschließend kannst du die Alkoholkonzentration in der Luft über **Amazon Alexa** überwachen und **Push-Benachrichtigungen erhalten** über die Sinric Pro App, wenn der Sensor einen bestimmten Wert erkennt.

### Voraussetzungen : 

1. ESP32, ESP8266 x 1.
2. MQ-3 x 1.
3. Jumper-Kabel.

![Sinric Pro MQ-3 alcohol gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-intro.jpg)

### Kurze Einführung in den MQ-3

Der MQ-3 ist ein Halbleiter-Gassensor, der in vielen Anwendungen eingesetzt wird, um Alkoholkonzentrationen in der Luft zu erkennen. Es ist ein kostengünstiger, hochempfindlicher Sensor, der einfach zu verwenden ist. Der MQ-3 basiert auf dem Prinzip der Gaserkennung mit einem Zinndioxid-Halbleiter (SnO2). Wenn Alkoholmoleküle in der Luft vorhanden sind, werden sie an der Oberfläche des SnO2 absorbiert. Diese Absorption verändert die Leitfähigkeit des SnO2, was als elektrisches Signal gemessen werden kann. Der MQ-3 ist empfindlich für ein breites Spektrum an Alkoholkonzentrationen, von 0,05 ppm bis 5000 ppm. Er reagiert auch auf andere Gase wie Ammoniak, Benzol und Toluol, ist aber am empfindlichsten für Alkohol.

Der MQ3-Sensor benötigt eine Stromversorgung von 5V und verbraucht etwa 800mW. Der digitale Ausgang kann an einen ESP32, ESP8266 oder Pico W angeschlossen werden, um die Alkoholkonzentration zu messen.

**Wie kalibriert man den Sensor?**

Lass ihn 24-48 Stunden eingeschaltet, um ihn einzubrennen und zu stabilisieren.

Datenblatt: [MQ-3](https://www.sparkfun.com/datasheets/Sensors/MQ-3.pdf)

### Verdrahtung

![Sinric Pro esp8266 MQ-3 wiring]({{ site.github.url }}/public/img/sinricpro_mq3-wiring-diagram.png) 


| MCU       | A0 Pin                    |  VCC Pin  |
| --------- | -------                   | -------   |
| ESP32     |    34 (Analog ADC1_CH6)   |   5V      |
| ESP8266   |    A0                     |   5V/VIN  |
| Pico W    |    GP26 (ADC0)            |   5V      |
 


**Hinweis:** Am ESP32 ist ADC2 (GPIO04, GPIO02, GPIO15) instabil, wenn WLAN verwendet wird.

Lass uns prüfen, ob der Sensor richtig verdrahtet ist und funktioniert. 


```cpp
#if defined(ESP8266)
  const int adcPin = A0;  
#elif defined(ESP32) 
  const int adcPin = 34;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int adcPin = 26;  
#endif

int sensorVal;

void setup() {
 Serial.begin(9600);
 Serial.println("warming up for 20 seconds ..!");
 delay(20000);
}

void loop() {
 sensorVal = analogRead(adcPin);
 Serial.printf("value: %d\r\n", sensorVal);
 delay(2000); // delay 2s
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/580e05d98109e36f6b4ace84bded1c7b)


Messwert ohne Alkohol in der Nähe (ca. 760):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-reading.png)

Bei Nähe zu Jack Daniel's Single Barrel Tennessee Whiskey (ca. 850):

![Sinric Pro MQ3 test reading]({{ site.github.url }}/public/img/sinricpro_mq3-test-jack-daniels-reading.png)

 
### Schritt 1 : Mit Sinric Pro verbinden 

#### Schritt 1.1 : Einen benutzerdefinierten Gerätetyp für den Gassensor erstellen.

Sinric Pro hat keinen integrierten Gerätetyp für einen Gassensor, daher erstellen wir mit der Device Template Funktion einen eigenen Gerätetyp für den Gassensor.

1. Alkohol Erkannt/Nicht Erkannt. 

**Hinweis**: Du kannst die unten beschriebene Import-Funktion für Gerätevorlagen nutzen, um das Erstellen der vollständigen Vorlage zu überspringen.

* [Melde dich an](https://portal.sinric.pro/devicetemplates/new) bei deinem Sinric Pro Konto und gehe zu **Device Templates**

* Klicke auf **Add Device Template**. Gib als Name und Beschreibung **Gas Sensor** ein und wähle **Gas Sensor** als Gerätetyp

![Sinric Pro gas ensor device template]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-basic-info.png) 

* Klicke auf **Capabilities**. 

Hier müssen wir die Funktionen unseres Gassensors festlegen. Wir wollen wissen, ob *Alcohol* *Detected* oder *Not-Detected* ist. Dazu ziehen wir eine **Mode** und eine **Push Notification** Capability hinein.

![Sinric Pro custom device type for gas sensor]({{ site.github.url }}/public/img/gas-sensor-set-template-drop-range-mode.png) 

- Was ist die Mode Capability?

  Die Mode Capability kann einen Wert aus einer Liste vordefinierter Werte darstellen. Z. B.: den aktuellen Waschgang einer Waschmaschine.

- Was ist die Push Notification Capability?

  Die Notification Capability ermöglicht es, aus dem Code eine Push-Benachrichtigung zu senden.

Klicke auf **Configure** und richte die beiden Capabilities wie unten gezeigt ein.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-template-mode.png)  

Klicke auf **Save**, um zu speichern.

![Sinric Pro moisture sensor template mode and range settings]({{ site.github.url }}/public/img/sinricpro-gas-sensor-template-range-and-mode-configured.png)  

Klicke auf **Save**, um die Vorlage zu speichern.

Jetzt siehst du die soeben erstellte Vorlage.


## Eine vorhandene Vorlage importieren?

Wenn du zu bequem bist, um alle Mode-Werte selbst einzurichten, kannst du die Import-Funktion nutzen.

![Sinric Pro gas sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Füge diese Vorlage ein:


```json
{
  "name": "Gas Sensor",
  "description": "Gas Sensor",
  "deviceTypeId": "654d7ef928f14e9ac82ad57d",
  "capabilities": [
    {
      "id": "5ff0b41b994fd31b7d5e8961",
      "mode": {
        "instanceId": "modeInstance1",
        "locale": "en-US",
        "modeName": "Alcohol",
        "nonControllable": true,
        "modeValues": [
          "Detected",
          "Not-Detected"
        ]
      }
    },
    {
      "id": "62a707bd9e2f39090569e2d3"
    }
  ]
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/9fdaaaa176a83414961756cf276b82d5)


* [Melde dich an](http://portal.sinric.pro) bei deinem Sinric Pro Konto, gehe links zum Menü **Devices** und klicke oben links auf **Add Device**.

* Gib den Gerätenamen **Gas Sensor**, die Beschreibung **Gas Sensor** ein und wähle als Gerätetyp **Gas Sensor** aus **Your Device Templates**.


![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-new-device-info.png)

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


**GasSensor.h**

```cpp
#ifndef _GASSENSOR_H_
#define _GASSENSOR_H_

#include <SinricProDevice.h>
#include <Capabilities/ModeController.h>
#include <Capabilities/PushNotification.h>

class GasSensor 
: public SinricProDevice
, public ModeController<GasSensor>
, public PushNotification<GasSensor> {
  friend class ModeController<GasSensor>;
  friend class PushNotification<GasSensor>;
public:
  GasSensor(const String &deviceId) : SinricProDevice(deviceId, "GasSensor") {};
};

#endif
```

**sinricpro-mq4-sensor.ino**

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
#include "GasSensor.h"

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.

#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define DEVICE_ID         ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)

#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

#if defined(ESP8266)
  const int adcPin = A0;  
#elif defined(ESP32) 
  const int adcPin = 34;  
#elif defined(ARDUINO_ARCH_RP2040)
  const int adcPin = 26;  
#endif

#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
#define EVENT_WAIT_TIME   60000               // send event every 60 seconds

const int GAS_DETECTED_THRESHOLD = 850;       // Change accordingly

GasSensor &gasSensor = SinricPro[DEVICE_ID];
int sensorVal;
String sensorState = "";
String lastSensorState = "";

// ModeController
void updateMode(String mode) {
  gasSensor.sendModeEvent("modeInstance1", mode, "PHYSICAL_INTERACTION");
}

// PushNotificationController
void sendPushNotification(String notification) {
  gasSensor.sendPushNotification(notification);
}

void setupSinricPro() {
  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

 void handleM3Sensor() {
  if (SinricPro.isConnected() == false) {
    return; 
  }

  static unsigned long last_millis;
  unsigned long        current_millis = millis();
  if (last_millis && current_millis - last_millis < EVENT_WAIT_TIME) return;
  last_millis = current_millis;
    
  sensorVal = analogRead(adcPin);
  Serial.printf("Sensor value: %d\r\n", sensorVal); 

  if (sensorVal > GAS_DETECTED_THRESHOLD) { // "Detected" or "Not-Detected" (from ModeController mode values)
    sensorState = "Detected"; 
  } else {
    sensorState = "Not-Detected";
  }

  if(sensorState != lastSensorState) {
    /* update server with "detected" / "Not-Detected" status */
    updateMode(sensorState); 

    /* send a push notification when gas detected */
    if(sensorState == "Detected") {
      sendPushNotification("Gas Detected!!!");
    }    
  } 

  lastSensorState = sensorState;  // save to compare next time.
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
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  handleM3Sensor();
  SinricPro.handle();
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/e9d05233bc97f29a403a101810e36795)

 
Jetzt solltest du den Alkohol-erkannt-Status und den Wasserstand über Alexa und die Sinric Pro App sehen können

Alexa, wie ist der Alcholol (Modusname) bei Gas Sensor (Gerätename)
 

![Sinric Pro Alexa gas sensor]({{ site.github.url }}/public/img/sinricpro-gas-sensor-alexa.jpg)
 
![Sinric Pro Portal gas sensor portal]({{ site.github.url }}/public/img/sinricpro-gas-sensor-device-portal.png)
 
 ### Schritt 3 : Sprachansagen!

✅ So funktioniert's:

1️⃣ Füge in SinricPro einen Switch hinzu (dein geheimer Auslöser!)

2️⃣ Erstelle eine Alexa Routine, die deine Nachricht ausspricht, wenn „Gas sensor detects gas!“, wenn der Switch eingeschaltet wird

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
- [MQ135 Luftqualitätssensor]({{ site.github.url }}/de/pages/tutorials/air-quality-sensors/mq135.de.html)
- [Kapazitiver Bodenfeuchtesensor (HW-390)]({{ site.github.url }}/de/pages/tutorials/custom-device-types/capacitive-soil-moisture-sensor/HW-390.de.html)
- [Wasserleck-, Flut- und Regensensor]({{ site.github.url }}/de/pages/tutorials/custom-device-types/water-sensor/flood-leak-rain-sensor.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
