---
title: Ein Relais mit ESP32 oder ESP8266 über Alexa und Google Home steuern (Switch Tutorial Teil 1)
layout: post
lang: de
description: Steuere ein Relais mit einem ESP32, ESP8266 oder Raspberry Pi über Alexa, Google Home oder SmartThings. Verdrahtung, Code und Kontoverknüpfung.
---

In diesem Abschnitt bauen wir einen Sinric Pro **Switch** für **ESP32**, **ESP8266** oder **Raspberry Pi Zero W** und steuern ihn anschließend über **Alexa, Google Home oder SmartThings**.

### Voraussetzungen : 

1. ESP32, ESP8266 oder RaspPi W x 1.
2. SPDT Relaismodul x 1.
3. Jumperkabel.

![Sinric Pro esp8266 esp32 picow]({{ site.github.url }}/public/img/esp32-esp8266-picow.png) 
### Kurze Einführung zum Relais

Ein Relais ist ein elektrisch betätigter Schalter, der sich über ein Niederspannungssignal ein- oder ausschalten lässt. Wie ein normaler Schalter lässt es Strom fließen oder unterbricht ihn, kann aber mit einer deutlich geringeren Spannung angesteuert werden. Das macht Relais ideal für MCUs, wenn ein Hochspannungsstromkreis mit einem Niederspannungssignal gesteuert werden muss.

#### Wie es funktioniert

Die Arbeitsweise eines Relais kann je nach Hersteller, Verdrahtung und Typ des Relaismoduls unterschiedlich sein. Manche Relaismodule benötigen ein High-Signal vom MCU, um das Relais zu aktivieren, andere benötigen ein Low-Signal. Prüfe daher vor der Nutzung die technischen Daten des Relaismoduls, um sicherzustellen, dass es mit deinem MCU kompatibel ist.

**High-Signal**: Ein High-Signal ist ein Signal oberhalb eines bestimmten Spannungsschwellenwerts. Ein 5V-Relaismodul benötigt zum Beispiel ein Signal oberhalb von 3,3V, um das Relais zu aktivieren.

```c++
digitalWrite(pin, HIGH);
```

**Low-Signal**: Ein Low-Signal ist ein Signal unterhalb eines bestimmten Spannungsschwellenwerts. Ein 5V-Relaismodul benötigt zum Beispiel ein Signal unterhalb von 0,8V, um das Relais zu aktivieren.

```c++
digitalWrite(pin, LOW);
```

**Hochspannungsanschlüsse**
![High Voltage Connectors]({{ site.github.url }}/public/img/high_voltage_connectors.png) 


Das Relaismodul im Bild oben hat einen einzelnen Anschluss mit drei Kontakten: **Common (COM)**, **Normally Closed (NC)** und **Normally Open (NO)**.

**Common (COM)**: COM ist der gemeinsame Anschluss für NO und NC. Verbinde das Hochspannungsgerät mit dem COM-Pin.

**Normally Closed (NC)**: Der Stromkreis ist standardmäßig geschlossen.

**Normally Open (NO)**: Der Stromkreis ist standardmäßig offen.

Mit Normally Open (NO) und Normally Closed (NC) kannst du über einen Pin je nach Bedarf zwei separate Stromkreise steuern. Du könntest zum Beispiel einen Pin zur Steuerung einer Glühlampe und einen anderen zur Steuerung eines Motors verwenden. Ist der Pin high/low, schaltet die Glühlampe ein, andernfalls schaltet der Motor ein.

### Verdrahtung

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinric-pro-relay-esp32-switch.png) 

![Sinric Pro esp8266 relay wiring]({{ site.github.url }}/public/img/sinricpro-esp8266-relay-wired.png) 

| MCU       | Pin     |
| --------- | ------- |
| ESP32     |    16   |
| ESP8266   |    12 (D6)    |
| RaspPi W  |    6    |

Bevor wir die Verbindung zu Sinric Pro herstellen, solltest du prüfen, ob das Relais korrekt verdrahtet ist. Mit dem folgenden Code kannst du prüfen, ob sich das Relais alle 5 Sekunden ein- und ausschaltet.  


```cpp
#if defined(ESP8266)
  #define relay        12
#elif defined(ESP32) 
  #define relay        16
#elif (ARDUINO_ARCH_RP2040)
  #define relay        6
#endif

void setup() {
  Serial.begin(115200);
  pinMode(relay, OUTPUT);
}

void loop() {
  Serial.println("Writing HIGH ..");
  digitalWrite(relay, HIGH);
  delay(5000); 
  
  Serial.println("Writing LOW ..");
  digitalWrite(relay, LOW);
  delay(5000);
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/baf926bc8b0821f048fe53540e254212)


### Schritt 1 : Neues Gerät in Sinric Pro anlegen

* [Melde dich](http://portal.sinric.pro) bei deinem Sinric Pro Konto an, öffne links das Menü **Devices** und klicke auf **Add Device** (oben links).
* Gib als Gerätenamen **Switch**, als Beschreibung **My First Switch** ein und wähle als Gerätetyp **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Klicke im Reiter Notifications auf **Next**

![Sinric Pro online offline push notifications]({{ site.github.url }}/public/img/sinric_pro_switch_tutorial_device_notifications.png)

Um Push-Benachrichtigungen zu erhalten, wenn dein Gerät online oder offline geht, aktiviere die Option **„Connect and Disconnect“** in der Sinric Pro App. Um Push-Benachrichtigungen zu erhalten, wenn dein Gerät ein- oder ausgeschaltet wird, aktiviere die Option **„On and Off“**.


* Klicke auf Others und klicke auf **Save**

* Die nächste Seite zeigt die Zugangsdaten, die dein Gerät für die Verbindung braucht.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Kopiere **Device Id**, **App Key** und **App Secret**. ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN!***

### Schritt 2 : Programmierung 

#### 2.1 Sinric Pro Bibliothek installieren

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)


Du kannst den **Code generieren** über die Funktion **Zero Code** oder ihn selbst schreiben. Wenn du keine Programmiererfahrung hast, empfehlen wir die Zero Code Funktion im Portal zu nutzen, um den Code zu erzeugen, herunterzuladen und zu flashen.

#### 2.2 Vollständiger Code


```cpp
#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32) || defined(ARDUINO_ARCH_RP2040)
  #include <WiFi.h>
#endif

#include "SinricPro.h"
#include "SinricProSwitch.h"

#define WIFI_SSID         ""  // Change WIFI_SSID to your WiFi Name.
#define WIFI_PASS         ""  // Change WIFI_PASS to your WiFi password.
#define APP_KEY           ""  // Paste App Key from above 
#define APP_SECRET        ""  // Paste App Secret from above 
#define SWITCH_ID_1       ""  // Paste Device Id from  above

#if defined(ESP8266)
  #define RELAYPIN_1        12
#elif defined(ESP32) 
  #define RELAYPIN_1        16
#elif (ARDUINO_ARCH_RP2040)
  #define RELAYPIN_1        6
#endif

#define BAUD_RATE         115200                // Change baudrate to your need

bool onPowerState1(const String &deviceId, bool &state) {
 Serial.printf("Device 1 turned %s", state?"on":"off");
 digitalWrite(RELAYPIN_1, state ? HIGH:LOW);
 
 /* If your relay is activated with low signal, change the above to below code
  digitalWrite(RELAYPIN_1, state ? LOW : HIGH); */

 return true; // request handled properly
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

  Serial.printf("connected!\r\n[WiFi]: IP-Address is %s\r\n", WiFi.localIP().toString().c_str());
}

// setup function for SinricPro
void setupSinricPro() {
  // add devices and callbacks to SinricPro
  pinMode(RELAYPIN_1, OUTPUT);
    
  SinricProSwitch& mySwitch1 = SinricPro[SWITCH_ID_1];
  mySwitch1.onPowerState(onPowerState1);
    
  // setup SinricPro
  SinricPro.onConnected([](){ Serial.printf("Connected to SinricPro\r\n"); }); 
  SinricPro.onDisconnected([](){ Serial.printf("Disconnected from SinricPro\r\n"); });
   
  SinricPro.begin(APP_KEY, APP_SECRET);
}

// main setup function
void setup() {
  Serial.begin(BAUD_RATE); Serial.printf("\r\n\r\n");
  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}
```

[Diesen Code auf GitHub Gist ansehen](https://gist.github.com/kakopappa/0416a1f26b8398ce6dd9f71a6a70755a)

 
Jetzt solltest du das Relais wie im folgenden Video über das Portal steuern können. 

<video width="640" height="480" controls>
  <source src="{{ site.github.url }}/public/video/portal-relay-on-off.mp4" type="video/mp4">
</video>

### Schritt 3 : Verknüpfe den [Sinric Pro](https://www.amazon.com/dp/B07ZT5VDT8) Alexa Skill mit deinem Konto.

<div align="center">
  <table >
    <tr>
      <td>
        <p>&#x2022; Öffne deine Amazon Alexa App.</p>
        <p>&#x2022; Gehe zu Skills & Spiele.</p>
        <p>&#x2022; Suche nach <b>Sinric Pro</b>.</p>
        <p>&#x2022; Klicke auf ENABLE TO USE.</p>
        <p>&#x2022; Gib deine <b>Sinric Pro</b> Zugangsdaten auf der Verknüpfungsseite ein.</p>
        <p>&#x2022; Bitte Alexa, neue Geräte zu suchen.</p>
        <p>&#x2022; Bitte Alexa, den <b>Switch</b> einzuschalten</p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Schritt 4 : Verknüpfe die [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) Google Home Action mit deinem Konto.

<div align="center">
  <table >
    <tr>
      <td>
          <p>&#x2022; Öffne <b>Google Home</b> und klicke auf <b>Hinzufügen</b>. </p>
          <p>&#x2022; Wähle <b>Gerät einrichten</b></p>
          <p>&#x2022; Wähle <b>Mit Google Home kompatibel</b></p>
          <p>&#x2022; Suche nach <b>Sinric Pro</b>.</p>
          <p>&#x2022; Verknüpfe dein Konto. </p>
          <p>&#x2022; Neue Geräte suchen </p>
          <p>&#x2022; Bitte Google Home, den <b>Switch</b> einzuschalten</p>  
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div>

### Schritt 5 : Verknüpfe [Sinric Pro](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=en) SmartThings mit deinem Konto.

<div align="center">
  <table >
    <tr>
      <td>
           <p>&#x2022; Öffne die SmartThings App und tippe auf das <b>+</b> Symbol</p>
           <p>&#x2022; Wähle Gerät</p>
           <p>&#x2022; Wähle Sinric Pro unter <b>By Brand</b></p>
           <p>&#x2022; Verknüpfe dein Konto. </p>
           <p>&#x2022; Jetzt kannst du <b>Switch</b> über das Dashboard ein- oder ausschalten</p> 
      </td>
      <td> 
      </td>
    </tr>
  </table>
</div> 

Weiter geht es in [Teil 2]({{ site.github.url }}/de/pages/tutorials/switch/part-2.de.html) dieser Artikelserie, in dem du lernst, wie du einen Taster hinzufügst, um das Relais umzuschalten.


### Fehlerbehebung
Weitere mögliche Lösungen für dein Problem findest du auf unserer Seite [Fehlerbehebung]({{ site.github.url }}/de/pages/troubleshooting.de.html).

### Verwandte Tutorials

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Switch Tutorial Teil 2: das Relais mit einem Taster umschalten]({{ site.github.url }}/de/pages/tutorials/switch/part-2.de.html)
- [Switch Tutorial Teil 3: mehrere Relais und Taster]({{ site.github.url }}/de/pages/tutorials/switch/part-3.de.html)
- [Relais mit MicroPython auf ESP32]({{ site.github.url }}/de/pages/tutorials/switch/micropython/how-to-turn-on-and-off-a-relay-using-micropython.de.html)
- [Dimmbarer Schalter mit einem RobotDyn AC-Dimmer]({{ site.github.url }}/de/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.de.html)

> Dieses Dokument ist Open Source. Hast du einen Tippfehler gefunden? Erstelle bitte ein [Issue](https://github.com/sinricpro/help-docs)