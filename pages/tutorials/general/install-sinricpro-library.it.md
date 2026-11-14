---
title: Come installare la libreria Sinric Pro (SinricPro.h) in Arduino IDE e PlatformIO
layout: post
lang: it
description: 'Installa la libreria Sinric Pro (SDK) per ESP32, ESP8266 e Raspberry Pi Pico W in Arduino IDE o PlatformIO e risolvi l''errore "SinricPro.h: No such file or directory".'
---

La libreria Sinric Pro (detta anche Sinric Pro SDK) collega il tuo **ESP32**, **ESP8266** o **Raspberry Pi Pico W (RP2040)** a Sinric Pro. Questa pagina spiega come installarla e come risolvere gli errori di installazione più comuni.

La libreria è open source: [github.com/sinricpro/esp8266-esp32-sdk](https://github.com/sinricpro/esp8266-esp32-sdk)

### Installazione in Arduino IDE

1. Apri il Gestore librerie: **Strumenti > Gestione librerie**.
2. Cerca **SinricPro** e fai clic su **Installa**.
3. Quando Arduino IDE chiede di installare le dipendenze, scegli **Installa tutto**. Se non lo chiede, installale allo stesso modo:
   - **ArduinoJson** di Benoit Blanchon (versione 7.0.3 o successiva)
   - **WebSockets** di Markus Sattler (versione 2.4.0 o successiva)
4. Apri un esempio: **File > Esempi > SinricPro**.

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

La libreria richiede che sia installato anche il pacchetto della scheda (Arduino core) per la tua scheda: **esp32**, **esp8266** o **Raspberry Pi Pico/RP2040**.

### Installazione in PlatformIO (VS Code)

Aggiungi `sinricpro/SinricPro` a `lib_deps` nel tuo `platformio.ini`. PlatformIO scarica la libreria e le sue dipendenze alla compilazione successiva.

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

Un `platformio.ini` completo è disponibile [qui](https://github.com/sinricpro/esp8266-esp32-sdk/blob/master/examples/platformio/platformio.ini).

### Download e installazione manuale

1. Scarica l'ultima release come file ZIP dalle [release su GitHub](https://github.com/sinricpro/esp8266-esp32-sdk/releases).
2. In Arduino IDE scegli **Sketch > Includi libreria > Aggiungi libreria da file .ZIP** e seleziona il file.
3. Installa ArduinoJson e WebSockets dal Gestore librerie.

### Usare la libreria nel tuo sketch

```c++
#include <SinricPro.h>
#include <SinricProSwitch.h>
```

`SinricPro.h` è l'header principale. Ogni tipo di dispositivo ha il proprio header, ad esempio `SinricProSwitch.h`, `SinricProLight.h` o `SinricProTemperaturesensor.h`. Consulta gli [esempi](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples) per ogni tipo di dispositivo e la [documentazione completa dell'SDK](https://sinricpro.github.io/esp8266-esp32-sdk-documentation/).

Per un primo sketch completo, vedi [Come controllare un ESP32 o ESP8266 con Alexa e Google Home]({{ site.github.url }}/it/pages/tutorials/general/esp32-esp8266-alexa-google-home.it.html).

### Risoluzione dei problemi

**fatal error: SinricPro.h: No such file or directory**

La libreria non è installata nell'IDE con cui stai compilando. Installa **SinricPro** dal Gestore librerie (Arduino IDE) oppure aggiungi `sinricpro/SinricPro` a `lib_deps` (PlatformIO).

**fatal error: ArduinoJson.h: No such file or directory** oppure **WebSocketsClient.h: No such file or directory**

Manca una dipendenza. Installa **ArduinoJson** (7.0.3 o successiva) e **WebSockets** di Markus Sattler (2.4.0 o successiva).

**Errori di compilazione dopo un aggiornamento**

Aggiorna ArduinoJson, WebSockets e il pacchetto della scheda (Arduino core) alle versioni più recenti. La libreria richiede Arduino core 3.x.

Per i problemi di connessione dopo il caricamento dello sketch, vedi la pagina [Risoluzione dei problemi]({{ site.github.url }}/it/pages/troubleshooting.it.html).

### Altri SDK

La libreria Arduino descritta sopra supporta ESP32, ESP8266 e RP2040. Per altre schede e altri linguaggi:

- [Raspberry Pi Pico SDK](https://github.com/sinricpro/pico-sdk/)
- [ESP-IDF SDK](https://github.com/sinricpro/esp-idf)
- [Arduino UNO R4 WiFi, Nano 33 IoT, MKR WIFI 1010, Seeedstudio Wio Terminal](https://github.com/sinricpro/arduino-variants-sdk)
- [MicroPython SDK](https://github.com/sinricpro/micropython-sinricpro-sdk)
- [Python SDK](https://github.com/sinricpro/python-sdk)
- [NodeJS SDK](https://github.com/sinricpro/nodejs-sdk)

> Questo documento è open source. Hai trovato un errore? Apri una [issue](https://github.com/sinricpro/help-docs)
