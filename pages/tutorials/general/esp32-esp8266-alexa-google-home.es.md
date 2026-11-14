---
title: Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home
layout: post
lang: es
locale: es_ES
description: Conecta un ESP32 o ESP8266 a Amazon Alexa y Google Home con Sinric Pro. Guía paso a paso con código Arduino, sin crear una skill de Alexa y sin abrir puertos en el router.
---

Esta guía muestra cómo conectar un **ESP32** o **ESP8266** (NodeMCU, Wemos D1 mini) a **Amazon Alexa** y **Google Home**, para encender y apagar con la voz un relé, una luz o cualquier otra salida.

No necesitas escribir una skill de Alexa ni una action de Google Home, y no tienes que abrir ningún puerto en tu router.

### Cómo funciona

![Sinric Pro esp8266 esp32 picow]({{ site.github.url }}/public/img/esp32-esp8266-picow.png)

1. Tu ESP32 o ESP8266 ejecuta la librería Sinric Pro y mantiene abierta una conexión segura con el servidor de Sinric Pro.
2. Vinculas una sola vez la skill de Alexa o la action de Google Home de **Sinric Pro** con tu cuenta de Sinric Pro.
3. Cuando dices *"Alexa, enciende el interruptor"*, Alexa envía el comando a Sinric Pro, y Sinric Pro lo reenvía a tu placa.

Como es la placa la que se conecta al servidor, funciona desde cualquier lugar y en cualquier red doméstica.

Sinric Pro es una skill oficial de Alexa Smart Home y una action oficial de Google Home. No usa emulación de dispositivos. Si vienes de Espalexa o fauxmoESP, consulta [¿Espalexa o fauxmoESP "Device Not Found"?]({{ site.github.url }}/es/pages/tutorials/general/device-not-found-fauxmoESP-espalexa.es.html).

### Qué necesitas

1. Una placa de desarrollo ESP32 o ESP8266.
2. Un módulo de relé o un LED para controlar.
3. Arduino IDE o PlatformIO.
4. Una [cuenta de Sinric Pro](https://portal.sinric.pro/register) gratuita. Los límites del plan gratuito están en la página de [precios]({{ site.github.url }}/es/pages/pricing.es.html).

### Paso 1: Crea un dispositivo en Sinric Pro

* [Inicia sesión](https://portal.sinric.pro) en tu cuenta de Sinric Pro, abre el menú **Devices** a la izquierda y haz clic en **Add Device**.
* Escribe el nombre del dispositivo **Switch**, la descripción **My First Switch** y selecciona el tipo de dispositivo **Switch**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/sinric-pro-create-switch.png)

* Haz clic en **Save**.
* La siguiente pantalla muestra las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret**. ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

El nombre del dispositivo es lo que le dirás a Alexa o Google Home, así que elige un nombre fácil de pronunciar.

### Paso 2: Instala la librería Sinric Pro

En Arduino IDE abre **Herramientas > Administrar bibliotecas**, busca **SinricPro** y haz clic en **Instalar**.

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

Para PlatformIO, dependencias y errores comunes, consulta [How to install the Sinric Pro library]({{ site.github.url }}/es/pages/tutorials/general/install-sinricpro-library.es.html).

### Paso 3: Sube el código

El mismo sketch funciona en ESP32 y ESP8266. Introduce los datos de tu Wi-Fi y los tres valores del Paso 1.

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

Si no quieres escribir código, la función **Zero Code** del Portal puede generar el sketch por ti.

Cuando la placa se conecta, el dispositivo aparece en línea en el [Portal](https://portal.sinric.pro) y puedes encenderlo y apagarlo desde allí. Para el cableado de un relé, consulta [Switch Tutorial Part 1]({{ site.github.url }}/es/pages/tutorials/switch/part-1.es.html).

### Paso 4: Conecta Amazon Alexa

* Abre la app Amazon Alexa.
* Ve a **Skills y juegos**.
* Busca [**Sinric Pro**](https://www.amazon.es/dp/B07ZT5VDT8).
* Toca **PERMITIR SU USO**.
* Introduce tus credenciales de Sinric Pro en la página de vinculación.
* Pide a Alexa que busque dispositivos nuevos: *"Alexa, descubre dispositivos"*.
* Di *"Alexa, enciende Switch"*.

Más sobre la búsqueda de dispositivos, rutinas y solución de problemas: [Amazon Alexa]({{ site.github.url }}/es/pages/alexa.es.html).

### Paso 5: Conecta Google Home

* Abre **Google Home** y toca **Add** (Añadir).
* Selecciona **Setup Device** (Configurar dispositivo).
* Selecciona **Works with Google Home**.
* Busca [**Sinric Pro**](https://assistant.google.com/services/a/uid/000000c715375dd7?hl=es).
* Vincula tu cuenta.
* Di *"Hey Google, enciende Switch"*.

Los nombres de las opciones en la app pueden variar ligeramente según el idioma.

Más información: [Google Home]({{ site.github.url }}/es/pages/google-home.es.html).

### Samsung SmartThings

* Abre la app SmartThings y toca el icono **+**.
* Selecciona **Dispositivo**.
* Selecciona **Sinric Pro** entre las marcas.
* Vincula tu cuenta.
* Ahora puedes encender y apagar **Switch** desde el panel.

Más información: [Samsung SmartThings]({{ site.github.url }}/es/pages/smartthings.es.html).

### ¿Qué más puedes construir?

Un interruptor es solo el punto de partida. Los mismos pasos sirven para otros tipos de dispositivo:

- [Luz regulable con dimmer AC RobotDyn]({{ site.github.url }}/es/pages/tutorials/dimmable-switch/robotdyn-ac-light-dimmer.es.html)
- [Tira LED RGB]({{ site.github.url }}/es/pages/tutorials/light/LED-Stripe-5050.es.html)
- [Sensor de temperatura (DHT11, DHT22)]({{ site.github.url }}/es/pages/tutorials/temperature-sensors/DHTx_AMx_RHTx.es.html)
- [Sensor de movimiento]({{ site.github.url }}/es/pages/tutorials/motion-sensors/HC-SR501-HC-SR505-AM312-HC-SR312.es.html)
- [Sensor de contacto (puerta / ventana)]({{ site.github.url }}/es/pages/tutorials/contact-sensors/contact.es.html)
- [Timbre]({{ site.github.url }}/es/pages/tutorials/doorbell/doorbell.es.html)
- [Mando de TV con transceptor IR]({{ site.github.url }}/es/pages/tutorials/tv/ir-transceiver-esp8285.es.html)
- [Todos los tutoriales de inicio rápido]({{ site.github.url }}/es/pages/quickstarts.es.html)

### Preguntas frecuentes

**¿Tengo que crear mi propia skill de Alexa?**

No. Activas la skill de Sinric Pro que ya existe y vinculas tu cuenta.

**¿Funciona con placas distintas de ESP32 y ESP8266?**

Sí. Hay SDK para Raspberry Pi Pico W, Arduino UNO R4 WiFi, Nano 33 IoT, MKR WiFi 1010, MicroPython, Python y NodeJS. Consulta la [lista de SDK]({{ site.github.url }}/).

**¿Puedo controlar más de un dispositivo con una sola placa?**

Sí. Un ESP32 o ESP8266 puede alojar varios dispositivos Sinric Pro, por ejemplo una placa de relés de 4 canales. Consulta [Modules]({{ site.github.url }}/es/pages/modules.es.html) y la [Parte 3 del tutorial de interruptores]({{ site.github.url }}/es/pages/tutorials/switch/part-3.es.html).

**¿Puedo usarlo con Apple HomeKit o Home Assistant?**

Sí. Consulta [Homebridge (HomeKit)]({{ site.github.url }}/es/pages/homebridge.es.html) y [Home Assistant]({{ site.github.url }}/es/pages/home-assistant.es.html).

### Solución de problemas

Consulta la página [Troubleshooting]({{ site.github.url }}/es/pages/troubleshooting.es.html) para ver posibles soluciones.

> This document is open source. See a typo? Please create an [issue](https://github.com/sinricpro/help-docs)
