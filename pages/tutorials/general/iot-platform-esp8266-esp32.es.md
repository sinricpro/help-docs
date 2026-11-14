---
title: Sinric Pro - Plataforma IoT en la nube para ESP8266, ESP32 y Raspberry Pi Pico W
layout: post
lang: es
description: Sinric Pro es una plataforma IoT en la nube para ESP8266, ESP32 y Raspberry Pi Pico W. Controla tus dispositivos con Alexa, Google Home, una app móvil y una API. 3 dispositivos gratis.
---

Sinric Pro es una plataforma en la nube que hace que tus proyectos IoT caseros sean compatibles con el hogar inteligente. Conectas un **ESP8266**, **ESP32** o **Raspberry Pi Pico W** con unas pocas líneas de código y lo controlas con comandos de voz, una app móvil, automatizaciones o tu propio software.

No tienes que mantener un servidor, abrir puertos en tu router ni escribir una skill de Alexa.

### Qué obtienes

| Función | Descripción |
| --- | --- |
| Asistentes de voz | Amazon Alexa y Google Home, a través de la skill y la action oficiales de Sinric Pro |
| App móvil | App Sinric Pro para Android y iPhone/iPad |
| Plataformas de hogar inteligente | Samsung SmartThings, [Homebridge (HomeKit)]({{ site.github.url }}/es/pages/homebridge.es.html), [Home Assistant]({{ site.github.url }}/es/pages/home-assistant.es.html), [IFTTT]({{ site.github.url }}/es/pages/ifttt.es.html), [Node-RED]({{ site.github.url }}/es/pages/node-red.es.html), [Atajos de Apple]({{ site.github.url }}/es/pages/apple-shortcuts.es.html) |
| Tipos de dispositivo integrados | Interruptor, regulador, luz, termostato, TV, altavoz, cerradura, ventilador, persianas, puerta de garaje, timbre, cámara y sensores de temperatura, movimiento, contacto y calidad del aire |
| Tipos de dispositivo personalizados | [Plantillas de dispositivo]({{ site.github.url }}/es/pages/custom-templates.es.html): arrastra y suelta capacidades para crear tu propio tipo de dispositivo y generar el código |
| Automatizaciones | [Automatizaciones]({{ site.github.url }}/es/pages/automations.es.html) creadas arrastrando y soltando |
| Notificaciones push | Envía [notificaciones push]({{ site.github.url }}/pages/device-templates/capabilities/push-notification.html) desde tu dispositivo a tu teléfono |
| Actualizaciones OTA | [Actualizaciones de firmware inalámbricas (OTA)]({{ site.github.url }}/es/pages/ota.es.html) sin acceso físico al dispositivo |
| Control local | La app sigue controlando tus dispositivos por Wi-Fi [cuando no hay conexión a internet]({{ site.github.url }}/es/pages/local-control.es.html) |
| API | [API REST]({{ site.github.url }}/es/pages/api-guide.es.html) para crear tus propias apps e integraciones |

### Hardware compatible

- **ESP8266** (NodeMCU, Wemos D1 mini, ESP-01 y otros)
- **ESP32** (incluidos el ESP32-S3 y las cámaras ESP32)
- **Raspberry Pi Pico W** (RP2040)
- **Arduino** UNO R4 WiFi, Nano 33 IoT, MKR WiFi 1010
- **Raspberry Pi** y cualquier ordenador que ejecute Python o NodeJS

Hay SDK disponibles para Arduino (C++), ESP-IDF, MicroPython, Python y NodeJS. Consulta la [lista de SDK]({{ site.github.url }}/).

### Cómo funciona

1. Crea un dispositivo en el [Portal de Sinric Pro](https://portal.sinric.pro) y copia sus credenciales.
2. Añade la librería Sinric Pro a tu sketch y súbelo a tu placa.
3. La placa se conecta a Sinric Pro. Contrólala desde la app, Alexa, Google Home o la API.

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

La guía completa paso a paso está en [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html).

### Precios

- **Plan gratuito**: 3 dispositivos. No se necesita tarjeta de crédito.
- **Planes de pago**: por dispositivo y año, o dispositivos ilimitados por un precio anual fijo.

Consulta los precios actuales en [Precios]({{ site.github.url }}/es/pages/pricing.es.html).

### Para productos y empresas

Si estás creando un producto para venderlo, [Sinric Pro for Business]({{ site.github.url }}/es/pages/for-business.es.html) añade aprovisionamiento de dispositivos, gestión de dispositivos y actualizaciones OTA para despliegues comerciales.

### Primeros pasos

- [Crea una cuenta gratuita](https://portal.sinric.pro/register)
- [Instala la librería Sinric Pro]({{ site.github.url }}/es/pages/tutorials/general/install-sinricpro-library.es.html)
- [Tutoriales de inicio rápido]({{ site.github.url }}/es/pages/quickstarts.es.html)

> Este documento es de código abierto. ¿Has visto una errata? Crea una [issue](https://github.com/sinricpro/help-docs)
