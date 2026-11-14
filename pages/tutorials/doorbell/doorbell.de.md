---
title: Smarte Türklingel mit ESP32, ESP8266 oder Raspberry Pi Pico W für Alexa, Google Home
layout: post
youtubeId: H-iftzWVTXE
youtubeId2: HEMifE1Xm7E
lang: de
description: Baue eine smarte Türklingel mit einem Taster und einem ESP32, ESP8266 oder Raspberry Pi Pico W. Erhalte Benachrichtigungen in Alexa, Google Home und der Sinric Pro App.
---

In diesem Abschnitt zeigen wir dir, wie du eine **Türklingel** mit einem Taster baust, der an einen **ESP32**, **ESP8266** oder **Raspberry Pi Pico W** angeschlossen ist, und wie du dann eine Benachrichtigung in Alexa, Google Home oder der Sinric Pro App erhältst.

### Voraussetzungen : 

1. ESP32, ESP8266 oder Raspberry Pi Pico W x 1.
2. Taster x 1.
3. 1K ~ 10K Widerstand x 1
3. Jumperkabel.

### Verdrahtung des Türklingel-Tasters

Wir verdrahten den Taster nach dem Pull-Down-Prinzip. Wird der Taster gedrückt, liest digitalRead ein HIGH-Signal (1).

![Sinric Pro doorbell push button wiring diagram]({{ site.github.url }}/public/img/sinricpro_pi_doorbell-wiring-diagram.png) 

| MCU       | GPIO Pin     |
| --------- | ------- |
| ESP32     |    34   |
| ESP8266   |    4 (D2)  |
| Pico W    |    7    |

### Tasterzustand auslesen

Prüfen wir, ob der Sensor richtig verdrahtet ist und funktioniert. 


```cpp
#if defined(ESP8266)
  #define BUTTON_PIN        D4
#elif defined(ESP32) 
  #define BUTTON_PIN        34
#elif (ARDUINO_ARCH_RP2040)
  #define BUTTON_PIN        7
#endif

int button_state;
int lastbutton_state = LOW;

unsigned long last_debounce_time = 0;
unsigned long debounce_delay = 50; // increase if needed.

void setup() {
  Serial.begin(115200);	
  pinMode(BUTTON_PIN, INPUT);
}

void handle_button_press() {
  int reading = digitalRead(BUTTON_PIN);  
  if (reading != lastbutton_state) {
    last_debounce_time = millis();
  }

  if ((millis() - last_debounce_time) > debounce_delay) {
    if (reading != button_state) {
      button_state = reading;
      
      if (button_state == HIGH) {
        Serial.printf("Pressed!\r\n");
      }
    }
  }
  
  lastbutton_state = reading;
}

void loop() {
  handle_button_press();
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/b8db56b3315c83be6bda1069e9b6a5c8)


![Sinric Pro pull-down arduino serial monitor]({{ site.github.url }}/public/img/sinricpro-pushbutton-pull-down.png)

### Schritt 1 : Mit Sinric Pro verbinden 

#### Ein neues Gerät anlegen: doorbell

* [Melde dich an](http://portal.sinric.pro) bei deinem Sinric Pro Konto und gehe links im Menü zu **Devices**.

* Klicke oben links auf **Add Device**.

* Gib den Gerätenamen **doorbell**, die Beschreibung **smart doorbell** ein und wähle als Typ **Doorbell**.

* Klicke auf **Save**, um das Gerät anzulegen

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinricpro-doorbell-create-device.png)

Sobald du auf Speichern klickst, erkennt Amazon Alexa das soeben erstellte Gerät automatisch (sofern du unseren Alexa Skill bereits verknüpft hast).

![Sinric Pro alexa doorbell notification]({{ site.github.url }}/public/img/sinricpro_alexa_doorbell_push_notification.jpg)

Erhältst du die Push-Benachrichtigung nicht, bitte Alexa einfach, nach Geräten zu suchen

#### Schritt 1.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Vollständiger Code


```cpp
// Uncomment the following line to enable serial debug output
//#define ENABLE_DEBUG

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif 

#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32) || defined(ARDUINO_ARCH_RP2040)
  #include <WiFi.h>
#endif

#include "SinricPro.h"
#include "SinricProDoorbell.h"

// Grab it from https://portal.sinric.pro.
#define APP_KEY    "" //Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx"
#define APP_SECRET "" //Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx"
#define DOORBELL_ID  "" //Should look like "6534xxxxxxxc08c6ea1b"

#define SSID       "" // Your WiFi SSID
#define PASS       "" // Your WiFi Password 

#define BAUD_RATE         115200                // Change baudrate to your need

#if defined(ESP8266)
  #define BUTTON_PIN        D4
#elif defined(ESP32) 
  #define BUTTON_PIN        34
#elif (ARDUINO_ARCH_RP2040)
  #define BUTTON_PIN        7
#endif

int button_state;
int lastbutton_state = LOW;

unsigned long last_debounce_time = 0;
unsigned long debounce_delay = 50; // increase if needed.
SinricProDoorbell& myDoorbell = SinricPro[DOORBELL_ID];

void handleButtonPress() {
  int reading = digitalRead(BUTTON_PIN);  
  if (reading != lastbutton_state) {
    last_debounce_time = millis();
  }

  if ((millis() - last_debounce_time) > debounce_delay) {
    if (reading != button_state) {
      button_state = reading;
      
      if (button_state == HIGH) {
        Serial.printf("[handleButtonPress()]: Button pressed!\r\n");
        bool success = myDoorbell.sendDoorbellEvent();
        if(!success) {
          Serial.printf("[handleButtonPress()]: Something went wrong...could not send Event to server!\r\n");
        }        
      }
    }
  }
  
  lastbutton_state = reading;
}
 
void setupWiFi() {
  Serial.printf("\r\n[setupWiFi()]: Connecting");

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
  Serial.printf("connected!\r\n[setupWiFi()]: IP-Address is %d.%d.%d.%d\r\n", localIP[0], localIP[1], localIP[2], localIP[3]);
}
 
void setupSinricPro() {
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setupButton() {
  pinMode(BUTTON_PIN, INPUT);
}

void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupButton();
  setupWiFi();
  setupSinricPro();
}

void loop() {
  handleButtonPress();
  SinricPro.handle();
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/f5853e57b534d08fbc1df2d299c71265)


**Hinweis:** **Alexa Türklingel-Benachrichtigungen sind standardmäßig deaktiviert**. Du musst sie aktivieren, indem du die App öffnest, damit du die DingDong-Benachrichtigung in Alexa erhältst.

![Sinric Pro Alexa enable doorbell notification settings]({{ site.github.url }}/public/img/sinricpro-alexa-doorbell-settings.jpg)

{% include youtubePlayer.html id=page.youtubeId %}

{% include youtubePlayer.html id=page.youtubeId2 %}

### Fehlerbehebung

- Taster reagiert zu empfindlich? Du kannst `debounce_delay` anpassen oder die vorgeschlagene Lösung in [issues/346](https://github.com/sinricpro/esp8266-esp32-sdk/issues/346) ausprobieren

- Mögliche Lösungen für dein Problem findest du auf unserer Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html).

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Tür- und Fensterkontaktsensor]({{ site.github.url }}/de/pages/tutorials/contact-sensors/contact.de.html)
- [PIR-Bewegungsmelder (HC-SR501, HC-SR505, AM312)]({{ site.github.url }}/de/pages/tutorials/motion-sensors/HC-SR501-HC-SR505-AM312-HC-SR312.de.html)
- [Raspberry Pi WebRTC Kamera]({{ site.github.url }}/de/pages/tutorials/camera/raspberrypi-webrtc-alexa-googlehome-camera.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
