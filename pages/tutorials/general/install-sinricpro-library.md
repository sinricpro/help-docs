---
title: How to Install the Sinric Pro Library (SinricPro.h) in Arduino IDE and PlatformIO
layout: post
lang: en
description: 'Install the Sinric Pro library (SDK) for ESP32, ESP8266 and Raspberry Pi Pico W in Arduino IDE or PlatformIO, and fix the "SinricPro.h: No such file or directory" error.'
---

The Sinric Pro library (also called the Sinric Pro SDK) connects your **ESP32**, **ESP8266** or **Raspberry Pi Pico W (RP2040)** to Sinric Pro. This page shows how to install it and how to fix the most common install errors.

The library is open source: [github.com/sinricpro/esp8266-esp32-sdk](https://github.com/sinricpro/esp8266-esp32-sdk)

### Install in Arduino IDE

1. Open the Library Manager: **Tools > Manage Libraries**.
2. Search for **SinricPro** and click **Install**.
3. When Arduino IDE asks to install the dependencies, choose **Install All**. If it does not ask, install them the same way:
   - **ArduinoJson** by Benoit Blanchon (version 7.0.3 or newer)
   - **WebSockets** by Markus Sattler (version 2.4.0 or newer)
4. Open an example: **File > Examples > SinricPro**.

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

The library needs the board package (Arduino core) for your board to be installed as well: **esp32**, **esp8266** or **Raspberry Pi Pico/RP2040**.

### Install in PlatformIO (VS Code)

Add `sinricpro/SinricPro` to `lib_deps` in your `platformio.ini`. PlatformIO downloads the library and its dependencies on the next build.

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

A complete `platformio.ini` is available [here](https://github.com/sinricpro/esp8266-esp32-sdk/blob/master/examples/platformio/platformio.ini).

### Download and install manually

1. Download the latest release as a ZIP file from [GitHub releases](https://github.com/sinricpro/esp8266-esp32-sdk/releases).
2. In Arduino IDE choose **Sketch > Include Library > Add .ZIP Library** and select the file.
3. Install ArduinoJson and WebSockets from the Library Manager.

### Use the library in your sketch

```c++
#include <SinricPro.h>
#include <SinricProSwitch.h>
```

`SinricPro.h` is the main header. Each device type has its own header, for example `SinricProSwitch.h`, `SinricProLight.h` or `SinricProTemperaturesensor.h`. See the [examples](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples) for every device type and the [full SDK documentation](https://sinricpro.github.io/esp8266-esp32-sdk-documentation/).

For a complete first sketch, see [How to control an ESP32 or ESP8266 with Alexa and Google Home]({{ site.github.url }}/pages/tutorials/general/esp32-esp8266-alexa-google-home.html).

### Troubleshooting

**fatal error: SinricPro.h: No such file or directory**

The library is not installed for the IDE you are compiling with. Install **SinricPro** from the Library Manager (Arduino IDE) or add `sinricpro/SinricPro` to `lib_deps` (PlatformIO).

**fatal error: ArduinoJson.h: No such file or directory** or **WebSocketsClient.h: No such file or directory**

A dependency is missing. Install **ArduinoJson** (7.0.3 or newer) and **WebSockets** by Markus Sattler (2.4.0 or newer).

**Compile errors after updating**

Update ArduinoJson, WebSockets and the board package (Arduino core) to their latest versions. The library requires Arduino core 3.x.

For connection problems after the sketch is uploaded, see the [Troubleshooting]({{ site.github.url }}/pages/troubleshooting.html) page.

### Other SDKs

The Arduino library above supports ESP32, ESP8266 and RP2040. For other boards and languages:

- [Raspberry Pi Pico SDK](https://github.com/sinricpro/pico-sdk/)
- [ESP-IDF SDK](https://github.com/sinricpro/esp-idf)
- [Arduino UNO R4 WiFi, Nano 33 IoT, MKR WIFI 1010, Seeedstudio Wio Terminal](https://github.com/sinricpro/arduino-variants-sdk)
- [MicroPython SDK](https://github.com/sinricpro/micropython-sinricpro-sdk)
- [Python SDK](https://github.com/sinricpro/python-sdk)
- [NodeJS SDK](https://github.com/sinricpro/nodejs-sdk)

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
