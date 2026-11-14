---
title: TV-Tutorial - IR-Transceiver
layout: post
lang: de
description: Steuere deinen Fernseher mit Alexa und Google Home über ein ESP8285 ESP-01M IR-Transceiver-Modul und Sinric Pro. Verdrahtung und Code.
---


In diesem Abschnitt zeigen wir dir, wie du deinen Fernseher mit einem IR-Transceiver steuerst und ihn dann per Sprache über **Alexa, Google Home oder SmartThings** bedienst.

### Voraussetzungen : 

1. ESP8285 ESP-01M IR-Transceiver x1. 

In diesem Tutorial verwenden wir den ESP8285 ESP-01M IR-Transceiver, eine beliebte und leicht [online](https://www.google.com/search?q=esp8285+esp-01m+ir+transceiver) erhältliche Option. Wir konzentrieren uns zwar auf dieses spezielle Modul, aber die Konzepte lassen sich auch auf andere 38-kHz-Infrarotsender anwenden.

![Sinric Pro ir transceiver]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-esp8285.png) 

### Kurze Einführung zum ESP8285 ESP-01M IR-Transceiver

Ein Infrarot-ESP8285-WLAN-Transceiver-Modul ist eine Platine, die zwei Funktionen vereint:

**Infrarot-(IR)-Transceiver:** Dieser Teil ermöglicht es dem Modul, Infrarotsignale zu senden und zu empfangen. Der IR-Sender ist mit `GPIO4` verbunden, der IR-Empfänger mit `GPIO14`

**ESP8285 Wi-Fi-Modul:** Dies ist ein separater Chip auf der Platine, der dem Modul die Verbindung mit einem WLAN-Netzwerk ermöglicht. Der ESP8285 ist ein ESP8266 mit 1M Flash, der hohen Temperaturen bis zu 125 Grad Celsius widersteht.

**Firmware hochladen** : Verbinde den Jumper `GPIO01` mit `GND`.

**Firmware ausführen** : Entferne den Jumper und stecke den USB-Programmer wieder ein

### Verdrahtung

![Sinric Pro ESP8285 ESP-01M IR transceiver wiring]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-esp8285-wiring.png) 

| ESP8285   | TTL     |
| --------- | ------- |
| 5V        |    5V   |
| GND       |    GND  |
| TX        |    RX   |
| RX        |    TX   |


Bevor wir die Integration mit Sinric Pro vornehmen, solltest du prüfen, ob das Relais richtig verdrahtet ist und du IR-Signale aufzeichnen kannst. 

### Schritt 1: IR aufzeichnen

1. Installiere [IRremoteESP8266](https://github.com/crankyoldgit/IRremoteESP8266) 

    * Klicke auf die Menüpunkte „Sketch“ -> „Include Library“ -> „Manage Libraries...“.

    * Gib `IRremoteESP8266` in das Suchfeld „Filter your search...“ oben rechts ein.

    * Klicke auf das Suchergebnis `IRremoteESP8266`.

    * Wähle die Version, die du installieren möchtest, und klicke auf `Install`.

2. Verbinde den Jumper `GPIO0` mit `GND`, um die Firmware hochzuladen.

3. Flashe [IRrecvDumpV3](https://github.com/crankyoldgit/IRremoteESP8266/blob/master/examples/IRrecvDumpV3/IRrecvDumpV3.ino). Der Sketch muss nicht geändert werden. Er verwendet bereits die richtigen GPIO-Pins.

![transceiver esp8285 flash]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-esp8285-flash.png) 

4. Entferne den Jumper zwischen `GPIO0` und `GND` und stecke den USB-Programmer wieder ein. Jetzt führt der ESP-Chip den Sketch `IRrecvDumpV3` aus. Stelle die Arduino Serial BaudRate auf `115200`, um die Logs zu sehen.
  
6. Zeit, die **Power-on**-Taste deiner TV-Fernbedienung aufzuzeichnen.

![record tv remote esp82266]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-record-tv-remote.png) 

Im Arduino Serial Monitor werden die IR-Codes dann etwa so ausgegeben. 

Kopiere das **rawData**-Array

![record tv remote esp82266 arduino serial]({{ site.github.url }}/public/img/sinricpro-ir-transceiver-record-tv-remote-serial-arduino.png) 


### Schritt 2: IR senden

```c++
#include <Arduino.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

const uint16_t kIrLed = 4;

IRsend irsend(kIrLed);

uint16_t rawData[3] = {9004, 2218,  586};  // TODO: Change this to your remote control power button

void setup() {
  irsend.begin();
  Serial.begin(115200);
}

void loop() {
  Serial.println("a rawData capture from dump");
  irsend.sendRaw(rawData, 3 /* IR len */, 38 /* kHz */);  // TODO: adjust IR len according to rawData length.
  delay(2000);
}

```

**Flashe den obigen Sketch und entferne den Jumper, um die Firmware auszuführen.**

Wenn der Sketch das Signal sendet, sollte sich der Fernseher ein- oder ausschalten. Jetzt kannst du den Vorgang wiederholen, um weitere Tasten wie Lautstärke lauter, leiser, Stummschaltung usw. aufzuzeichnen.

### Schritt 3 : Ein neues TV-Gerät in Sinric Pro anlegen

* [Melde dich an](http://portal.sinric.pro) bei deinem Sinric Pro Konto, gehe links im Menü zu **Devices** und klicke oben links auf **Add Device**.

* Gib den Gerätenamen **TV**, die Beschreibung **TV** ein und wähle als Gerätetyp **TV**.

* Klicke auf Others und dann auf **Save**

![record tv remote esp82266 arduino serial]({{ site.github.url }}/public/img/sinricpro-tv-new-device.png) 

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys-no-hilight.png)

* Kopiere **Device Id**, **App Key** und **App Secret** ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN!***

### Schritt 2 : Programmierung 

#### 2.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Vollständiger Code

Jetzt können wir den SinricPro TV Sketch mit den IR-Codes vervollständigen.


```cpp
// #define ENABLE_DEBUG
#define SINRICPRO_NOSSL
 
#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif 

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

#include "SinricPro.h"
#include "SinricProTV.h"

#define WIFI_SSID         "YOUR-WIFI-SSID"    
#define WIFI_PASS         "YOUR-WIFI-PASSWORD"
#define APP_KEY           "YOUR-APP-KEY"      // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET        "YOUR-APP-SECRET"   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define TV_ID             "YOUR-DEVICE-ID"    // Should look like "5dc1564130xxxxxxxxxxxxxx"
#define BAUD_RATE         115200

const uint16_t kIrLed = 4;
IRsend irsend(kIrLed);

bool tvPowerState;

bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("TV turned %s\r\n", state?"on":"off");
  tvPowerState = state; // set powerState

  /*
    Protocol  : NEC
    Code      : 0x20DF10EF (32 Bits)
    uint16_t rawData[71] = {9032, 4476,  582, 544,  582, 546,  582, 1652,  582, 546,  582, 544,  582, 546,  582, 546,  582, 546,  582, 1654,  582, 1654,  582, 544,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 546,  582, 544,  584, 544,  582, 1654,  582, 546,  582, 546,  582, 546,  582, 546,  582, 1654,  582, 1654,  582, 1652,  582, 546,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 41158,  9004, 2222,  582};  // NEC 20DF10EF
    uint32_t address = 0x4;
    uint32_t command = 0x8;
    uint64_t data = 0x20DF10EF;
  */
  
  uint16_t rawData[71] = {9032, 4476,  582, 544,  582, 546,  582, 1652,  582, 546,  582, 544,  582, 546,  582, 546,  582, 546,  582, 1654,  582, 1654,  582, 544,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 546,  582, 544,  584, 544,  582, 1654,  582, 546,  582, 546,  582, 546,  582, 546,  582, 1654,  582, 1654,  582, 1652,  582, 546,  582, 1654,  582, 1654,  582, 1654,  582, 1654,  582, 41158,  9004, 2222,  582};  // NEC 20DF10EF
  irsend.sendRaw(rawData, 71 /* IR len */, 38 /* kHz */);
  
  return true; 
} 

// setup function for WiFi connection
void setupWiFi() {
  Serial.printf("\r\n[Wifi]: Connecting");

  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(WIFI_SSID, WIFI_PASS); 

  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }
  IPAddress localIP = WiFi.localIP();
  Serial.printf("connected!\r\n[WiFi]: IP-Address is %d.%d.%d.%d\r\n", localIP[0], localIP[1], localIP[2], localIP[3]);
}

// setup function for SinricPro
void setupSinricPro() {
  // add device to SinricPro
  SinricProTV& myTV = SinricPro[TV_ID];

  // set callback functions to device
  myTV.onPowerState(onPowerState);

  // For other https://github.com/sinricpro/esp8266-esp32-sdk/blob/master/examples/TV/TV.ino
  // myTV.onAdjustVolume(onAdjustVolume);
  // myTV.onChangeChannel(onChangeChannel);
  // myTV.onChangeChannelNumber(onChangeChannelNumber);
  // myTV.onMediaControl(onMediaControl);
  // myTV.onMute(onMute);  
  // myTV.onSelectInput(onSelectInput);
  // myTV.onSetVolume(onSetVolume);
  // myTV.onSkipChannels(onSkipChannels);

  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setupIR() {
  irsend.begin();
}

// main setup function
void setup() {
  setupIR();
  
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");

  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/7fa62119ea71ce381fde92711dc82bc3)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-ir-tv-demo.mp4" type="video/mp4">
</video>

Jetzt kannst du den Fernseher auch über die Sinric Pro App, Google Home und Alexa steuern.

### Fehlerbehebung
Mögliche Lösungen für dein Problem findest du auf unserer Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html).

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [433-MHz-RF-Geräte mit einem RF-Sender]({{ site.github.url }}/de/pages/tutorials/general/rf-transmitter-with-sinricpro.de.html)
- [Switch-Tutorial Teil 1: ein Relais ein- und ausschalten]({{ site.github.url }}/de/pages/tutorials/switch/part-1.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
