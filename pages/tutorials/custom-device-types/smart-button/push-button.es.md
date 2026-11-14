---
title:  Cómo usar el Smart Button de Sinric Pro
layout: post
lang: es
description: Añade a la app Sinric Pro un pulsador que dispara una acción en tu ESP32, ESP8266 o Raspberry Pi Pico W.
---

¿Quieres controlar tus proyectos DIY con un simple toque en el teléfono? La función Smart Button de Sinric Pro es la solución perfecta. Crea pulsadores en la app que pueden disparar cualquier acción en tu microcontrolador: desde encender LED hasta controlar motores o sensores.
Esta guía te muestra cómo configurar la función Smart Button en tu ESP32, ESP8266 o Raspberry Pi Pico W. Aprenderás a gestionar todos los tipos de interacción con el botón:

* Pulsación simple
* Pulsación doble
* Pulsación larga

### Requisitos previos : 

1. ESP32, ESP8266 o Raspberry Pi Pico W x 1.

### Paso 1 : Conéctate a Sinric Pro 

#### Paso 1.1 : Crea un tipo de dispositivo personalizado para el Smart Button.

Sinric Pro no tiene un tipo de dispositivo integrado para un pulsador, así que vamos a crear un tipo de dispositivo personalizado.

**Nota**: Puedes usar la función de importación de plantillas de dispositivo que se menciona más abajo para no tener que crear la plantilla completa.

* [Inicia sesión](https://portal.sinric.pro/devicetemplates/new) en tu cuenta de Sinric Pro y ve a **Device Templates**

* Haz clic en **Add Device Template**. Introduce **SmartButton** como nombre y descripción y selecciona **Smart Button** como tipo de dispositivo

![Sinric Pro smart button template]({{ site.github.url }}/public/img/smart-button-set-template-name-desc-type.png) 

* Haz clic en **Capabilities** y arrastra una capacidad **Smart Button**.

![Sinric Pro custom device type for push button]({{ site.github.url }}/public/img/smart-button-set-template-drop-smart-button.png) 

Haz clic en **Save** para guardar.

![Sinric Pro moisture saved template]({{ site.github.url }}/public/img/smart-button-saved-template.png)  

Ahora puedes ver la plantilla que acabamos de crear.


## ¿Importar una plantilla existente?

Si te da pereza configurar todos los valores de Modes y Range, puedes usar la función de importación.

![Sinric Pro capacitive soil moisture sensor import template]({{ site.github.url }}/public/img/capacitive-soil-moisture-sensor-import-template.png)

Pega esta plantilla:

```c++
{
  "name": "SmartButton",
  "description": "SmartButton",
  "deviceTypeId": "672a3b2c96ec80395518f2fe",
  "capabilities": [
    {
      "id": "672a3fbd96ec8039551901eb"
    }
  ]
}
```
 

* [Inicia sesión](http://portal.sinric.pro) en tu cuenta de Sinric Pro, abre el menú **Devices** a la izquierda y haz clic en el botón **Add Device** (arriba a la izquierda).

* Escribe el nombre del dispositivo **SmartButton**, la descripción **SmartButton** y selecciona el tipo de dispositivo **SmartButton**.

![Sinric Pro create device alexa]({{ site.github.url }}/public/img/smart-button-save-device.png)

* Haz clic en la pestaña Others y luego en **Save**

* La siguiente pantalla muestra las credenciales necesarias para conectar el dispositivo que acabas de crear.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-keys.png)

* Copia **Device Id**, **App Key** y **App Secret**. ***Mantén estos valores seguros. ¡NO LOS COMPARTAS EN FOROS PÚBLICOS!***

* Haz clic en **Code Generator** para generar el código. Haz clic en **Download** para descargarlo.

![Sinric Pro copy device id]({{ site.github.url }}/public/img/sinric-pro-create-custom-device-code-download.png)
 

### Paso 2 : Conéctate a Sinric Pro 

#### Paso 2.1 Instala la librería Sinric Pro

![Sinric Pro install SinricPro library]({{ site.github.url }}/public/img/sinricpro_arduinoIDE-library-manager.png)

#### 2.2 Código completo


**SmartButton.h**

```cpp
#ifndef _SMARTBUTTON_H_
#define _SMARTBUTTON_H_

#include <SinricProDevice.h>
#include <Capabilities/SmartButtonStateController.h>

class SmartButton 
: public SinricProDevice
, public SmartButtonStateController<SmartButton> {
  friend class SmartButtonStateController<SmartButton>;
public:
  SmartButton(const String &deviceId) : SinricProDevice(deviceId, "SmartButton") {};
};

#endif
```

**SmartButton.ino**

```cpp
// Uncomment the following line to enable serial debug output
//#define ENABLE_DEBUG

#ifdef ENABLE_DEBUG
  #define DEBUG_ESP_PORT Serial
  #define NODEBUG_WEBSOCKETS
  #define NDEBUG
#endif

#include <Arduino.h>
#ifdef ESP8266
  #include <ESP8266WiFi.h>
#endif
#ifdef ESP32
  #include <WiFi.h>
#endif

#include <SinricPro.h>
#include "SmartButton.h"

#define APP_KEY    "APP_KEY"
#define APP_SECRET "APP_SECRET"
#define DEVICE_ID  "DEVICE_ID"

#define SSID       "YOUR_WIFI_SSID"
#define PASS       "YOUR_WIFI_PASS"

#define BAUD_RATE  115200

SmartButton &smartButton = SinricPro[DEVICE_ID];


/*************
 * Callbacks *
 *************/

// SmartButtonStateController
bool onSinglePress(const String &deviceId) {
  // Triggers when you press the "SmartButton" on the app
  
  return true; // request handled properly
}

bool onDoublePress(const String &deviceId) {
  // Triggers when you double press the "SmartButton" on the app
  
  return true; // request handled properly
}

bool onLongPress(const String &deviceId) {
  // Triggers when you long press the "SmartButton" on the app
  
  return true; // request handled properly
}


/********* 
 * Setup *
 *********/

void setupSinricPro() {

// SmartButtonStateController
 smartButton.onSinglePress(onSinglePress);
 smartButton.onDoublePress(onDoublePress);
 smartButton.onLongPress(onLongPress);

  SinricPro.onConnected([]{ Serial.printf("[SinricPro]: Connected\r\n"); });
  SinricPro.onDisconnected([]{ Serial.printf("[SinricPro]: Disconnected\r\n"); });
  SinricPro.begin(APP_KEY, APP_SECRET);
};

void setupWiFi() {
  #if defined(ESP8266)
    WiFi.setSleepMode(WIFI_NONE_SLEEP); 
    WiFi.setAutoReconnect(true);
  #elif defined(ESP32)
    WiFi.setSleep(false); 
    WiFi.setAutoReconnect(true);
  #endif

  WiFi.begin(SSID, PASS);
  Serial.printf("[WiFi]: Connecting to %s", SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf(".");
    delay(250);
  }
  Serial.printf("connected\r\n");
}

void setup() {
  Serial.begin(BAUD_RATE);
  setupWiFi();
  setupSinricPro();
}

/********
 * Loop *
 ********/

void loop() {
  SinricPro.handle();
}
```

[Ver este código en GitHub Gist](https://gist.github.com/kakopappa/5de59e34522c7ea21e3eef72c2e2bcd7)


![Sinric Pro smart button in portal]({{ site.github.url }}/public/img/smart-button-portal-dashboard.png)

![Sinric Pro smart button in app]({{ site.github.url }}/public/img/smart-button-app.png)

### Solución de problemas
1. Los Smart Button solo son compatibles con la app SinricPro. Alexa, Google Home y SmartThings no son compatibles.

2. Consulta nuestra página [Troubleshooting]({{ site.github.url }}/es/pages/troubleshooting.es.html) para más detalles.
 

### Tutoriales relacionados

- [Cómo controlar un ESP32 o ESP8266 con Alexa y Google Home]({{ site.github.url }}/es/pages/tutorials/general/esp32-esp8266-alexa-google-home.es.html)
- [Tutorial de interruptores, parte 2: conmuta el relé con un botón]({{ site.github.url }}/es/pages/tutorials/switch/part-2.es.html)
- [Plantillas de dispositivo: crea tu propio tipo de dispositivo]({{ site.github.url }}/es/pages/custom-templates.es.html)

> Este documento es de código abierto. ¿Has visto una errata? Por favor, crea un [issue](https://github.com/sinricpro/help-docs)
