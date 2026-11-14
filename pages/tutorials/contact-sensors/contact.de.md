---
title: Kontaktsensor (MC-38) Tutorial für ESP8266, ESP32, Raspberry Pi Pico W
layout: post
lang: de
description: Baue einen Tür- und Fensterkontaktsensor mit einem MC-38 Reed-Schalter und einem ESP32, ESP8266 oder Raspberry Pi Pico W. Zeige den Öffnen/Schließen-Status in Alexa an.
---
 
In diesem Abschnitt zeigen wir dir, wie du mit einem **ESP32**, **ESP8266** oder **Raspberry Pi Pico W** einen Kontaktsensor (auch Türsensor, Einbruchsensor oder Fenstersensor genannt) baust und anschließend den Öffnen/Schließen-Status in Alexa, Google Home, SmartThings oder der Sinric Pro App anzeigst.

![Sinric Pro contact sensor tutorial]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_bg.jpg) 


### Voraussetzungen : 

1. ESP32, ESP8266 oder Raspberry Pi Pico W x 1.
2. Kontaktsensor (MC-38) x 1.
3. Jumper-Kabel.

### Kurze Einführung in den Kontaktsensor

Ein Kontaktsensor ist ein Gerät, das erkennt, ob eine Tür, ein Fenster oder ein anderes Objekt offen oder geschlossen ist. Ein Kontaktsensor besteht aus zwei Komponenten – einem Sensor und einem Magneten –, die verwendet werden, um den Status von Objekten wie Türen oder Fenstern zu bestimmen, also ob sie offen oder geschlossen sind. 
 
![Sinric Pro Contact Sensor Reed Switch Open Close]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_open_close.png) 

Der Sensor wird am Rahmen des Schiebefensters angebracht, während der Magnet am Fenster selbst befestigt wird. Wenn das Schiebefenster geschlossen ist, kommt der Magnet in die Nähe des Sensors und stellt eine Verbindung zwischen den beiden Komponenten her. Wird das Schiebefenster hingegen geöffnet, entfernt sich der Magnet vom Sensor und die Verbindung zwischen ihnen wird unterbrochen.

### Verdrahtung des Kontaktsensors

![Sinric Pro contact sensor wiring]({{ site.github.url }}/public/img/sinricpro_pi_contact_sensor_wiring.png) 

Hinweis: Wir verwenden INPUT_PULLUP, anstatt einen 10-kΩ-Widerstand zwischen dem Reed-Schalter und GND anzuschließen.


| MCU       | GPIO Pin     |
| --------- | ------- |
| ESP32     |    19   |
| ESP8266   |    4 (D2)  |
| Pico W    |    GP5  |

Lass uns prüfen, ob der Kontaktsensor richtig verdrahtet ist und funktioniert. 

 

```cpp
#if defined(ESP8266)
  #define SENSOR_PIN        D2
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif

int newState;
int oldState;

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT_PULLUP);

  oldState = digitalRead(SENSOR_PIN); // read the starting state
}

void loop() {
  newState = digitalRead(SENSOR_PIN); // read current state

  if(oldState != newState) {
    if (newState == HIGH) {
      Serial.println("Sliding window is open");
    } else {
      Serial.println("Sliding window is closed");
    }
    oldState = newState;
  }  
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/ce5b95c7618826005ef39bb1861cb6f1)


<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-contact-sensor-open-close.mp4" type="video/mp4">
</video>

### Schritt 1 : Einen neuen Kontaktsensor in Sinric Pro erstellen

* [Melde dich an](http://portal.sinric.pro) bei deinem Sinric Pro Konto, gehe links zum Menü **Devices** und klicke oben links auf **Add Device**.
* Gib den Gerätenamen **Front Door**, die Beschreibung **My Front Door** ein und wähle als Gerätetyp **Contact Sensor** aus.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_new_device.png)

* Klicke im Tab Notifications auf **Next**

![Sinric Pro contact sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_notifications.png)

Hier kannst du die Schalter für Open und Close aktivieren, um über die Sinric Pro App eine Push-Benachrichtigung zu erhalten, wenn sich der Status des Kontaktsensors zwischen **Open** und **Close** ändert.

* Klicke auf den Tab Others und dann auf **Save**

* Der nächste Bildschirm zeigt die Zugangsdaten, die du benötigst, um das gerade erstellte Gerät zu verbinden.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Kopiere die **Device Id**, den **App Key** und das **App Secret** ***Bewahre diese Werte sicher auf. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN !***

### Schritt 2 : Mit Sinric Pro verbinden 

#### Schritt 2.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)
 
Du kannst den **Code generieren** lassen, indem du die **Zero Code** Funktion nutzt, oder ihn selbst schreiben. Wenn du keine Programmiererfahrung hast, empfehlen wir dir, die Zero Code Funktion im Portal zu nutzen, um den Code zu generieren, herunterzuladen und zu flashen.

#### 2.2 Vollständiger Code


```cpp
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

#if defined(ESP8266)
  #define SENSOR_PIN        D2
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif

#include "SinricPro.h"
#include "SinricProContactsensor.h"

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define CONTACT_ID        ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)
#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)

int actualContactState;
int lastContactState;
 
void handleContactSensor() {
  actualContactState = digitalRead(SENSOR_PIN); // read current state
  // If inverted change to !digitalRead(SENSOR_PIN)

  if (actualContactState != lastContactState) {         // if state has changed
    Serial.printf("Contact Sensor is %s now\r\n", actualContactState ? "open":"closed");
    lastContactState = actualContactState;              // update last known state
    
    SinricProContactsensor &myContact = SinricPro[CONTACT_ID]; // get contact sensor device

    // actualContactState == true then contact is closed 
    // actualContactState == false then contact is open 
    myContact.sendContactEvent(!actualContactState);      // send event with actual state
  }
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
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/2a027cb56a1f7762454d492d9e928b83)

 
Jetzt solltest du den Kontaktstatus über Alexa, Google Home, SmartThings und die Sinric Pro App sehen können

![Sinric Pro Alexa Contact Sensor]({{ site.github.url }}/public/img/sinric_pro_contact_sensor_google_home_alexa_smartthings.jpg)
 
### Schritt 3 : Sprachansagen!

✅ So funktioniert's:

1️⃣ Füge in SinricPro einen Switch hinzu (dein geheimer Auslöser!)

2️⃣ Erstelle eine Alexa Routine, die deine Nachricht ausspricht, wenn „Someone is at the door!“, wenn der Switch eingeschaltet wird

3️⃣ Sende aus deinem Code ein Power-State-Event, um diesen Switch einzuschalten

```
void triggerVoiceAnnouncement() {
    SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
    mySwitch.sendPowerStateEvent(true);
}
``` 

### Fehlerbehebung
1. Weitere Details findest du auf unserer Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html).
 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [PIR-Bewegungsmelder (HC-SR501, HC-SR505, AM312)]({{ site.github.url }}/de/pages/tutorials/motion-sensors/HC-SR501-HC-SR505-AM312-HC-SR312.de.html)
- [Smarte Türklingel]({{ site.github.url }}/de/pages/tutorials/doorbell/doorbell.de.html)
- [Ankündigungen an Alexa senden]({{ site.github.url }}/de/pages/tutorials/general/how-to-send-announcements-to-alexa.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
