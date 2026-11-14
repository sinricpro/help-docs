---
title: Sinric Pro - IoT Cloud-Plattform für ESP8266, ESP32 und Raspberry Pi Pico W
layout: post
lang: de
description: Sinric Pro ist eine IoT-Cloud-Plattform für ESP8266, ESP32 und Raspberry Pi Pico W. Steuere deine Geräte mit Alexa, Google Home, einer App und einer API. 3 Geräte kostenlos.
---

Sinric Pro ist eine Cloud-Plattform, die deine DIY-IoT-Projekte Smart-Home-kompatibel macht. Du verbindest einen **ESP8266**, **ESP32** oder **Raspberry Pi Pico W** mit wenigen Zeilen Code und steuerst ihn per Sprachbefehl, mobiler App, Automationen oder eigener Software.

Du musst keinen Server betreiben, keine Ports an deinem Router öffnen und keinen Alexa Skill schreiben.

### Das bekommst du

| Funktion | Beschreibung |
| --- | --- |
| Sprachassistenten | Amazon Alexa und Google Home, über den offiziellen Sinric Pro Skill und die Action |
| Mobile App | Sinric Pro App für Android und iPhone/iPad |
| Smart-Home-Plattformen | Samsung SmartThings, [Homebridge (HomeKit)]({{ site.github.url }}/de/pages/homebridge.de.html), [Home Assistant]({{ site.github.url }}/de/pages/home-assistant.de.html), [IFTTT]({{ site.github.url }}/de/pages/ifttt.de.html), [Node-RED]({{ site.github.url }}/de/pages/node-red.de.html), [Apple Shortcuts]({{ site.github.url }}/de/pages/apple-shortcuts.de.html) |
| Integrierte Gerätetypen | Switch, Dimmer, Licht, Thermostat, TV, Lautsprecher, Schloss, Ventilator, Rollläden, Garagentor, Türklingel, Kamera sowie Temperatur-, Bewegungs-, Kontakt- und Luftqualitätssensoren |
| Benutzerdefinierte Gerätetypen | [Gerätevorlagen]({{ site.github.url }}/de/pages/custom-templates.de.html): per Drag and Drop eigene Gerätetypen erstellen und den Code generieren |
| Automationen | [Automationen]({{ site.github.url }}/de/pages/automations.de.html), erstellt per Drag and Drop |
| Push-Benachrichtigungen | Sende [Push-Benachrichtigungen]({{ site.github.url }}/pages/device-templates/capabilities/push-notification.html) von deinem Gerät an dein Smartphone |
| OTA-Updates | [Firmware-Updates über die Luft (OTA)]({{ site.github.url }}/de/pages/ota.de.html) ohne physischen Zugriff auf das Gerät |
| Lokale Steuerung | Die App steuert deine Geräte weiter über WLAN, [wenn das Internet ausfällt]({{ site.github.url }}/de/pages/local-control.de.html) |
| API | [REST API]({{ site.github.url }}/de/pages/api-guide.de.html), um eigene Apps und Integrationen zu bauen |

### Unterstützte Hardware

- **ESP8266** (NodeMCU, Wemos D1 mini, ESP-01 und andere)
- **ESP32** (einschließlich ESP32-S3 und ESP32 Kameras)
- **Raspberry Pi Pico W** (RP2040)
- **Arduino** UNO R4 WiFi, Nano 33 IoT, MKR WiFi 1010
- **Raspberry Pi** und jeder Computer, auf dem Python oder NodeJS läuft

SDKs sind verfügbar für Arduino (C++), ESP-IDF, MicroPython, Python und NodeJS. Siehe die [SDK-Liste]({{ site.github.url }}/).

### So funktioniert es

1. Lege ein Gerät im [Sinric Pro Portal](https://portal.sinric.pro) an und kopiere dessen Zugangsdaten.
2. Füge die Sinric Pro Bibliothek zu deinem Sketch hinzu und flashe dein Board.
3. Das Board verbindet sich mit Sinric Pro. Steuere es über die App, Alexa, Google Home oder die API.

```c++
#include <SinricPro.h>
#include <SinricProSwitch.h>

bool onPowerState(const String &deviceId, bool &state) {
  digitalWrite(RELAY_PIN, state ? HIGH : LOW);
  return true;
}

void setup() {
  // ... connect to Wi-Fi ...
  SinricProSwitch &mySwitch = SinricPro[SWITCH_ID];
  mySwitch.onPowerState(onPowerState);
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void loop() {
  SinricPro.handle();
}
```

Die vollständige Anleitung findest du unter [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html).

### Preise

- **Kostenloser Plan**: 3 Geräte. Keine Kreditkarte erforderlich.
- **Kostenpflichtige Pläne**: pro Gerät und Jahr, oder unbegrenzt viele Geräte zu einem festen Jahrespreis.

Die aktuellen Preise findest du unter [Pricing]({{ site.github.url }}/de/pages/pricing.de.html).

### Für Produkte und Unternehmen

Wenn du ein Produkt zum Verkauf entwickelst, bietet [Sinric Pro for Business]({{ site.github.url }}/de/pages/for-business.de.html) Geräte-Provisionierung, Gerätemanagement und OTA-Updates für den kommerziellen Einsatz.

### Loslegen

- [Kostenloses Konto erstellen](https://portal.sinric.pro/register)
- [Sinric Pro Bibliothek installieren]({{ site.github.url }}/de/pages/tutorials/general/install-sinricpro-library.de.html)
- [Schnellstart-Tutorials]({{ site.github.url }}/de/pages/quickstarts.de.html)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
