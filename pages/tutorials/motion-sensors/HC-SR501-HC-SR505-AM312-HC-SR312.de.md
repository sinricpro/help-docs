---
title: 'PIR-Bewegungsmelder mit ESP32 oder ESP8266 für Alexa: HC-SR501, HC-SR505, AM312'
layout: post
lang: de
description: Baue einen PIR-Bewegungsmelder mit einem ESP32, ESP8266 oder Pico W. Vergleicht HC-SR501 vs. HC-SR505 vs. AM312 (HC-SR312), mit Verdrahtung, Empfindlichkeitseinstellung und Code für Alexa.
---

In diesem Abschnitt bauen wir einen PIR-**Bewegungsmelder** mit **ESP32**, **ESP8266** oder **Raspberry Pi Pico W** und zeigen anschließend die Bewegungsänderungen über **Alexa oder SmartThings** an.

### Voraussetzungen : 

1. ESP32, ESP8266 oder Raspberry Pi Pico W x 1.
2. HC-SR501, HC-SR505, Mini AM312, HC-SR312 x 1.
3. Jumperkabel.

| PIR       | Betriebsspannung  | Verzögerungszeit | Sperrzeit | Auslösung       | Reichweite
| --------- | -------          |-------     |-------        |-------        |-------
| HC-SR312  |2,7-12V           | 2 Sekunden  | 2 Sekunden     | Wiederholbar    | 3-5 Meter
| HC-SR505  |4,5-20V           | 2 Sekunden  | 2 Sekunden     | Wiederholbar    | 3 Meter
| HC-SR501  |4,5-20V           | Einstellbar  | Einstellbar    | Einstellbar    | 3 Meter bis 7 Meter

### HC-SR501 vs. HC-SR505 vs. AM312 (HC-SR312): Welches Modul wählen?

Der HC-SR312 ist das Mini-PIR-Modul rund um den AM312-Sensor, die beiden Namen bezeichnen also dasselbe Bauteil.

- **HC-SR501**: das größte Modul und das einzige, das sich einstellen lässt. Es hat zwei Potentiometer (Empfindlichkeit und Verzögerungszeit) und einen Jumper für Einzel- oder Wiederholungsauslösung. Wähle es, wenn du eine größere Reichweite brauchst oder das Verhalten anpassen möchtest. Es benötigt mindestens 4,5 V, versorge es also über 5V / VIN.
- **HC-SR505**: ein kleines Modul mit festen Einstellungen. Es gibt nichts anzupassen. Auch dieses Modul braucht mindestens 4,5 V.
- **AM312 / HC-SR312**: das kleinste Modul, ebenfalls mit festen Einstellungen. Es läuft bereits ab 2,7 V und kann daher direkt über den **3,3V**-Pin versorgt werden. Das macht es zur besten Wahl für ESP32/ESP8266-Boards und batteriebetriebene Projekte.

Alle drei haben die gleichen drei Pins: **VCC**, **OUT** und **GND**. Die Pin-Reihenfolge unterscheidet sich je Modul, prüfe daher vor der Verdrahtung die Beschriftung auf der Platine. Für alle funktioniert der gleiche Code.

### Kurze Einführung zu PIR-Bewegungsmeldern

Passive Infrarot (PIR) Bewegungsmelder erkennen die Anwesenheit von Menschen oder Tieren, indem sie Änderungen der Infrarotstrahlung messen. PIR-Sensoren funktionieren, indem sie die Infrarotstrahlung erfassen, die alle Objekte mit einer Temperatur über dem absoluten Nullpunkt abgeben. Bewegt sich eine Person oder ein Tier in den Erfassungsbereich eines PIR-Sensors, registriert der Sensor eine Änderung der Infrarotstrahlung und löst einen Alarm oder eine andere Ausgabe aus. PIR-Sensoren sind eine vielseitige und kostengünstige Möglichkeit, Bewegung zu erkennen. Sie sind einfach zu nutzen und lassen sich an verschiedensten Orten einbauen.

Der Ausgang des PIR-Bewegungsmelders ist:

- ``HIGH``, wenn eine Bewegung erkannt wird.
- ``LOW``, wenn keine Bewegung erkannt wird.

Für genaue Messungen solltest du **abwarten, bis sich der PIR-Sensor richtig kalibriert hat; das dauert normalerweise 10 bis 60 Sekunden** nach dem Einschalten.  
 
Der HC-SR501 hat einstellbare Konfigurationen:

![Sinric Pro esp8266 HC-SR501 ]({{ site.github.url }}/public/img/sinric_pro_pir_sensor.png) 

###### Empfindlichkeitseinstellung

- Die Messdistanz liegt zwischen 3 und 7 Metern.

- Im Uhrzeigersinn drehen (nach rechts) - Verringert die Empfindlichkeit. Ganz nach rechts bis zu 3 Metern.

- Gegen den Uhrzeigersinn drehen (nach links) - Erhöht die Empfindlichkeit. Ganz nach links etwa 7 Meter.

###### Zeitverzögerungseinstellung

- Die Verzögerungszeit bestimmt, wie lange der Ausgang des HC-SR501 nach einer erkannten Bewegung ``HIGH`` bleibt. Sie lässt sich von 1 Sekunde bis etwa 5 Minuten einstellen.

- Im Uhrzeigersinn drehen (nach rechts) - Erhöht die Verzögerung. Ganz nach rechts bis zu 5 Minuten.

- Gegen den Uhrzeigersinn drehen (nach links) - Verringert die Verzögerung. Ganz nach links etwa 3 Sekunden.


###### Jumper-Einstellung

- **Einzelauslösungsmodus (L)**: Löst eine einzelne Bewegung aus. Das Verzögerungs-Potentiometer bestimmt, wie lange der Pin ``HIGH`` bleibt. Jede weitere Bewegungserkennung ist blockiert, bis der Pin auf ``LOW`` wechselt.

**Beispiel**: Die Verzögerungszeit des Bewegungsmelders ist auf 3 Sekunden eingestellt, aber er kann für etwa 6 Sekunden nach einer erkannten Bewegung keine weitere Bewegung erkennen.

![Sinric Pro esp8266 PIR Single Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_single_trigger.png) 

- **Mehrfachauslösungsmodus (H)**: Löst eine Serie von Bewegungen aus. Das Verzögerungs-Potentiometer bestimmt, wie lange der Pin ``HIGH`` bleibt. Im Mehrfachauslösungsmodus wird die Verzögerungszeit bei jeder erkannten Bewegung zurückgesetzt, sodass die weitere Erkennung nicht blockiert wird.
 
**Beispiel**: Die Verzögerungszeit beträgt 3 Sekunden. Nach einer erkannten Bewegung beginnt die Verzögerungszeit erneut. Nach Ablauf der Verzögerungszeit ist die Erkennung jedoch weiterhin für 3 Sekunden blockiert. Diese 3-sekündige Verzögerung lässt dem Sensor Zeit, sich zu „erholen“, bevor er wieder Bewegungen erkennt.

![Sinric Pro esp8266 PIR Multiple Trigger Mode]({{ site.github.url }}/public/img/sinric_pro_motion_pir_multi_trigger.png) 

### Verdrahtung

![Sinric Pro esp8266 PIR wiring]({{ site.github.url }}/public/img/sinric_pro_pir_sensor_wiring.png) 


| MCU       | PIR Pin     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    5 (D1)    |
| Pico W    |    GP5  |

Lass uns prüfen, ob der Bewegungsmelder korrekt verdrahtet ist und funktioniert. 

```cpp
#if defined(ESP8266)
  #define SENSOR_PIN        D1
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif

int newState;
int oldState;

void setup() {
  Serial.begin(9600);
  pinMode(SENSOR_PIN, INPUT);
  
  Serial.printf("Wait 10 secs for the PIR sensor to calibrate properly\r\n");
  delay(1000 * 10);
  oldState = digitalRead(SENSOR_PIN); // read the starting state
}

void loop() {
  newState = digitalRead(SENSOR_PIN); // read current state

  if(oldState != newState) {
    if (newState == HIGH) {
      Serial.println("Movement detected!");
    } else {
      Serial.println("Movement not detected!");
    }
    oldState = newState;
  }  
   delay(100);
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/bc5a7152c02e4e692ca9ae6708fe6814)


Der Serial Monitor der Arduino IDE zeigt die Bewegungserkennungen so an:

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/sinricpro-motion-sensor-demo.mp4" type="video/mp4">
</video>

 
### Schritt 1 : Neues Gerät in Sinric Pro anlegen

* [Melde dich](http://portal.sinric.pro) bei deinem Sinric Pro Konto an, öffne links das Menü **Devices** und klicke auf **Add Device** (oben links).
* Gib als Gerätenamen **Motion Sensor**, als Beschreibung **My Motion Sensor** ein und wähle als Gerätetyp **Motion Sensor**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric_pro_contact_motion_new_device.png)

* Klicke im Reiter Notifications auf **Next**

![Sinric Pro motion sensor device notifications]({{ site.github.url }}/public/img/sinric_pro_motion_sensor_notifications.png)

Hier kannst du die Schwellenwerte festlegen, um eine Push-Benachrichtigung über die Sinric Pro App zu erhalten, wenn tagsüber (**Daytime**) oder nachts (**Nighttime**) eine Bewegung erkannt wird. Mit der Retrigger Time legst du die Verzögerung zwischen den Push-Benachrichtigungen fest.

* Klicke auf den Reiter Others und klicke auf **Save**

* Die nächste Seite zeigt die Zugangsdaten, die dein Gerät für die Verbindung braucht.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Kopiere **Device Id**, **App Key** und **App Secret**. ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN!***

### Schritt 2 : Mit Sinric Pro verbinden 

#### Schritt 2.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Du kannst den **Code generieren** über die Funktion **Zero Code** oder ihn selbst schreiben. Wenn du keine Programmiererfahrung hast, empfehlen wir die Zero Code Funktion im Portal zu nutzen, um den Code zu erzeugen, herunterzuladen und zu flashen.

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
#include "SinricProMotionsensor.h" 

#define WIFI_SSID         ""   // Your WiFI SSID name 
#define WIFI_PASS         ""   // Your WiFi Password.
#define APP_KEY           ""   // Should look like "de0bxxxx-1x3x-4x3x-ax2x-5dabxxxxxxxx" (Get it from Portal -> Secrets)
#define APP_SECRET        ""   // Should look like "5f36xxxx-x3x7-4x3x-xexe-e86724a9xxxx-4c4axxxx-3x3x-x5xe-x9x3-333d65xxxxxx" (Get it from Portal -> Secrets)
#define MOTION_SENSOR_ID  ""   // Should look like "5dc1564130xxxxxxxxxxxxxx" (Get it from Portal -> Devices)
#define BAUD_RATE         115200              // Change baudrate to your need (used for serial monitor)
 
#if defined(ESP8266)
  #define SENSOR_PIN        D1
#elif defined(ESP32) 
  #define SENSOR_PIN        26
#elif (ARDUINO_ARCH_RP2040)
  #define SENSOR_PIN        5
#endif 

int newState;
int oldState;

void handleMotionSensor() {
  newState = digitalRead(SENSOR_PIN); // read current state

  if(oldState != newState) {
    if (newState == HIGH) {
      Serial.println("Movement detected!");
    } else {
      Serial.println("Movement not detected!");
    }

    // newState == true (HIGH) : if motion has been detected 
    // newState == false (LOW): if no motion has been detected

    SinricProMotionsensor &myMotionsensor = SinricPro[MOTION_SENSOR_ID]; // get motion sensor device
    myMotionsensor.sendMotionEvent(newState);

    oldState = newState;
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
 
// setup function for SinricPro
void setupSinricPro() {
  // add device to SinricPro
  SinricProMotionsensor &mySensor = SinricPro[MOTION_SENSOR_ID];
   
  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
  //SinricPro.restoreDeviceStates(true); // Uncomment to restore the last known state from the server.
  SinricPro.begin(APP_KEY, APP_SECRET);  
}

void setupMotionSensor() {
  pinMode(SENSOR_PIN, INPUT);
  Serial.printf("Wait 10 secs for the PIR sensor to calibrate properly\r\n");
  delay(1000 * 10);  
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  
  setupMotionSensor();
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
  handleMotionSensor();
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/f4fd3d769144689f15cfc80d783e8c94)

 
Jetzt solltest du die Bewegungen über Alexa, SmartThings ansehen können
  
![Sinric Pro motions via Alexa, SmartThings]({{ site.github.url }}/public/img/sinric_pro_contact_motion_home_alexa_smartthings.png)

über das Portal

![Sinric Pro Portal motion sensor]({{ site.github.url }}/public/img/sinric_pro_contact_motion_portal.png)

Bitte beachte, dass Google Home nicht unterstützt wird.

### Fehlerbehebung

1. Weitere Informationen findest du auf unserer Seite [Fehlerbehebung]({{ site.github.url }}/de/pages/troubleshooting.de.html).

 

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Tür- und Fensterkontaktsensor]({{ site.github.url }}/de/pages/tutorials/contact-sensors/contact.de.html)
- [Smarte Türklingel]({{ site.github.url }}/de/pages/tutorials/doorbell/doorbell.de.html)
- [Ansagen an Alexa senden]({{ site.github.url }}/de/pages/tutorials/general/how-to-send-announcements-to-alexa.de.html)

> Dieses Dokument ist Open Source. Hast du einen Tippfehler gefunden? Erstelle bitte ein [Issue](https://github.com/sinricpro/help-docs)