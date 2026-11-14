---
title: Module
weight: 4
lang: de
description: Was ein Modul in Sinric Pro ist und wie ein einzelnes ESP32- oder ESP8266-Board mehrere Geräte beherbergen kann.
---

### Einführung 

Ein Modul ist bei SinricPro eine eigenständige physische Einheit, zum Beispiel ein ESP32-Entwicklungsboard. Module übernehmen verschiedene Aufgaben, vor allem rund um Konnektivität und Kommunikation, etwa das Aufbauen und Aufrechterhalten der WLAN-Verbindung. **Ein einzelnes Modul kann ein oder mehrere virtuelle SinricPro Geräte beherbergen**.

![what is a module]({{ site.github.url }}/public/img/sinricpro-what-is-a-module.png) 

Das heißt, ein einziges physisches Board kann mehrere Smart-Home-Geräte verwalten und steuern, die im SinricPro Ökosystem und auf angebundenen Plattformen wie Amazon Alexa oder Google Home jeweils einzeln erscheinen. Ein ESP32-Modul könnte zum Beispiel mehrere Relais steuern, von denen jedes in SinricPro ein eigenes „Switch“-Gerät darstellt.

Ein Modul kannst du nicht wie ein virtuelles Gerät anlegen. Sobald du ein Entwicklungsboard verbindest, erscheint es im Portal.

SinricPro bietet die folgenden Modulfunktionen

 1. [Primäres oder sekundäres WLAN festlegen](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Settings)
 
 2. [WLAN-Zustand prüfen](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Health)

 3. [Feste IP festlegen](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples/Settings)

 4. [OTA](https://help.sinric.pro/pages/ota)
 
