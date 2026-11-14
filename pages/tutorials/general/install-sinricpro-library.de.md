---
title: So installierst du die Sinric Pro Bibliothek (SinricPro.h) in der Arduino IDE und PlatformIO
layout: post
lang: de
description: 'Installiere die Sinric Pro Bibliothek (SDK) für ESP32, ESP8266 und Raspberry Pi Pico W in der Arduino IDE oder PlatformIO und behebe den Fehler "SinricPro.h: No such file or directory".'
---

Die Sinric Pro Bibliothek (auch Sinric Pro SDK genannt) verbindet deinen **ESP32**, **ESP8266** oder **Raspberry Pi Pico W (RP2040)** mit Sinric Pro. Diese Seite zeigt, wie du sie installierst und wie du die häufigsten Installationsfehler behebst.

Die Bibliothek ist Open Source: [github.com/sinricpro/esp8266-esp32-sdk](https://github.com/sinricpro/esp8266-esp32-sdk)

### Installation in der Arduino IDE

1. Öffne den Bibliotheksverwalter: **Werkzeuge > Bibliotheken verwalten**.
2. Suche nach **SinricPro** und klicke auf **Installieren**.
3. Wenn die Arduino IDE fragt, ob die Abhängigkeiten installiert werden sollen, wähle **Alle installieren**. Fragt sie nicht danach, installiere sie auf demselben Weg:
   - **ArduinoJson** von Benoit Blanchon (Version 7.0.3 oder neuer)
   - **WebSockets** von Markus Sattler (Version 2.4.0 oder neuer)
4. Öffne ein Beispiel: **Datei > Beispiele > SinricPro**.

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Die Bibliothek benötigt außerdem das Board-Paket (Arduino Core) für dein Board: **esp32**, **esp8266** oder **Raspberry Pi Pico/RP2040**.

### Installation in PlatformIO (VS Code)

Füge `sinricpro/SinricPro` zu `lib_deps` in deiner `platformio.ini` hinzu. PlatformIO lädt die Bibliothek und ihre Abhängigkeiten beim nächsten Build herunter.

```ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
lib_deps = sinricpro/SinricPro

[env:nodemcuv2]
platform = espressif8266
board = nodemcuv2
framework = arduino
lib_deps = sinricpro/SinricPro
```

Eine vollständige `platformio.ini` findest du [hier](https://github.com/sinricpro/esp8266-esp32-sdk/blob/master/examples/platformio/platformio.ini).

### Herunterladen und manuell installieren

1. Lade die neueste Version als ZIP-Datei von den [GitHub Releases](https://github.com/sinricpro/esp8266-esp32-sdk/releases) herunter.
2. Wähle in der Arduino IDE **Sketch > Include Library > Add .ZIP Library** und wähle die Datei aus.
3. Installiere ArduinoJson und WebSockets über den Bibliotheksverwalter.

### Die Bibliothek in deinem Sketch verwenden

```c++
#include <SinricPro.h>
#include <SinricProSwitch.h>
```

`SinricPro.h` ist die Haupt-Header-Datei. Jeder Gerätetyp hat seine eigene Header-Datei, zum Beispiel `SinricProSwitch.h`, `SinricProLight.h` oder `SinricProTemperaturesensor.h`. Die [Beispiele](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples) zeigen alle Gerätetypen, die vollständige [SDK-Dokumentation](https://sinricpro.github.io/esp8266-esp32-sdk-documentation/) findest du dort ebenfalls.

Einen vollständigen ersten Sketch findest du unter [ESP32 oder ESP8266 mit Alexa und Google Home steuern]({{ site.github.url }}/de/pages/tutorials/general/esp32-esp8266-alexa-google-home.de.html).

### Fehlerbehebung

**fatal error: SinricPro.h: No such file or directory**

Die Bibliothek ist für die IDE, mit der du kompilierst, nicht installiert. Installiere **SinricPro** über den Bibliotheksverwalter (Arduino IDE) oder füge `sinricpro/SinricPro` zu `lib_deps` hinzu (PlatformIO).

**fatal error: ArduinoJson.h: No such file or directory** oder **WebSocketsClient.h: No such file or directory**

Eine Abhängigkeit fehlt. Installiere **ArduinoJson** (7.0.3 oder neuer) und **WebSockets** von Markus Sattler (2.4.0 oder neuer).

**Compile-Fehler nach einem Update**

Aktualisiere ArduinoJson, WebSockets und das Board-Paket (Arduino Core) auf die jeweils neueste Version. Die Bibliothek benötigt Arduino Core 3.x.

Bei Verbindungsproblemen nach dem Hochladen des Sketchs findest du Hilfe auf der Seite [Fehlerbehebung]({{ site.github.url }}/de/pages/troubleshooting.de.html).

### Andere SDKs

Die obige Arduino Bibliothek unterstützt ESP32, ESP8266 und RP2040. Für andere Boards und Sprachen:

- [Raspberry Pi Pico SDK](https://github.com/sinricpro/pico-sdk/)
- [ESP-IDF SDK](https://github.com/sinricpro/esp-idf)
- [Arduino UNO R4 WiFi, Nano 33 IoT, MKR WIFI 1010, Seeedstudio Wio Terminal](https://github.com/sinricpro/arduino-variants-sdk)
- [MicroPython SDK](https://github.com/sinricpro/micropython-sinricpro-sdk)
- [Python SDK](https://github.com/sinricpro/python-sdk)
- [NodeJS SDK](https://github.com/sinricpro/nodejs-sdk)

> Dieses Dokument ist Open Source. Hast du einen Tippfehler gefunden? Erstelle bitte ein [Issue](https://github.com/sinricpro/help-docs)