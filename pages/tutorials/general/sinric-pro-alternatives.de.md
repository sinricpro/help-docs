---
title: Sinric Pro Alternativen - Wie Sinric Pro im Vergleich abschneidet
layout: post
lang: de
description: Vergleiche Sinric Pro mit den Alternativen zur Sprachsteuerung eines ESP32 oder ESP8266 - Espalexa und fauxmoESP, Tasmota, ESPHome mit Home Assistant, andere IoT-Clouds und ein eigener Alexa Skill.
---

Es gibt mehrere Wege, einen ESP32 oder ESP8266 per Alexa, Google Home oder Smartphone zu steuern. Diese Seite beschreibt die wichtigsten Ansätze, wofür jeder gut geeignet ist und wo Sinric Pro einzuordnen ist.

### Die Optionen im Überblick

| Ansatz | Beispiele | Du betreibst einen Server | Funktioniert außerhalb des Heimnetzes | Am besten für |
| --- | --- | --- | --- | --- |
| Smart-Home-Cloud für DIY-Geräte | Sinric Pro | Nein | Ja | Sprachsteuerung und eine App mit wenig Einrichtungsaufwand |
| Lokale Geräteemulation | Espalexa, fauxmoESP | Nein | Nein | Einen schnellen Alexa-Test im eigenen Netzwerk |
| Open-Source-Firmware | Tasmota | Optional | Mit zusätzlichem Aufwand | Umflashen fertiger Geräte, lokale Steuerung |
| Selbst betriebenes Smart Home | ESPHome mit Home Assistant | Ja | Mit zusätzlichem Aufwand | Ein vollständig lokales Zuhause, das du selbst verwaltest |
| Allgemeine IoT-Dashboards | Blynk, Arduino Cloud | Nein | Ja | Dashboards, Diagramme und Daten von Sensoren |
| Eigener Skill und eigenes Backend | Alexa Smart Home Skill mit eigenem Cloud-Backend | Ja | Ja | Volle Kontrolle, wenn du die Zeit zum Aufbau hast |

### Lokale Geräteemulation (Espalexa, fauxmoESP)

Diese Bibliotheken lassen das Board in deinem WLAN wie eine Philips Hue Bridge oder einen Belkin WeMo Switch erscheinen. Es gibt kein Konto und keine Cloud.

- Funktioniert nur mit Alexa, und nur im gleichen Netzwerk.
- Unterstützt eine kleine Auswahl an Gerätetypen (Ein/Aus, Helligkeit, Farbe).
- Die Erkennung hängt vom Echo-Modell und deinem Router ab. Siehe [Espalexa oder fauxmoESP „Device Not Found“?]({{ site.github.url }}/de/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.de.html)

### Open-Source-Firmware (Tasmota)

Tasmota ist eine fertige Firmware, die du konfigurierst statt eigenen Code zu schreiben. Sie wird lokal über die Weboberfläche, HTTP oder MQTT gesteuert. Auch die Alexa-Unterstützung nutzt hier Hue- und WeMo-Emulation.

Wähle diesen Weg, wenn du einen vorhandenen Smart Plug oder eine Lampe umflashen und alles im eigenen Netzwerk behalten möchtest.

### Selbst betriebenes Smart Home (ESPHome mit Home Assistant)

ESPHome erzeugt Firmware aus einer Konfigurationsdatei, und Home Assistant ist der Server, der die Geräte steuert. Alles kann lokal auf deiner eigenen Hardware laufen.

Wähle diesen Weg, wenn du ein vollständig lokales Setup möchtest und bereit bist, einen Server zu betreiben und zu pflegen. Sprachassistenten und der Zugriff von außerhalb deines Zuhauses benötigen zusätzliche Einrichtung oder ein Abonnement.

Sinric Pro und Home Assistant lassen sich auch zusammen nutzen: siehe die [Home Assistant Integration]({{ site.github.url }}/de/pages/home-assistant.de.html).

### Allgemeine IoT-Dashboards (Blynk, Arduino Cloud)

Diese Plattformen konzentrieren sich auf Dashboards: Widgets, Diagramme und Daten deiner Geräte auf dem Smartphone oder im Web. Ihre Gerätelimits, Preise und die Unterstützung von Sprachassistenten unterscheiden sich und ändern sich mit der Zeit, daher solltest du die aktuellen Details auf der jeweiligen Website prüfen.

Wähle eine dieser Plattformen, wenn es bei deinem Projekt hauptsächlich um das Überwachen und Visualisieren von Daten geht.

### Dein eigener Alexa Skill und Backend

Du kannst selbst einen Alexa Smart Home Skill mit eigenem Cloud-Backend, eigener Kontoverknüpfung und Geräteanbindung bauen. Das gibt dir volle Kontrolle. Es ist aber auch der größte Aufwand, und du musst das Backend selbst betreiben.

Wenn du das für ein kommerzielles Produkt möchtest, ohne das Backend selbst zu bauen, siehe [Sinric Pro für Unternehmen]({{ site.github.url }}/de/pages/for-business.de.html).

### Wo Sinric Pro passt

Sinric Pro ist für genau eine Aufgabe gebaut: ein DIY-Gerät wie ein Smart-Home-Produkt verhalten zu lassen.

- **Offizielle Sprachintegrationen**: ein Alexa Smart Home Skill und eine Google Home Action, also keine Emulation und kein eigener Skill, den du schreiben musst.
- **Viele Gerätetypen**: Schalter, Lampen, Thermostate, Fernseher, Schlösser, Lüfter, Jalousien, Kameras und Sensoren, zusätzlich [benutzerdefinierte Gerätetypen]({{ site.github.url }}/de/pages/custom-templates.de.html).
- **Kein eigener Server**: Das Board verbindet sich nach außen zu Sinric Pro, es ist also keine Portfreigabe nötig.
- **Mehr als nur Sprache**: Mobile App, [Automationen]({{ site.github.url }}/de/pages/automations.de.html), Push-Benachrichtigungen, [OTA-Updates]({{ site.github.url }}/de/pages/ota.de.html), eine [API]({{ site.github.url }}/de/pages/api-guide.de.html) sowie Integrationen mit SmartThings, HomeKit (Homebridge), Home Assistant, IFTTT und Node-RED.
- **Lokale Steuerung**: Die App funktioniert weiterhin über WLAN, [wenn das Internet ausfällt]({{ site.github.url }}/de/pages/local-control.de.html).
- **Kostenloser Einstieg**: 3 Geräte im kostenlosen Tarif. Siehe [Preise]({{ site.github.url }}/de/pages/pricing.de.html).

### Wann eine andere Option besser passt

- Du möchtest **überhaupt keine Cloud**, auch nicht für die Sprachsteuerung: Nutze ESPHome mit Home Assistant oder Tasmota.
- Du brauchst nur **Alexa im eigenen Netzwerk** für einen schnellen Test: Espalexa oder fauxmoESP können dafür ausreichen.
- Du möchtest hauptsächlich **Diagramme und Dashboards** für Sensordaten: Schau dir eine Dashboard-Plattform an.

### Sinric Pro ausprobieren

- [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html)
- [Sinric Pro als IoT-Plattform für ESP8266 und ESP32]({{ site.github.url }}/de/pages/tutorials/general/iot-platform-esp8266-esp32.de.html)
- [Kostenloses Konto erstellen](https://portal.sinric.pro/register)

> Dieses Dokument ist Open Source. Hast du einen Tippfehler gefunden? Erstelle bitte ein [Issue](https://github.com/sinricpro/help-docs)