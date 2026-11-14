---
title: ESP32 oder ESP8266 mit Alexa und Google Home steuern
layout: post
lang: de
locale: de_DE
description: ESP32 oder ESP8266 mit Amazon Alexa und Google Home verbinden. Schritt-für-Schritt-Anleitung mit Arduino-Code für Sinric Pro, ohne eigenen Alexa Skill und ohne Portfreigabe.
---

Diese Anleitung zeigt, wie du einen **ESP32** oder **ESP8266** (NodeMCU, Wemos D1 mini) mit **Amazon Alexa** und **Google Home** verbindest, damit du ein Relais, eine Lampe oder einen anderen Ausgang per Sprache ein- und ausschalten kannst.

Du musst keinen eigenen Alexa Skill und keine Google Home Action schreiben, und du musst keine Ports an deinem Router freigeben.

### So funktioniert es

![Sinric Pro esp8266 esp32 picow]({{ site.github.url }}/public/img/esp32-esp8266-picow.png)

1. Auf deinem ESP32 oder ESP8266 läuft die Sinric Pro Bibliothek. Sie hält eine sichere Verbindung zum Sinric Pro Server offen.
2. Du verknüpfst den **Sinric Pro** Alexa Skill oder die Google Home Action einmalig mit deinem Sinric Pro Konto.
3. Wenn du *„Alexa, schalte den Schalter ein“* sagst, sendet Alexa den Befehl an Sinric Pro, und Sinric Pro leitet ihn an dein Board weiter.

Da das Board die Verbindung zum Server selbst aufbaut, funktioniert das von überall und in jedem Heimnetz.

Sinric Pro ist ein offizieller Alexa Smart Home Skill und eine offizielle Google Home Action. Es wird kein Gerät emuliert. Wenn du von Espalexa oder fauxmoESP kommst, lies [Espalexa oder fauxmoESP „Device Not Found“?]({{ site.github.url }}/de/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.de.html).

### Was du brauchst

1. Ein ESP32 oder ESP8266 Entwicklungsboard.
2. Ein Relaismodul oder eine LED zum Schalten.
3. Arduino IDE oder PlatformIO.
4. Ein kostenloses [Sinric Pro Konto](https://portal.sinric.pro/register). Die Grenzen des kostenlosen Tarifs stehen unter [Preise]({{ site.github.url }}/de/pages/pricing.de.html).

### Schritt 1: Gerät in Sinric Pro anlegen

* [Melde dich](https://portal.sinric.pro) bei deinem Sinric Pro Konto an, öffne links das Menü **Devices** und klicke auf **Add Device**.
* Gib als Gerätenamen **Switch** und als Beschreibung **My First Switch** ein und wähle den Gerätetyp **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Klicke auf **Save**.
* Die nächste Seite zeigt die Zugangsdaten, die dein Gerät für die Verbindung braucht.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Kopiere **Device Id**, **App Key** und **App Secret**. ***Halte diese Werte geheim. TEILE SIE NICHT IN ÖFFENTLICHEN FOREN!***

Der Gerätename ist das, was du zu Alexa oder Google Home sagst. Wähle also einen Namen, der sich leicht aussprechen lässt.

### Schritt 2: Sinric Pro Bibliothek installieren

Öffne in der Arduino IDE **Werkzeuge > Bibliotheken verwalten**, suche nach **SinricPro** und klicke auf **Installieren**.

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

PlatformIO, Abhängigkeiten und häufige Fehler: [How to install the Sinric Pro library]({{ site.github.url }}/de/pages/tutorials/general/install-sinricpro-library.de.html).

### Schritt 3: Code hochladen

Derselbe Sketch läuft auf ESP32 und ESP8266. Trage deine WLAN-Daten und die drei Werte aus Schritt 1 ein.

```c++
#include <Arduino.h>
#if defined(ESP8266)
  #include <ESP8266WiFi.h>
#elif defined(ESP32)
  #include <WiFi.h>
#endif

#include <SinricPro.h>
#include <SinricProSwitch.h>

#define WIFI_SSID   "YOUR-WIFI-SSID"
#define WIFI_PASS   "YOUR-WIFI-PASSWORD"
#define APP_KEY     "YOUR-APP-KEY"
#define APP_SECRET  "YOUR-APP-SECRET"
#define SWITCH_ID   "YOUR-DEVICE-ID"

#if defined(ESP8266)
  #define RELAY_PIN 12   // D6
#elif defined(ESP32)
  #define RELAY_PIN 16
#endif

// called when Alexa, Google Home or the Sinric Pro app turns the switch on or off
bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Device %s turned %s\r\n", deviceId.c_str(), state ? "on" : "off");
  digitalWrite(RELAY_PIN, state ? HIGH : LOW);
  return true; // request handled
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(".");
  }

  SinricProSwitch &mySwitch = SinricPro[SWITCH_ID];
  mySwitch.onPowerState(onPowerState);

  SinricPro.begin(APP_KEY, APP_SECRET);
}

void loop() {
  SinricPro.handle();
}
```

Wenn du keinen Code schreiben möchtest, kann die Funktion **Zero Code** im Portal den Sketch für dich erzeugen.

Sobald das Board verbunden ist, erscheint das Gerät im [Portal](https://portal.sinric.pro) als online und lässt sich dort ein- und ausschalten. Die Verdrahtung eines Relais zeigt [Switch Tutorial Part 1]({{ site.github.url }}/de/pages/tutorials/switch/part-1.de.html).

### Schritt 4: Mit Amazon Alexa verbinden

* Öffne die Amazon Alexa App.
* Gehe zu **Skills und Spiele**.
* Suche nach [**Sinric Pro**](https://www.amazon.de/dp/B07ZT5VDT8).
* Tippe auf **ZUR VERWENDUNG AKTIVIEREN**.
* Gib auf der Verknüpfungsseite deine Sinric Pro Zugangsdaten ein.
* Bitte Alexa, neue Geräte zu suchen: *„Alexa, suche neue Geräte“*.
* Sage *„Alexa, schalte Switch ein“*.

Mehr zu Gerätesuche, Routinen und Fehlerbehebung: [Amazon Alexa]({{ site.github.url }}/de/pages/alexa.de.html).

### Schritt 5: Mit Google Home verbinden

* Öffne **Google Home** und tippe auf **Add** (Hinzufügen).
* Wähle **Setup Device** (Gerät einrichten).
* Wähle **Works with Google Home**.
* Suche nach [**Sinric Pro**](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=de).
* Verknüpfe dein Konto.
* Sage *„Hey Google, schalte Switch ein“*.

Die Bezeichnungen in der App können je nach Sprache leicht abweichen.

Mehr: [Google Home]({{ site.github.url }}/de/pages/google-home.de.html).

### Samsung SmartThings

* Öffne die SmartThings App und tippe auf das **+** Symbol.
* Wähle **Gerät**.
* Wähle unter den Marken **Sinric Pro**.
* Verknüpfe dein Konto.
* Jetzt kannst du **Switch** über das Dashboard ein- und ausschalten.

Mehr: [Samsung SmartThings]({{ site.github.url }}/de/pages/smartthings.de.html).

### Was kannst du noch bauen?

Ein Schalter ist nur der Anfang. Dieselben Schritte gelten für andere Gerätetypen:

- [Dimmbares Licht mit RobotDyn AC Dimmer]({{ site.github.url }}/de/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.de.html)
- [RGB LED Streifen]({{ site.github.url }}/de/pages/tutorials/light/LED-Stripe-5050.de.html)
- [Temperatursensor (DHT11, DHT22)]({{ site.github.url }}/de/pages/tutorials/temperature-sensors/DHTx_AMx_RHTx.de.html)
- [Bewegungsmelder]({{ site.github.url }}/de/pages/tutorials/motion-sensors/HC-SR501-HC-SR505-AM312-HC-SR312.de.html)
- [Kontaktsensor (Tür / Fenster)]({{ site.github.url }}/de/pages/tutorials/contact-sensors/contact.de.html)
- [Türklingel]({{ site.github.url }}/de/pages/tutorials/doorbell/doorbell.de.html)
- [TV-Fernbedienung mit IR-Transceiver]({{ site.github.url }}/de/pages/tutorials/tv/ir-transceiver-esp8285.de.html)
- [Alle Schnellstart-Tutorials]({{ site.github.url }}/de/pages/quickstarts.de.html)

### Häufige Fragen

**Muss ich einen eigenen Alexa Skill erstellen?**

Nein. Du aktivierst den vorhandenen Sinric Pro Skill und verknüpfst dein Konto.

**Funktioniert es auch mit anderen Boards als ESP32 und ESP8266?**

Ja. Es gibt SDKs für Raspberry Pi Pico W, Arduino UNO R4 WiFi, Nano 33 IoT, MKR WiFi 1010, MicroPython, Python und NodeJS. Siehe die [SDK-Liste]({{ site.github.url }}/).

**Kann ich mehr als ein Gerät mit einem Board steuern?**

Ja. Ein ESP32 oder ESP8266 kann mehrere Sinric Pro Geräte bereitstellen, zum Beispiel eine 4-Kanal-Relaisplatine. Siehe [Modules]({{ site.github.url }}/de/pages/modules.de.html) und [Teil 3 des Switch-Tutorials]({{ site.github.url }}/de/pages/tutorials/switch/part-3.de.html).

**Kann ich es mit Apple HomeKit oder Home Assistant verwenden?**

Ja. Siehe [Homebridge (HomeKit)]({{ site.github.url }}/de/pages/homebridge.de.html) und [Home Assistant]({{ site.github.url }}/de/pages/home-assistant.de.html).

### Fehlerbehebung

Mögliche Lösungen findest du auf der Seite [Troubleshooting]({{ site.github.url }}/de/pages/troubleshooting.de.html).

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
