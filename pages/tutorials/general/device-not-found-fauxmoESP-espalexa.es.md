---
title: '¿Espalexa o fauxmoESP "Device Not Found"? Por qué falla la emulación y cómo solucionarlo'
layout: post
lang: es
description: '¿Alexa dice "No he encontrado dispositivos nuevos" con Espalexa o fauxmoESP? Por qué falla la emulación de Hue y WeMo en ESP32 y ESP8266, y cómo solucionarlo.'
---

Si estás leyendo esto, lo más probable es que estés mirando el Monitor serie intentando averiguar por qué Alexa dice "No he encontrado dispositivos nuevos" o "El dispositivo no responde".

Seguramente has estado usando librerías como **Espalexa** o **fauxmoESP**. Funcionaron muy bien durante años, pero últimamente unas veces funcionan y otras no. Puede que funcionen con tu Echo Dot de 2.ª generación, pero fallen con el de 4.ª. Puede que funcionen durante una hora y luego desaparezcan.

Esta es la razón técnica por la que falla tu emulación, y la forma fiable de solucionarlo de una vez por todas.

## El problema: la emulación local está desapareciendo

Librerías como Espalexa y fauxmoESP se basan en la **emulación local**. Intentan engañar a Alexa para que crea que tu ESP32 es un antiguo interruptor **Belkin WeMo** o un puente **Philips Hue**.

Para ello usan **UPnP** (Universal Plug and Play) y **SSDP** (Simple Service Discovery Protocol) sobre multidifusión UDP.

### Por qué esto falla hoy:

1.  **Actualizaciones de firmware de Amazon:** los dispositivos Amazon Echo más recientes (3.ª generación, 4.ª generación y Show) tienen protocolos de seguridad mucho más estrictos. A menudo ignoran los paquetes de difusión UDP antiguos y sencillos que generan estas librerías.

2.  **Bloqueo del router:** si tu dispositivo ESP y tu dispositivo Alexa están en bandas de frecuencia distintas (2.4GHz y 5GHz) o en subredes distintas, muchos routers modernos bloquean los paquetes de multidifusión necesarios para el descubrimiento.

3.  **Sin ciclo de retroalimentación:** la emulación es un "hack". No es una API oficial. Cuando Amazon cambia un tiempo de espera del descubrimiento o un requisito de las cabeceras, tu dispositivo deja de funcionar al instante y tienes que esperar a que el responsable de la librería la actualice.

## La solución: integración en la nube (Sinric Pro)

La única forma de garantizar la estabilidad es dejar de engañar a Alexa y empezar a hablar con ella de forma oficial.

**Sinric Pro** adopta un enfoque distinto. En lugar de escuchar paquetes UDP poco fiables en tu red local, tu ESP8266/ESP32 abre una **conexión WebSocket** segura y persistente con la nube de Sinric Pro.

Cuando le pides a Alexa "Enciende la luz de la cocina":

1.  Alexa se comunica con la **skill Smart Home de Sinric Pro** (integración oficial de nube a nube).

2.  Sinric Pro envía una señal a tu dispositivo ESP por el WebSocket abierto.

3.  Tu ESP reacciona al instante.

Como la conexión es saliente desde tu dispositivo, **atraviesa los cortafuegos y funciona de forma fiable entre subredes distintas.**

## Guía de migración: de Espalexa a Sinric Pro

Cambiar es más fácil de lo que crees. No tienes que reescribir toda tu lógica; solo tienes que sustituir el gestor de la conexión.

### 1\. La configuración

  * **Espalexa:** defines el nombre del dispositivo en el código.

  * **Sinric Pro:** creas un dispositivo en el [Portal de Sinric Pro](https://portal.sinric.pro), obtienes un `DEVICE_ID`, `APP_KEY` y `APP_SECRET` y los pegas en tu código. *Así separas tu hardware de tu configuración.*


### 2\. Comparación del código

Aquí tienes una comparación de cómo se gestiona un interruptor de luz sencillo.

#### 1. La forma antigua (fauxmoESP)

*Se basa en comparaciones complejas dentro de los callbacks y en sondeo UDP.*

```cpp
#include <fauxmoESP.h>

fauxmoESP fauxmo;

void setup() {
  // ... wifi setup ...
  
  // You had to define devices by string names locally
  fauxmo.addDevice("Kitchen Light");
  fauxmo.setPort(80); // Required for Gen3+ devices
  fauxmo.enable(true);

  fauxmo.onSetState([](unsigned char device_id, const char * device_name, bool state, unsigned char value) {
    // You had to check strings to find which device was triggered
    if (strcmp(device_name, "Kitchen Light") == 0) {
      Serial.println(state ? "ON" : "OFF");
      // Control relay here
    }
  });
}

void loop() {
  fauxmo.handle(); // Must run constantly to catch UDP packets
}
```
#### 2\. La forma antigua (Espalexa)

Se basa en un bucle de descubrimiento local.

```cpp

#include <Espalexa.h>

Espalexa espalexa;

void lightChanged(uint8_t brightness) {
   // Control your relay/LED here
}

void setup() {
  // ... wifi setup ...
  espalexa.addDevice("Kitchen Light", lightChanged);
  espalexa.begin();
}

void loop() {
  espalexa.loop(); // Must run constantly to catch UDP packets
}
```

#### La forma nueva (Sinric Pro)

*Se basa en callbacks de eventos.*

```cpp
#include <SinricPro.h>
#include <SinricProSwitch.h>

#define APP_KEY    "YOUR-APP-KEY"
#define APP_SECRET "YOUR-APP-SECRET"
#define SWITCH_ID  "YOUR-DEVICE-ID" // From Portal

bool onPowerState(const String &deviceId, bool &state) {
  Serial.printf("Device %s turned %s\r\n", deviceId.c_str(), state?"on":"off");
  // Control your relay/LED here
  return true; // request handled properly
}

void setup() {
  // ... wifi setup ...
  SinricProSwitch& mySwitch = SinricPro[SWITCH_ID];
  mySwitch.onPowerState(onPowerState);
  
  SinricPro.begin(APP_KEY, APP_SECRET);
}

void loop() {
  SinricPro.handle(); // Maintains WebSocket connection
}
```

## ¿Por qué cambiar?

  * **Fiabilidad:** funciona con **todas** las generaciones de Alexa (Echo, Dot, Spot, Show, Flex).

  * **Funciones:** admite de forma nativa regulación de intensidad, temperatura de color, termostatos, persianas y puertas de garaje, cosas muy difíciles de emular con los protocolos de WeMo.

  * **App móvil:** dispones de la app móvil SinricPro para controlar tus dispositivos cuando no estás en casa (Espalexa solo funciona cuando estás en la misma red WiFi).

**Consigue tus credenciales gratis en [SinricPro](https://portal.sinric.pro)**

 
