---
title: Cómo instalar la librería Sinric Pro (SinricPro.h) en Arduino IDE y PlatformIO
layout: post
lang: es
description: 'Instala la librería (SDK) de Sinric Pro para ESP32, ESP8266 y Raspberry Pi Pico W en Arduino IDE o PlatformIO y corrige el error "SinricPro.h: No such file or directory".'
---

La librería Sinric Pro (también llamada SDK de Sinric Pro) conecta tu **ESP32**, **ESP8266** o **Raspberry Pi Pico W (RP2040)** a Sinric Pro. Esta página muestra cómo instalarla y cómo corregir los errores de instalación más comunes.

La librería es de código abierto: [github.com/sinricpro/esp8266-esp32-sdk](https://github.com/sinricpro/esp8266-esp32-sdk)

### Instalación en Arduino IDE

1. Abre el Gestor de bibliotecas: **Herramientas > Administrar bibliotecas**.
2. Busca **SinricPro** y haz clic en **Instalar**.
3. Cuando Arduino IDE pregunte si quieres instalar las dependencias, elige **Instalar todo**. Si no lo pregunta, instálalas de la misma manera:
   - **ArduinoJson** de Benoit Blanchon (versión 7.0.3 o posterior)
   - **WebSockets** de Markus Sattler (versión 2.4.0 o posterior)
4. Abre un ejemplo: **Archivo > Ejemplos > SinricPro**.

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

La librería necesita que también esté instalado el paquete de placas (Arduino core) de tu placa: **esp32**, **esp8266** o **Raspberry Pi Pico/RP2040**.

### Instalación en PlatformIO (VS Code)

Añade `sinricpro/SinricPro` a `lib_deps` en tu `platformio.ini`. PlatformIO descarga la librería y sus dependencias en la siguiente compilación.

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

Hay un `platformio.ini` completo disponible [aquí](https://github.com/sinricpro/esp8266-esp32-sdk/blob/master/examples/platformio/platformio.ini).

### Descarga e instalación manual

1. Descarga la última versión como archivo ZIP desde [GitHub releases](https://github.com/sinricpro/esp8266-esp32-sdk/releases).
2. En Arduino IDE elige **Programa > Incluir biblioteca > Añadir biblioteca .ZIP** y selecciona el archivo.
3. Instala ArduinoJson y WebSockets desde el Gestor de bibliotecas.

### Usa la librería en tu sketch

```c++
#include <SinricPro.h>
#include <SinricProSwitch.h>
```

`SinricPro.h` es el archivo de cabecera principal. Cada tipo de dispositivo tiene su propia cabecera, por ejemplo `SinricProSwitch.h`, `SinricProLight.h` o `SinricProTemperaturesensor.h`. Consulta los [ejemplos](https://github.com/sinricpro/esp8266-esp32-sdk/tree/master/examples) de cada tipo de dispositivo y la [documentación completa del SDK](https://sinricpro.github.io/esp8266-esp32-sdk-documentation/).

Para ver un primer sketch completo, consulta [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html).

### Solución de problemas

**fatal error: SinricPro.h: No such file or directory**

La librería no está instalada en el IDE con el que estás compilando. Instala **SinricPro** desde el Gestor de bibliotecas (Arduino IDE) o añade `sinricpro/SinricPro` a `lib_deps` (PlatformIO).

**fatal error: ArduinoJson.h: No such file or directory** o **WebSocketsClient.h: No such file or directory**

Falta una dependencia. Instala **ArduinoJson** (7.0.3 o posterior) y **WebSockets** de Markus Sattler (2.4.0 o posterior).

**Errores de compilación después de actualizar**

Actualiza ArduinoJson, WebSockets y el paquete de placas (Arduino core) a sus últimas versiones. La librería requiere Arduino core 3.x.

Si tienes problemas de conexión después de subir el sketch, consulta la página de [Solución de problemas]({{ site.github.url }}/es/pages/troubleshooting.es.html).

### Otros SDK

La librería de Arduino anterior es compatible con ESP32, ESP8266 y RP2040. Para otras placas y lenguajes:

- [SDK para Raspberry Pi Pico](https://github.com/sinricpro/pico-sdk/)
- [SDK para ESP-IDF](https://github.com/sinricpro/esp-idf)
- [Arduino UNO R4 WiFi, Nano 33 IoT, MKR WIFI 1010, Seeedstudio Wio Terminal](https://github.com/sinricpro/arduino-variants-sdk)
- [SDK para MicroPython](https://github.com/sinricpro/micropython-sinricpro-sdk)
- [SDK para Python](https://github.com/sinricpro/python-sdk)
- [SDK para NodeJS](https://github.com/sinricpro/nodejs-sdk)

> Este documento es de código abierto. ¿Ves un error? Por favor, crea un [issue](https://github.com/sinricpro/help-docs)
